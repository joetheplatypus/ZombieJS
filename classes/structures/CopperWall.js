const Structure = require('../Structure');

class CopperWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 64;
    this.height = 64;
    this.health = 300;
    this.maxHealth = 300;
    this.type = 'copper-wall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = CopperWall;