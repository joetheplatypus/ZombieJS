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
for(var i = 0; i < 80; i++) {
  Block.map.push(new Array(80));
}

export default Block;