const GameObject = require('./GameObject');
const Entity = require('./Entity');
const RigidBody = require('./RigidBody');

class Projectile extends GameObject {
  constructor(param) {
    super(param);
    this.angle = param.angle;
    this.velX = Math.cos(this.angle/180*Math.PI) * 40;
    this.velY = Math.sin(this.angle/180*Math.PI) * 40;
    this.parent = param.parent;
    this.timer = 0;
    this.className = 'Projectile'
    this.height = 20;
    this.width = 20;

    GameObject.initPack.push(this.getInitPack())
  }

  update() {
    super.update();

    //check timer for whether to delete
    if(this.timer > 100) {
      GameObject.remove(this);
		} else {
      this.timer++;
    }
    
    //check position for whether to delete (hit wall)
    // if(Map.isPositionWall({x:this.x,y:this.y})){
		// 	self.toRemove = true;		
		// }

    //deal damage
    

    //particles
    // if(this.type === "arrow") {
    //   var p = new Particle({
    //     x:this.x,
    //     y:this.y,
    //     spdX:-2+Math.random()*7,
    //     spdY:-2+Math.random()*7,
    //     maxTimer:12,
    //     colour:"lightgrey",
    //   });
    // }

    
  }

  onCollision(collider) {
    if(collider.id === this.parent.id) {
      return;
    }
    if(collider instanceof Entity) {
      collider.onTakeDamage(10, this.parent);
    }
    if(collider instanceof RigidBody) {
      GameObject.remove(this)
    }
  }
}
module.exports = Projectile