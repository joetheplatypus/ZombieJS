const Structure = require('../Structure');
const GameObject = require('../GameObject');

class WoodenWall extends Structure {
  constructor(params) {
    super(params);
    this.width = 64;
    this.height = 64;
    this.health = 100;
    this.maxHealth = 100;
    this.className = 'WoodenWall'

    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = WoodenWall;