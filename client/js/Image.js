import Game from './Helper.js'
//IMAGES
const Img = {};
Img.characters = new Image()
Img.characters.src = '/client/img/spritesheet_characters.png'
Img.tilesBig = new Image()
Img.tilesBig.src = '/client/img/tilesheetbig.png'
Img.tiles = new Image()
Img.tiles.src = '/client/img/tilesheet.png'

//must use icon- prefix for all icon images
Img.map = new Map([[
  'player-stand',
  {
    img: Img.characters,
    srcX: 389,
    srcY: 175,
    width: 35,
    height: 44,
  }
],[
  'tree',
  {
    img: Img.tilesBig,
    srcX: 18*128,
    srcY: 6*128+1,
    width: 254,
    height: 254,
  }
],[
  'grass-1',
  {
    img: Img.tilesBig,
    srcX: 0,
    srcY: 0,
    width: 128,
    height: 128,
  }
],[
  'dirt-1',
  {
    img: Img.tilesBig,
    srcX: 513,
    srcY: 0,
    width: 127,
    height: 127,
  }
],[
  'wooden-wall',
  {
    img: Img.tilesBig,
    srcX: 14*128+1,
    srcY: 3*128+1,
    width: 127,
    height: 127,
  }
],[
  'icon-wood',
  {
    img: Img.tiles,
    srcX: 21*64+1,
    srcY: 9*64+1,
    width: 63,
    height: 63,
  }
],[
  'icon-wooden-wall',
  {
    img: Img.tiles,
    srcX: 14*64+1,
    srcY: 3*64+1,
    width: 63,
    height: 63,
  }
]])

Img.draw = function(imageName, x, y) {
  const image = Img.map.get(imageName);
  Game.ctx.drawImage(image.img, image.srcX, image.srcY, image.width, image.height, x - image.width/2, y - image.height/2, image.width, image.height,);
}



export default Img;
// https://game-icons.net/lorc/originals/fire-axe.html
