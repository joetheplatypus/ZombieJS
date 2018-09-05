import Game from './Helper.js'
import Img from './Image.js'
import GameObject from './GameObject.js';

export default class Projectile extends GameObject {
  constructor(params) {
    super(params);
  }

  update(data) {
    this.x = data.x;
    this.y = data.y;
  }

  draw() {
    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    const x = relPos.x;
    const y = relPos.y;
    // console.log(this.x, this.y)

    Game.ctx.save();
    Game.ctx.fillStyle = "#000000";

    Game.ctx.fillRect(x-5, y-5, 10, 10);

  }

}