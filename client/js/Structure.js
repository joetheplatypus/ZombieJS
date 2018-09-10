import Game from './Helper.js'
import Img from './Image.js'
import Player from './Player.js'
import GUI from './GUI.js'
import Block from './Block.js';

export default class Structure extends Block{
  constructor(params) {
    super(params)
    this.health = params.health;
    this.owner = params.owner;
    this.health = params.health;
    this.maxHealth = params.maxHealth;
  }

  update(data) {
    this.x = data.x;
    this.y = data.y;
    this.health = data.health;
  }

  draw() {

    if(this.health !== this.maxHealth) {
      var hpWidth = 30 * this.health/this.maxHealth;
      Game.ctx.fillStyle = "red";
      Game.ctx.fillRect(x - hpWidth/2, y - 50, hpWidth,4);
    }
    
    //minimap
    const minimapRelPos = Game.absoluteToRelativeMinimap({x:this.x,y:this.y});
    if(this.owner === Player.selfId) {
      Game.mapctx.fillStyle = "blue";
    } else {
      Game.mapctx.fillStyle = "grey";
    }
    Game.mapctx.fillRect(minimapRelPos.x,minimapRelPos.y,10,10);
  }

}