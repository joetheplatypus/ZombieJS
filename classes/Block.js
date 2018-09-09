const Entity = require('./Entity');
const Map = require('./Map');

class Block extends Entity {
  constructor(params) {
    super(params);
    const coords = Map.snapCoordsToTile({x:this.x,y:this.y});
    this.x = coords.x;
    this.y = coords.y;
    Map.addBlock(this)
  }
}

module.exports = Block;