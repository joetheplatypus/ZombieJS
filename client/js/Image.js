import Game from './Helper.js'
//IMAGES
const Img = {};
Img.characters = new Image()
Img.characters.src = '/client/img/spritesheet_characters.png'
Img.tiles = new Image()
Img.tiles.src = '/client/img/tilesheet.png'

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
    img: Img.tiles,
    srcX: 18*128,
    srcY: 6*128+1,
    width: 254,
    height: 254,
  }
],[
  'grass-1',
  {
    img: Img.tiles,
    srcX: 0,
    srcY: 0,
    width: 128,
    height: 128,
  }
],[],[]])

Img.draw = function(imageName, x, y) {
  const image = Img.map.get(imageName);
  Game.ctx.drawImage(image.img, image.srcX, image.srcY, image.width, image.height, x - image.width/2, y - image.height/2, image.width, image.height,);
}



export default Img;
// https://game-icons.net/lorc/originals/fire-axe.html
