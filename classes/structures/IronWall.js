const Structure = require('../Structure');

class IronWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 70;
    this.height = 70;
    this.health = 400;
    this.maxHealth = 400;
    this.type = 'iron-wall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = IronWall;