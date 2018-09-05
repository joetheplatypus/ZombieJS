const Resource = require('../Resource');
const GameObject = require('../GameObject');

class Rock extends Resource {
  constructor(params) {
    super(params);
    this.className = 'Rock'
    this.width = 100;
    this.height = 100;
    this.resourceItems = [{item:"stone", amount: 10}]
    GameObject.initPack.push(this.getInitPack())
  }
}

module.exports = Rock;