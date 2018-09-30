const AStar = require('./AStar');

class Map {
  constructor() {
    this.tileSize = 62;
    this.height = 100;
    this.width = 100;
	this.size = this.width*this.height;

    this.tiles = [];
    for(var i = 0; i < this.height; i++) {
      this.tiles.push(new Array(this.width));
    }
	
	this.numTiles = [];
    for(var i = 0; i < this.height; i++) {
      this.numTiles.push([]);
	  for(var j = 0; j < this.width; j++) {
		  this.numTiles[i].push(0);
		}
    }
  }
  coordToTile(coords) {
    const tile = {}
    tile.x = Math.floor(coords.x / this.tileSize);
    tile.y = Math.floor(coords.y / this.tileSize);
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
    if(pos.y < 0 || pos.x < 0 || pos.x > this.width-1 || pos.y > this.height-1) {
		return true;
	}
	if(this.tiles[pos.y][pos.x]) {
		return true;
	}
	return false;
  }

  addBlock(block) {
    this.tiles[block.tileY][block.tileX] = block
	  this.numTiles[block.tileY][block.tileX] = 1;
  }

  removeBlock(block) {
    this.tiles[block.tileY][block.tileX] = null
	  this.numTiles[block.tileY][block.tileX] = 0;
  }

  getSize() {
    return {
      width:this.width,
      height:this.height,
    }
  }
  	
  findPath(start, end) {
	const path = AStar(this.numTiles, [start.x,start.y], [end.x,end.y])
	return path;
  }

}
const map = new Map
module.exports = map;

