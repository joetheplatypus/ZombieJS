const Resource = require('../Resource');
const GameObject = require('../GameObject');

class Tree extends Resource {
  constructor(params) {
    super(params);
    //class name
    this.className = 'Tree'
    //physics
    this.width = 120;
    this.height = 120;
    //resource
    this.resourceItems = [{item:"wood", amount: 5}]
    

    GameObject.initPack.push(this.getInitPack())
  }

}

module.exports = Tree;