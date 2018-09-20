class Map {
  constructor() {
    this.tileSize = 62;
    this.height = 100;
    this.width = 100;

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

  snapTileInMap(tile) {
    const newTile = tile;
    if(newTile.x <= 0) {
      newTile.x = 0;
    }
    if(newTile.y <= 0) {
      newTile.y = 0;
    }
    if(newTile.x >= this.width-1) {
      newTile.x = this.width-1;
    }
    if(newTile.y >= this.height-1) {
      newTile.y = this.height-1;
    }
    return newTile;
  }

  snapCoordsInMap(coords) {
    const newCoords = coords;
    if(newCoords.x <= 0) {
      newCoords.x = 0;
    }
    if(newCoords.y <= 0) {
      newCoords.y = 0;
    }
    if(newCoords.x >= (this.width-1)*this.tileSize) {
      newCoords.x = (this.width-1)*this.tileSize;
    }
    if(newCoords.y >= (this.height-1)*this.tileSize) {
      newCoords.y = (this.height-1)*this.tileSize;
    }
    return newCoords;
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

  getSize() {
    return {
      width:this.width,
      height:this.height,
    }
  }

}
const map = new Map
module.exports = map