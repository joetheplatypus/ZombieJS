const Physics = require('./Physics');
const Game = require('./Game')

class GameObject {
  //REQUIRED
  //this.className
  constructor(params) {
    this.id = params.id || Math.random()
    this.x = params.x || 4350;
    this.y = params.y || 2600;
    this.velX = 0;
    this.velY = 0;
    this.width = 0;
    this.height = 0;
    this.className = ''

    GameObject.list.push(this);
  }
  //updates entities position based on velocities **UPDATE TO INCLUDE ALL LOGIC**
  update() {
    this.x += this.velX
    this.y += this.velY
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className
    }
  }
  //returns init pack **UPDATE TO INCLUDE ALL NEEDED INFO**
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className
    }
  }
  //can be used as needed
  onCollision(collider) {

  }
  //used for collision detection
  getBounds() {
    return Physics.rectangle(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
  }
  //helper function using pythag to find dist to a given point
  getDistanceToPoint(point) {
    return(Math.sqrt(Math.pow(this.x-point.x, 2) + Math.pow(this.y-point.y, 2)));
  }
  //returns init remove and update packs for all entities and clears init and remove packs afterwards
  static getFrameUpdateData() {
    let pack = {
      init: GameObject.initPack,
      remove: GameObject.removePack,
      update: {
        data: GameObject.list.map(obj => obj.getUpdatePack()),
        timeSent: new Date().getTime()
      },
      timer: Game.getTimer()
    }
    GameObject.initPack = [];
    GameObject.removePack = [];

    return pack;
  }
  
  static getAllInitPacks() {
    return (GameObject.list.map(obj => obj.getInitPack()))
  }

  static updateAll() {
    for(var i =0; i < GameObject.list.length; i++) {
      GameObject.list[i].update();
    }
  }

  static remove(object) {
    GameObject.toDeleteBuffer.push(object)
  }

  static deleteBuffer() {
    for(var i=0; i < GameObject.toDeleteBuffer.length; i++) {
      GameObject.list.splice(GameObject.list.indexOf(GameObject.toDeleteBuffer[i]),1)
      GameObject.removePack.push({id:GameObject.toDeleteBuffer[i].id, className:GameObject.toDeleteBuffer[i].className})
    }
    GameObject.toDeleteBuffer = [];
  }

  static fromID(id) {
    for(var i=0; i<GameObject.list.length; i++) {
      if(GameObject.list[i].id == id) {
        return GameObject.list[i];
      }
    }
  }

}
GameObject.list = [];
GameObject.initPack = [];
GameObject.removePack = [];

GameObject.toDeleteBuffer = [];

module.exports = GameObject;