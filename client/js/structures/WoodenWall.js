import Structure from '../Structure.js';
import Img from '../Image.js';
import Game from '../Helper.js';

export default class WoodenWall extends Structure {
  constructor(params) {
    super(params);
  }

  draw() {
    super.draw();

    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    Img.draw(`wooden-wall`, relPos.x, relPos.y)
  }
}