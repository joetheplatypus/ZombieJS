const Structure = require('../Structure');

class StoneWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 64;
    this.height = 64;
    this.health = 200;
    this.maxHealth = 200;
    this.type = 'stone-wall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = StoneWall;