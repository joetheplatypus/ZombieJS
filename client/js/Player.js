import Game from './Helper.js'
import Inventory from './Inventory.js'
import GameObject from './GameObject.js';
import Lerp from './Lerp.js'
import Img from './Image.js'

export default class Player extends GameObject {
  constructor(params) {
    super(params);

    this.goalX = params.x;
    this.goalY = params.y;

    this.health = params.health;
    this.maxHealth = params.maxHealth;
    this.score = params.score;
    this.name = params.name;
    this.angle = params.angle;

    this.renderLayer = 2;
  }
  
  draw() {
    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    const x = relPos.x;
    const y = relPos.y;
    
    var hpWidth = 30 * this.health/this.maxHealth;
    Game.ctx.fillStyle = "red";
    Game.ctx.fillRect(x - hpWidth/2, y - 35, hpWidth,4);
          
    
    // Game.ctx.beginPath();
    // Game.ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
    // Game.ctx.fillStyle = "#A29584";
    // Game.ctx.fill();
    // Game.ctx.lineWidth = 5;
    // Game.ctx.strokeStyle = "#6E6865";
    // Game.ctx.stroke();


    // Game.ctx.font="30px Verdana";
    // Game.ctx.textAlign = "center";
    // Game.ctx.fillText(this.score,x,y+9);
    
    Game.ctx.fillStyle = "black";
    Game.ctx.font="10px Verdana";
    Game.ctx.textAlign="center"; 
    Game.ctx.fillText(this.name,x,y-45);
    
    Game.ctx.save();
    Game.ctx.translate(x,y);
    Game.ctx.rotate(this.angle * Math.PI/180);
    Img.draw('player-stand', 0, 0)
    Game.ctx.restore();
    
    //minimap
    const minimapRelPos = Game.absoluteToRelativeMinimap({x:this.x,y:this.y});
    if(this.id === Player.selfId) {
      Game.mapctx.fillStyle = "white";
    } else {
      Game.mapctx.fillStyle = "red";
    }
    Game.mapctx.fillRect(minimapRelPos.x,minimapRelPos.y,10,10);
    
    if(this.holdingItem) {
      const img = Game.classMaps.itemImages.get(this.holdingItem);
      Game.ctx.drawImage(img,x,y);
    }


  }

  update(data) {
    //disables linear interpolation for testing purposes only
    // this.x = data.x;
    // this.y = data.y;

    this.lastX = this.goalX;
    this.lastY = this.goalY;
    this.goalX = data.x;
    this.goalY = data.y;
    this.health = data.health;
    this.score = data.score;    
    this.angle = data.angle;
  }
  statUpdate() {
    // linear interp happens after update
    if(Game.lastPacket && Game.thisPacket) {
      const estTime = (new Date()).getTime() - Game.deltaTime
      this.x = Lerp(Game.lastPacket.timeReceived, Game.thisPacket.timeReceived, this.lastX, this.goalX, estTime)
      this.y = Lerp(Game.lastPacket.timeReceived, Game.thisPacket.timeReceived, this.lastY, this.goalY, estTime)
    }
  }
}
Player.selfId = null;