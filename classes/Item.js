class Item {
  constructor(params) {
    this.name = params.name;
    this.damage = params.damage;
    this.event = params.event;
    this.structure = params.structure;
    this.emitsProjectile = params.emitsProjectile;
    this.projectileDamage = params.projectileDamage;

    Item.list.push(this)
  }

  static fromName(name) {
    for(var i=0; i<Item.list.length; i++) {
      if(Item.list[i].name === name) {
        return Item.list[i];
      }
    }
  }

  static setup(Player) {
    new Item({
      name: "wood",
      damage: 0,
    })
    new Item({
      name: "stone",
      damage: 0,
    })
    new Item({
      name: "iron",
      damage: 0,
    })
    new Item({
      name: "copper",
      damage: 0,
    })
    new Item({
      name: "wooden-wall",
      damage: 0,
      structure: true
    })
    new Item({
      name: "stone-wall",
      damage: 0,
      structure: true
    })
    new Item({
      name: "iron-wall",
      damage: 0,
      structure: true
    })
    new Item({
      name: "copper-wall",
      damage: 0,
      structure: true
    }) 
    new Item({
      name: "gun",
      damage: 0,
      emitsProjectile: true,
      projectileDamage: 50,
    })
  }
  
}
Item.list = [];
module.exports = Item;