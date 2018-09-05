const Resource = require('../Resource');
const GameObject = require('../GameObject');

class CopperOre extends Resource {
  constructor(params) {
    super(params);
    this.className = 'CopperOre'
    this.width = 100;
    this.height = 100;
    this.resourceItems = [{item:"copper", amount: 10}]
    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = CopperOre;