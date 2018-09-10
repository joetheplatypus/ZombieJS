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

  static tileOccupied(tile) {
    if(Map.tiles[tile.y][tile.x] instanceof Block) {
      return true;
    }
    return false;
  }
}

module.exports = Block;