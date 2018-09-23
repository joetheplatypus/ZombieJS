import Game from './Helper.js'
import Img from './Image.js'
import Block from './Block.js';

export default class Tree extends Block {
  constructor(params) {
    super(params)
    this.health = params.health;
    this.maxHealth = params.maxHealth;
	const tile = Game.coordToTile({x:this.x,y:this.y});
	this.tileX = tile.x;
	this.tileY = tile.y;
    
    this.renderLayer = 3;
  }

  update(data) {
    this.x = data.x;
    this.y = data.y;
    this.health = data.health;
	
	const tile = Game.coordToTile({x:this.x,y:this.y});
	this.tileX = tile.x;
	this.tileY = tile.y;
  }

  draw() {
    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    const x = relPos.x;
    const y = relPos.y;

    Img.drawBlock('tree', this.tileX, this.tileY);

    var hpWidth = 30 * this.health/this.maxHealth;
    Game.ctx.fillStyle = "red";
    Game.ctx.fillRect(x - hpWidth/2, y - 50, hpWidth,4);
  }
}