const Entity = require('./Entity');
const Map = require('./Map');
const GameObject = require('./GameObject');
const Player = require('./Player');

class AI extends Entity {
	constructor(params) {
		super(params);
		this.className = 'AI';
		this.nextStep = null;
		this.speed = 5;
		this.updatePath();
		GameObject.initPack.push(this.getInitPack())
	}
	
	update() {
		if(this.nextStep) {
			console.log(this.getCurrentTile())
			if(this.nextStep[0] == this.getCurrentTile().x && this.nextStep[1] == this.getCurrentTile().y) {
				//snap into tile
				const currentTileCoords = Map.tileToCoords(this.getCurrentTile());
				if(this.getDistanceToPoint(currentTileCoords) > 0) {
					const dx = currentTileCoords.x - this.x;
					const dy = currentTileCoords.y - this.y;
					if(dx > this.speed) {
						this.velX = this.speed;
					} else {
						this.velX = dx
					}
					if(dy > this.speed) {
						this.velY = this.speed;
					} else {
						this.velY = dy
					}
				} else {
					this.velX = 0;
					this.velY = 0;
					this.updatePath();
				}
				
			} else {
				const dx = this.nextStep[0] - this.getCurrentTile().x;
				const dy = this.nextStep[1] - this.getCurrentTile().y;
				this.velX = dx*this.speed;
				this.velY = dy*this.speed;
			}
		} else {
			this.updatePath();
		}
		
		super.update();
	}
	
	updatePath() {
		const nearestPlayer = Player.nearestToPoint({x:this.x,y:this.y});
		if(this.getDistanceToPoint(nearestPlayer) > 600) {
			this.nextStep = null;
			return;
		}
		const tile = Map.coordToTile({x:nearestPlayer.x,y:nearestPlayer.y})
		if(tile.x === this.getCurrentTile().x && tile.y === this.getCurrentTile().y) {
			this.nextStep = null;
			return;
		}
		const path = Map.findPath({x:this.getCurrentTile().x,y:this.getCurrentTile().y}, tile);
		this.nextStep = path[1]
	}
	
	getCurrentTile() {
		return Map.coordToTile({x:this.x,y:this.y});
	}
}

module.exports = AI