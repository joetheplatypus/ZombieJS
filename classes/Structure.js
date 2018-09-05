const Entity = require('./Entity');

class Structure extends Entity {
  constructor(params) {
    super(params);
    this.className = 'Structure';
    this.type = '';
    this.owner = params.owner
  }

  update() {
    super.update();    
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
      maxHealth: this.maxHealth,
      type: this.type
    }
  }

}

module.exports = Structure;