import Game from './Helper.js'
import Img from './Image.js'
import GameObject from './GameObject.js';

export default class Bush extends GameObject {
  constructor(params) {
    super(params)
  }

  update(data) {
    this.x = data.x;
    this.y = data.y;
  }

  draw() {
    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    const x = relPos.x;
    const y = relPos.y;

    // Game.ctx.drawImage(Img.bush,x-Img.bush.width/2,y-Img.bush.height/2);
  }
}