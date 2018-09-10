const Block = require('./Block');

class Structure extends Block {
  constructor(params) {
    super(params);
    this.owner = params.owner;
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