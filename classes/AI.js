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
		this.angle = 0;
		this.nearestPlayer = null;
		this.updatePath();
		GameObject.initPack.push(this.getInitPack())
	}
	
	update() {
		if(this.nextStep && this.getDistanceToPoint(this.nearestPlayer) > 50) {
			if(this.nextStep[0] == this.getCurrentTile().x && this.nextStep[1] == this.getCurrentTile().y) {
				//snap into tile
				this.updatePath();	
			} else {
				const tileCoords = Map.tileToCoords({x:this.nextStep[0],y:this.nextStep[1]})
				const destination = {x:tileCoords.x + Map.tileSize/2, y:tileCoords.y + Map.tileSize/2}
				const dx = destination.x - this.x
				const dy = destination.y - this.y
				if(dx > this.speed) {
					this.velX = this.speed
				} else if (dx < -this.speed) {
					this.velX = -this.speed
				} else {
					this.velX = dx
				}
				if(dy > this.speed) {
					this.velY = this.speed
				} else if (dy < -this.speed) {
					this.velY = -this.speed
				} else {
					this.velY = dy
				}
				this.angle = Math.atan(this.velY/this.velX)
				if(this.velX < 0) {
					this.angle = this.angle + Math.PI;
				}
			}
		} else {
			this.updatePath();
			this.velX = 0;
			this.velY = 0;
		}
		
		super.update();
	}
	
	updatePath() {
		this.nearestPlayer = Player.nearestToPoint({x:this.x,y:this.y});
		if(this.getDistanceToPoint(this.nearestPlayer) > 600 || this.getDistanceToPoint(this.nearestPlayer) < 50) {
			this.nextStep = null;
			return;
		}
		const tile = Map.coordToTile({x:this.nearestPlayer.x,y:this.nearestPlayer.y})
		// if(tile.x === this.getCurrentTile().x && tile.y === this.getCurrentTile().y) {
		// 	this.nextStep = null;
		// 	return;
		// }
		const path = Map.findPath({x:this.getCurrentTile().x,y:this.getCurrentTile().y}, tile);
		this.nextStep = path[1]
	}
	
	getCurrentTile() {
		return Map.coordToTile({x:this.x,y:this.y});
	}

	getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className,
			health: this.health,
			angle: this.angle,
    }
  }

  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className,
      health: this.health,
			maxHealth: this.maxHealth,
			angle: this.angle,
    }
  }
}

module.exports = AI