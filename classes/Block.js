const Entity = require('./Entity');
const Map = require('./Map');

class Block extends Entity {
  constructor(params) {
    super(params);
    this.tileX = params.tileX;
    this.tileY = params.tileY;
    const coords = Map.tileToCoords({x:this.tileX,y:this.tileY});
    this.x = coords.x + Map.tileSize/2;
    this.y = coords.y + Map.tileSize/2;
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