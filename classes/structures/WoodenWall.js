const Structure = require('../Structure');

class WoodenWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 70;
    this.height = 70;
    this.health = 100;
    this.maxHealth = 100;
    this.type = 'wooden-wall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = WoodenWall;