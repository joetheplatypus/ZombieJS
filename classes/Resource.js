const Block = require('./Block');
const Player = require('./Player');
const ItemTile = require('./ItemTile');

class Resource extends Block {
  constructor(params) {
    super(params);
    this.resourceItems = []
    this.fixed = true
  }

  update() {
    super.update();    
  }

  onDeath() {
    super.onDeath();
    for(var i=0; i < this.resourceItems.length; i++) {
      for(var j=0; j < this.resourceItems[i].amount; j++) {
        new ItemTile({
          x: this.x + (Math.random()*120 - 60),
          y: this.y + (Math.random()*120 - 60),
          item: this.resourceItems[i].item
        })
      }
    }
  }
}

module.exports = Resource;