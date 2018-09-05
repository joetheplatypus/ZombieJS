import Player from './Player.js'
import GameObject from './GameObject.js';

export default {
	width: 1400,
	height: 700,
	minimapHeight: 140,
	minimapWidth: 140,
	minimapScaleFactor: 10,
	inGame: false,
	inLobby: false,
	ctxInteract: true,
	placingStructure: false,
  absoluteToRelative(coords) {
		const relCoords = {};
		relCoords.x = coords.x - GameObject.fromID(Player.selfId).x + this.width/2
		relCoords.y = coords.y - GameObject.fromID(Player.selfId).y + this.height/2
		return relCoords
	},
	absoluteToRelativeMinimap(coords) {
		const relCoords = {};
		relCoords.x = (coords.x - GameObject.fromID(Player.selfId).x)/this.minimapScaleFactor + this.minimapWidth/2;
		relCoords.y = (coords.y - GameObject.fromID(Player.selfId).y)/this.minimapScaleFactor + this.minimapHeight/2;
		return relCoords
	},
	gui: {
		resources: {
			wood: document.getElementById("resource-wood"),
			stone: document.getElementById("resource-stone"),
			string: document.getElementById("resource-string"),
			flint: document.getElementById("resource-flint"),
			metal: document.getElementById("resource-metal"),
		},
	},
	input: {
		mouseRealX: 0,
		mouseRealY: 0
	}
}