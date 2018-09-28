const Entity = require('./Entity');
const GameObject = require('./GameObject');
const Physics = require('./Physics');
const Inventory = require('./Inventory');
const StructureFactory = require('./StructureFactory');
const Projectile = require('./Projectile');
const Item = require('./Item')
const Settings = require('../settings');
const Block = require('./Block');
const Map = require('./Map');
const ItemTile = require('./ItemTile');

class Player extends Entity {
  constructor(param) {
    super(param);
    this.x = Math.random()*5000;
    this.y = Math.random()*5000;
    this.angle = 0;
    //classname
    this.className = 'Player'
    //user info
    this.name = param.name;
    this.socket = param.socket;
    //game vars
    this.speed = 10;
    this.maxHealth = 100;
    this.health = 100;
    this.score = 0;
    //physics
    this.width = 40;
    this.height = 40;
    //misc
    this.attackBuffer = false
    // this.harvestProgress = 0;
    this.inventory = new Inventory({playerId: this.id});
    this.selectedInventoryIndex = 0;

    GameObject.initPack.push(this.getInitPack())
  }

  update() {
    super.update();    
  }

  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      health: this.health,
      score: this.score,
      name: this.name,
      className: this.className,
      angle: this.angle,
    }
  }

  //data needed to send this to a client
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      health: this.health,
      maxHealth: this.maxHealth,
      score: this.score,
      name: this.name,
      className: this.className,
      angle: this.angle,
    }
  }

  onKeyUp(key) {
    if(key === "up" && this.velY == -this.speed) {
      this.velY = 0
    } else if(key === "down" && this.velY == this.speed) {
      this.velY = 0
    }
    if(key === "left" && this.velX == -this.speed) {
      this.velX = 0
    } else if(key === "right" && this.velX == this.speed) {
      this.velX = 0
    }
    if(key === "attack" && this.attackBuffer) {
      this.attackBuffer = false;
    }
  }

  onKeyDown(key) {
    if(key === "up") {
      this.velY = -this.speed
    } else if(key === "down") {
      this.velY = this.speed
    }
    if(key === "left") {
      this.velX = -this.speed
    }else if(key === "right") {
      this.velX = this.speed
    }
    if(key === "attack" && !this.attackBuffer) {
      this.attackBuffer = true;
      this.shootProj(this.angle, 10)
    }
    if(key === "useItem") {
      this.useInventoryItem();
    }    
  }

  onTakeDamage(damage, attacker) {
    super.onTakeDamage(damage, this.attacker);
    if(this.health <= 0) {
      attacker.onKill();
    }
  }

  onKill() {
    this.score++;
  }

  onDeath() {
    this.health = this.maxHealth;
    this.x = Math.random()*5000;
    this.y = Math.random()*5000;
  }

  addInventoryItem(item, amount) {
    this.inventory.addItem(item, amount)
    this.sendInventoryPack();
  }

  selectInventorySlot(index) {
    this.selectedInventoryIndex = index;
  }

  dropInventoryItem() {
    const item = this.inventory.getItemAtIndex(this.selectedInventoryIndex)
    if(item == null) {
      return;
    }
    for(var i=0; i<item.amount; i++) {
      new ItemTile({
        x: this.x + Math.cos(Math.PI*this.angle/180)*(100+Math.random()*100),
        y: this.y + Math.sin(Math.PI*this.angle/180)*(100+Math.random()*100),
        item: item.item.name
      })
    }
    this.removeInventoryItem(item.item, item.amount)
  }

  useInventoryItem() {
    const itemInInv = this.inventory.getItemAtIndex(this.selectedInventoryIndex)
    if(itemInInv == null) {
      return;
    }
    const item = itemInInv.item;
    if(item.structure) {
      this.socket.emit('placingStructure', item.name);
    } else if(item.emitsProjectile) {
      this.shootProj(this.angle, item.projectileDamage)
    } else {
      this.inventory.useItem(item)
      this.sendInventoryPack();
    }
  }

  craftInventoryItem(recipe) {
    this.inventory.craftItem(recipe);
    this.sendInventoryPack();
  }

  removeInventoryItem(item, amount) {
    this.inventory.removeItem(item, amount)
    this.sendInventoryPack();
  }

  sendInventoryPack() {
    this.socket.emit('inventory', {items:this.inventory.items, crafting:this.inventory.getCraftable()});
  }

  placeStructure(data) {
    if(this.inventory.hasItem(Item.fromName(data.structureName), 1)) {
      const structureClass = StructureFactory.getClass(data.structureName);
      if(!data.tileX || !data.tileY || Block.tileOccupied({x:data.tileX,y:data.tileY})) {
        // tile already occupied
      } else {
        new structureClass({
          tileX:data.tileX,
          tileY:data.tileY,
          owner:this.id
        });
        this.removeInventoryItem(Item.fromName(data.structureName), 1);
      }
    }
  }

  shootProj(angle, damage) {
    new Projectile({
      x: this.x,
      y: this.y,
      angle: angle,
      parent: this,
      damage: damage,

    })
  }

  // sendStructurePlacingPack(params) {
  //   this.socket.emit('placingStructure', params);
  // }

  // addItem(item, amount) {
  //   this.inventory.addItem(item, amount)
  //   this.sendInventoryPack();
  // }

  // removeItem(item, amount) {
  //   this.inventory.removeItem(item, amount)
  //   this.holdingItem = this.inventory.currentItem
  //   this.sendInventoryPack();
  // }

  // onSelectItem(itemName) {
  //   this.inventory.onSelectItem(itemName);
  //   this.holdingItem = itemName
  //   this.sendInventoryPack();
  // }

  // onCraftItem(itemName) {
  //   this.inventory.onCraftItem(itemName);
  //   this.sendInventoryPack();
  // }

  // updateCrafting(data) {
  //   this.inventory.updateCrafting(data);
  //   this.sendInventoryPack();
  // }

  // respawn() {
  //   this.inventory.clear()
  //   this.sendInventoryPack()
  //   this.holdingItem = null;
  //   this.health = this.maxHealth
  //   this.x = 4350;
  //   this.y = 2600;
  // }

  // emitProjectile(projectile, angle) {
  //   const projectile = new Projectile({
  //     parent: this.id,
  //     angle: angle,
  //     x: this.x,
  //     y: this.y,
  //     type: projectile
  //   });
  // }

  // takeDamage(damage) {
  //   this.health -= damage;
  // }

  // applyCraft() {
  //   const tiers = Structure.applyCraft(this.id, this.x, this.y)
  //   if(tiers.toString() !== this.inventory.craftingTiers.toString()) {
  //     this.updateCrafting(tiers)
  //   }
  // }

  // removeCraft(tier) {
  //   if(tier === 1) {
  //     this.inventory.updateCrafting({
  //       tier1: false
  //     })
  //   } else if(tier === 2) {
  //     this.inventory.updateCrafting({
  //       tier2: false
  //     })
  //   } else if(tier === 3) {
  //     this.inventory.updateCrafting({
  //       tier3: false
  //     })
  //   }
  // }

  static onConnect(socket, name, ip) {
    console.log(`${name} (${ip}) joined the game`);
    const player = new Player ({
      name: name,
      id: socket.id,
      socket:socket
    });

    //setup function bindings
    socket.on('playerInput', function(data){
      if(data.state) {
        player.onKeyDown(data.inputId)
      } else {
        player.onKeyUp(data.inputId)
      }
    });

    socket.on('playerMouse', function(data) {
      player.angle = data.angle;
    });

    // socket.on('inventorySelectItem', function(itemName) {
    //   player.onSelectItem(itemName)
    // });

    socket.on('inventoryUseItem', function() {
      player.useInventoryItem()
    });

    socket.on('inventorySelectItem', function(index) {
      player.selectedInventoryIndex = index;
    });

    socket.on('inventoryDropItem', function(index) {
      player.dropInventoryItem();
    });

    socket.on('inventoryCraftItem', function(recipe) {
      player.craftInventoryItem(recipe)
    });

    socket.on('placedStructure', function(data) {
      player.placeStructure(data)
    });
    
    // socket.on('grabItems', function(data) {
    //   const box = Storage.fromID(data.boxid);
    //   if(box.inventory.items.length > 0) {
    //     player.inventory.addItem(box.inventory.items[0].id,box.inventory.items[0].amount);
    //     box.inventory.removeItem(box.inventory.items[0].id,box.inventory.items[0].amount);
    //   }
    // });

    socket.emit('mapSize', Map.getSize())
    
    socket.emit('selfId', socket.id);

    socket.emit('init', GameObject.getAllInitPacks());

  }

  static onDisconnect(socket) {
    if(Player.fromID(socket.id)) {
      console.log(GameObject.fromID(socket.id).name + " left the game");
    }
    GameObject.remove(GameObject.fromID(socket.id));
  }

  static nameTaken(name) {
    for(var i=0; i<GameObject.list.length; i++) {
      if(GameObject.list[i] instanceof Player) {
        if(GameObject.list[i].name == name) {
          return true;
        }
      }
    }
    return false;
  }
  
  static nearestToPoint(point) {
	let shortestDist = null;
	let shortestDistPlayer = null;
	for(var i=0; i<GameObject.list.length; i++) {
      if(GameObject.list[i] instanceof Player) {
        const dist = Math.sqrt(Math.pow(GameObject.list[i].x - point.x, 2) + Math.pow(GameObject.list[i].y - point.y, 2));
		if (dist < shortestDist || shortestDist == null) {
			shortestDist = dist;
			shortestDistPlayer = GameObject.list[i]
		}
      }
    }
	return shortestDistPlayer;
  }
}

module.exports = Player;