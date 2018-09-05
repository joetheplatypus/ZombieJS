import Game from './Helper.js'
import GUI from './GUI.js'
import Img from './Image.js'
import GameObject from './GameObject.js';

export default class ItemTile extends GameObject{
  constructor(params) {
    super(params)
    this.item = params.item;
  }

  update(data) {
    this.x = data.x;
    this.y = data.y;
  }

  draw() {
    const relPos = Game.absoluteToRelative({x:this.x,y:this.y});
    const x = relPos.x;
    const y = relPos.y;

    // const image = GUI.itemImages.get(this.item)
  
    // Game.ctx.drawImage(image,x-image.width/2,y-image.height/2);
  }
}