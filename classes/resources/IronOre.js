const Resource = require('../Resource');
const GameObject = require('../GameObject');

class IronOre extends Resource {
  constructor(params) {
    super(params);
    this.className = 'IronOre'
    this.width = 120;
    this.height = 200;
    this.resourceItems = [{item:"iron", amount: 10}]
    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = IronOre;