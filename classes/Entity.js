const RigidBody = require('./RigidBody');
const GameObject = require('./GameObject')

class Entity extends RigidBody {
  constructor(params) {
    super(params);
    this.health = 100;
    this.maxHealth = 100;
  }

  update() {
    super.update();
    if(this.health <= 0) {
      this.onDeath();
    }
  }

  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className,
      health: this.health
    }
  }

  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className,
      health: this.health,
      maxHealth: this.maxHealth
    }
  }

  onDeath() {
    GameObject.remove(this);
  }

  onTakeDamage(damage, attacker) {
    this.health -= damage;
  }

  static attackAtPoint(attacker, damage, range) {
    for(var i=0; i < GameObject.list.length; i++) {
      if(GameObject.list[i].className == 'Tree') {
        if(GameObject.list[i].getDistanceToPoint({x:attacker.x, y:attacker.y}) <= range && GameObject.list[i].id !== attacker.id) {
          GameObject.list[i].onTakeDamage(damage);
        }
      }
    }
  }

}

module.exports = Entity;