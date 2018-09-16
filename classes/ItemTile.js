const GameObject = require('./GameObject');
const Item = require('./Item');

class ItemTile extends GameObject {
  constructor(params) {
    super(params);
    this.className = 'ItemTile';
    this.width = 70;
    this.height = 70;
    this.item = Item.fromName(params.item);

    GameObject.initPack.push(this.getInitPack())
  }

  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className,
      item: this.item.name
    }
  }

  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      className: this.className,
      item: this.item.name
    }
  }

  onCollision(collider) {
    if(collider.className == 'Player') {
      collider.addInventoryItem(this.item, 1)
      GameObject.remove(this)
    }
  }
}

module.exports = ItemTile;