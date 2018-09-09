import Game from './Helper.js'
//IMAGES
const Img = {};
Img.spritesheet = new Image();
Img.spritesheet.src = '/client/img/spritesheet.png'
// Img.background = new Image();
// Img.background.src = '/client/img/background.png'

//must use icon- prefix for all icon images
Img.map = new Map([[
  'player-stand',
  {
    srcX: 518,
    srcY: 58,
    width: 36,
    height: 43,
  }
],[
  'tree',
  {
    srcX: 1041,
    srcY: 354,
    width: 64,
    height: 64,
  }
],[
  'grass-1',
  {
    srcX: 563,
    srcY: 58,
    width: 64,
    height: 64,
  }
],[
  'dirt-1',
  {
    srcX: 859,
    srcY: 58,
    width: 64,
    height: 64,
  }
],[
  'rock',
  {
    srcX: 1007,
    srcY: 58,
    width: 64,
    height: 64,
  }
],[
  'copper-ore',
  {
    srcX: 79,
    srcY: 280,
    width: 64,
    height: 64,
  }
],[
  'copper-wall',
  {
    srcX: 301,
    srcY: 428,
    width: 64,
    height: 64,
  }
],[
  'stone-wall',
  {
    srcX: 449,
    srcY: 1020,
    width: 64,
    height: 64,
  }
],[
  'wooden-wall',
  {
    srcX: 1303,
    srcY: 58,
    width: 64,
    height: 64,
  }
],[
  'icon-wood',
  {
    srcX: 745,
    srcY: 650,
    width: 64,
    height: 64,
  }
],[
  'icon-wooden-wall',
  {
    srcX: 1303,
    srcY: 58,
    width: 64,
    height: 64,
  }
],[
  'icon-stone-wall',
  {
    srcX: 449,
    srcY: 1020,
    width: 64,
    height: 64,
  }
],[
  'icon-stone',
  {
    srcX: 153,
    srcY: 576,
    width: 64,
    height: 64,
  }
],[
  'icon-copper-wall',
  {
    srcX: 301,
    srcY: 428,
    width: 64,
    height: 64,
  }
],[
  'icon-copper',
  {
    srcX: 1041,
    srcY: 724,
    width: 64,
    height: 64,
  }
]])

Img.draw = function(imageName, x, y) {
  const image = Img.map.get(imageName);
  if(x < 0-(image.width)/2 || y < 0-(image.height)/2 || x > Game.width+(image.width)/2 || y > Game.height+(image.height)/2) {
    //img not in viewport
  } else {
    Game.ctx.drawImage(Img.spritesheet, image.srcX+1, image.srcY+1, image.width-2, image.height-2, x - (image.width-2)/2, y - (image.height-2)/2, image.width-2, image.height-2);
  }
}



export default Img;
// https://game-icons.net/lorc/originals/fire-axe.html
