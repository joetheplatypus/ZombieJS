import Structure from '../Structure.js';
import Img from '../Image.js';
import Game from '../Helper.js';
import Block from '../Block.js';

export default class StoneWall extends Structure {
  constructor(params) {
    super(params);
    this.neighbours = {
      top: false,
      right: false,
      left: false,
      bottom: false
    };
    this.multiBlockInfo = '';
    this.getMultiBlockInfo();
    this.refreshNeighbours();
  }

  draw() {
    super.draw();

    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    Img.draw(`stone-wall${this.multiBlockInfo}`, relPos.x, relPos.y)
  }

  
  getMultiBlockInfo() {
    this.multiBlockInfo = '';
    const tile = Game.coordToTile({x:this.x,y:this.y})
    if(Block.map[tile.y+1][tile.x] instanceof StoneWall) {
      this.multiBlockInfo += 'b'
    }
    if(Block.map[tile.y-1][tile.x] instanceof StoneWall) {
      this.multiBlockInfo += 't'
    }
    if(Block.map[tile.y][tile.x-1] instanceof StoneWall) {
      this.multiBlockInfo += 'l'
    }
    if(Block.map[tile.y][tile.x+1] instanceof StoneWall) {
      this.multiBlockInfo += 'r'
    }
  }

  refreshNeighbours() {
    const tile = Game.coordToTile({x:this.x,y:this.y})
    if(Block.map[tile.y+1][tile.x] instanceof StoneWall) {
      Block.map[tile.y+1][tile.x].getMultiBlockInfo()
    }
    if(Block.map[tile.y-1][tile.x] instanceof StoneWall) {
      Block.map[tile.y-1][tile.x].getMultiBlockInfo()
    }
    if(Block.map[tile.y][tile.x-1] instanceof StoneWall) {
      Block.map[tile.y][tile.x-1].getMultiBlockInfo()
    }
    if(Block.map[tile.y][tile.x+1] instanceof StoneWall) {
      Block.map[tile.y][tile.x+1].getMultiBlockInfo()
    }
  }
}