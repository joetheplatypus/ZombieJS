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
    this.damage = param.damage

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
    
  }

  onCollision(collider) {
    if(collider.id === this.parent.id) {
      return;
    }
    if(collider instanceof Entity) {
      collider.onTakeDamage(this.damage, this.parent);
    }
    if(collider instanceof RigidBody) {
      GameObject.remove(this)
    }
  }
}
module.exports = Projectile