import Game from './Helper.js'
import Img from './Image.js'
import Block from './Block.js';

export default class Rock extends Block {
  constructor(params) {
    super(params)
    this.health = params.health;
    this.maxHealth = params.maxHealth;
  }

  update(data) {
    this.x = data.x;
    this.y = data.y;
    this.health = data.health;
  }

  draw() {
    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    const x = relPos.x;
    const y = relPos.y;

    // Game.ctx.drawImage(Img.rock,x-Img.rock.width/2,y-Img.rock.height/2);
    Img.draw('rock', x, y);

    var hpWidth = 30 * this.health/this.maxHealth;
    Game.ctx.fillStyle = "red";
    Game.ctx.fillRect(x - hpWidth/2, y - 50, hpWidth,4);
  }

}