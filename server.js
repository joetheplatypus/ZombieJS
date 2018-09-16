const express = require('express');
const app = express();
const server = require('http').Server(app);

const np = require('node-particles');

const GameObject = require('./classes/GameObject');
const RigidBody = require('./classes/RigidBody')
const Player = require('./classes/Player');
const Tree = require('./classes/resources/Tree');
const Rock = require('./classes/resources/Rock');
const CopperOre = require('./classes/resources/CopperOre');
const CraftingRecipe = require('./classes/CraftingRecipe');
const Map = require('./classes/Map');
const Game = require('./classes/Game');
const Item = require('./classes/Item');
const ItemTile = require('./classes/ItemTile');

const Settings = require('./settings')


//WEB SERVER

app.get('/',function(req,res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use ('/client',express.static(__dirname + '/client'));

server.listen(2000);
console.log("server started");

//SOCKET IO SETUP

var SOCKET_LIST = {};
var lobbyPlayers = [];
var playerList = [];

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	var address = socket.request.connection.remoteAddress;
	
	socket.on('signIn', function(data){
		 
    if(playerList.indexOf(data.username) >= 0) {
      socket.emit('signInResponse', {success:false,name:data.username});
      return;
    }
		
		// Player.onConnect(socket,data.username,address);
		lobbyPlayers.push({socket:socket,username:data.username,address:address})
		playerList.push(data.username)
		
    socket.emit('signInResponse', {success:true});
    for (var i in SOCKET_LIST) {
			SOCKET_LIST[i].emit('addToChat','<i>' + data.username + ' joined the game </i>');
    }
  
	});

	
	socket.on('disconnect', function(){
		if(Player.fromID(socket.id)) {
			for (var i in SOCKET_LIST) {
				if(Player.fromID(socket.id)){
					SOCKET_LIST[i].emit('addToChat','<i>' + Player.fromID(socket.id).name + ' left the game </i>');
				}
			}
			
			delete SOCKET_LIST[socket.id];
			Player.onDisconnect(socket);
		}		
	});

	
	
});

//GAME SETUP

Item.setup(Player)
CraftingRecipe.setup()

for(var i=0; i < 10; i++) {
	for(var j=0; j < 10; j++) {
		const r = Math.random()
		if(r > 0.8) {
			new Tree({y:i*600 + Math.random()*500, x:j*600 + Math.random()*500})
		} else if(r > 0.6) {
			new Rock({y:i*600 + Math.random()*500, x:j*600 + Math.random()*500})
		} else if(r > 0.4) {
			new CopperOre({y:i*600 + Math.random()*500, x:j*600 + Math.random()*500})
		} else {
			new Tree({y:i*600 + Math.random()*500, x:j*600 + Math.random()*500})
		}
	}
}

new ItemTile({
	x:1200,
	y:1200,
	item:'gun'
})

//GAME LOOP
setInterval(function() {

	if(Game.inGame) {
		GameObject.updateAll();
		RigidBody.collisionDetection();
		GameObject.deleteBuffer();
		var packs = GameObject.getFrameUpdateData();
			
		for(var i in SOCKET_LIST) {
			var socket = SOCKET_LIST[i];
			socket.emit('init', packs.init);
			socket.emit('update', packs.update);
			socket.emit('remove', packs.remove);
			socket.emit('timer', packs.timer);
		}
	} else {
		let lobbyTimer = null;
		if(playerList.length > 1) {
			lobbyTimer = Game.getLobbyTimer();
			if(lobbyTimer.finished) {
				Game.inGame = true;
				for(var i=0; i<lobbyPlayers.length; i++) {
					Player.onConnect(lobbyPlayers[i].socket,lobbyPlayers[i].username,lobbyPlayers[i].address)
				}
			}
		}
		
		
		for(var i in SOCKET_LIST) {
			var socket = SOCKET_LIST[i];
			socket.emit('lobbyPlayers', playerList);
			if(lobbyTimer) {
				socket.emit('lobbyTimer', lobbyTimer);
				if(lobbyTimer.finished) {
					socket.emit('startGame', {})
				}
			}
		}
	}
},1000/Settings.tickRate);