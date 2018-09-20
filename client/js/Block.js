import GameObject from './GameObject.js';
import Game from './Helper.js'

class Block extends GameObject {
  constructor(params) {
    super(params);
    const tile = Game.coordToTile({x:this.x,y:this.y})
    Block.map[tile.y][tile.x] = this;
  }
  onRemove() {
    const tile = Game.coordToTile({x:this.x,y:this.y})
    Block.map[tile.y][tile.x] = null;
  }
  static tileOccupied(tile) {
    if(Block.map[tile.y][tile.x] instanceof Block) {
      return true;
    }
    return false;
  }

  static snapTileInMap(tile) {
    const newTile = tile;
    if(newTile.x <= 0) {
      newTile.x = 0;
    }
    if(newTile.y <= 0) {
      newTile.y = 0;
    }
    if(newTile.x >= Block.mapSize.width-1) {
      newTile.x = Block.mapSize.width-1;
    }
    if(newTile.y >= Block.mapSize.height-1) {
      newTile.y = Block.mapSize.height-1;
    }
    return newTile;
  }

  static initMap(size) {
    for(var i = 0; i < size.height; i++) {
      Block.map.push(new Array(size.width));
    }
    Block.mapSize.height = size.height;
    Block.mapSize.width = size.width;
  }

  static getMapSize() {
    return Block.mapSize;
  }
  // getNeighbours() {
  //   const tile = Game.coordToTile({x:this.x,y:this.y})
  //   const neighbours = {
  //     left: false,
  //     right: false,
  //     top: false,
  //     down: false,
  //   }
  //   if(Block.tileOccupied({x:tile.x-1,y:tile.y})) {
  //     neighbours.left = Block.map[tile.x-1][tile.y]
  //   }
  //   if(Block.tileOccupied({x:tile.x+1,y:tile.y})) {
  //     neighbours.right = Block.map[tile.x+1][tile.y]
  //   }
  //   if(Block.tileOccupied({x:tile.x,y:tile.y-1})) {
  //     neighbours.top = Block.map[tile.x][tile.y-1]
  //   }
  //   if(Block.tileOccupied({x:tile.x,y:tile.y+1})) {
  //     neighbours.bottom = Block.map[tile.x][tile.y+1]
  //   }
  //   return neighbours;
  // }
}

Block.map = []
Block.mapSize = {};

export default Block;