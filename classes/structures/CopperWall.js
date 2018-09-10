const Structure = require('../Structure');
const GameObject = require('../GameObject');

class CopperWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 64;
    this.height = 64;
    this.health = 300;
    this.maxHealth = 300;
    this.className = 'CopperWall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = CopperWall;