// const Tree = require('./resources/Tree');
// const Rock = require('./resources/Rock');
// const CopperOre = require('./resources/CopperOre');

class Map {
  constructor() {
    this.tileSize = 62;
    this.height = 80;
    this.width = 80;

    this.tiles = [];
    for(var i = 0; i < this.height; i++) {
      this.tiles.push(new Array(this.width));
    }
  }
  coordToTile(coords) {
    const tile = {}
    tile.x = Math.round(coords.x / this.tileSize);
    tile.y = Math.round(coords.y / this.tileSize);
    return tile;
  }

  tileToCoords(tile) {
    const coords = {}
    coords.x = tile.x * this.tileSize;
    coords.y = tile.y * this.tileSize;
    return coords;
  }

  snapCoordsToTile(coords) {
    const tile = this.coordToTile(coords);
    const scoords = this.tileToCoords(tile);
    return scoords;
  }

  isPositionWall(pos) {
    const tilePos = this.coordToTile(pos);
    if(tilePos.x < 0 || tilePos.x >= 300) {
      return true
    }
    if(tilePos.y < 0 || tilePos.y >= 300) {
      return true
    }
  }

  addBlock(block) {
    const pos = this.coordToTile({x:block.x,y:block.y})
    this.tiles[pos.y][pos.x] = block
  }  

}
const map = new Map
module.exports = map