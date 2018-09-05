const Structure = require('../Structure');

class StoneWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 70;
    this.height = 70;
    this.health = 200;
    this.maxHealth = 200;
    this.type = 'stone-wall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = StoneWall;