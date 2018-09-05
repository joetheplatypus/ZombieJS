const Tree = require('./resources/Tree');
const Rock = require('./resources/Rock');
const IronOre = require('./resources/IronOre');
const CopperOre = require('./resources/CopperOre');

class Map {
  constructor() {
    this.tileSize = 32;
  }
  coordToTile(coords) {
    const tile = {}
    tile.x = Math.floor(coords.x / this.tileSize);
    tile.y = Math.floor(coords.y / this.tileSize);
    return tile;
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
  
  generate() {
    for(var i=0; i < 6; i++) {
      for(var j=0; j < 6; j++) {
        const r = Math.random()
        if(r > 0.8) {
          new Tree({y:i*1200 + Math.random()*1000, x:j*1200 + Math.random()*1000})
        } else if(r > 0.6) {
          new Rock({y:i*1200 + Math.random()*1000, x:j*1200 + Math.random()*1000})
        } else if(r > 0.4) {
          new IronOre({y:i*1200 + Math.random()*1000, x:j*1200 + Math.random()*1000})
        } else if(r > 0.2) {
          new CopperOre({y:i*1200 + Math.random()*1000, x:j*1200 + Math.random()*1000})
        } else {
          new Tree({y:i*1200 + Math.random()*1000, x:j*1200 + Math.random()*1000})
        }
      }
    }
  }
}
const map = new Map
module.exports = map