const Item = require('./Item')
const Settings = require('../settings')
const CraftingRecipe = require('./CraftingRecipe')

class Inventory {
  constructor(params) {
    this.playerId = params.playerId;
    // this.craftingTiers = [false, false, false];
    // this.craftable = [];
    this.items = [];
    // this.currentItem = null;

    // this.updateCrafting(this.craftingTiers);
  }

  addItem(item, amount) {
    if(this.hasItem(item, 1)) {
      for(var i=0; i<this.items.length; i++) {
        if(this.items[i].item.name === item.name) {
          this.items[i].amount += amount;
        }
      }
    } else {
      this.items.push({item:item, amount:amount});
    }
  }
  
  removeItem(item, amount) {
    if(this.hasItem(item, amount)) {
      for(var i=0; i<this.items.length; i++) {
        if(this.items[i].item.name === item.name) {
          this.items[i].amount -= amount;
          if(this.items[i].amount === 0) {
            if(this.currentItem === this.items[i].item.name) {
              this.currentItem = null;
            }
            this.items.splice(i,1)
          }
        }
      }
    }
  }

  hasItem(item, amount) {
    for(var i=0; i<this.items.length; i++) {
      if(this.items[i].item.name === item.name && this.items[i].amount >= amount) {
        return true
      }
    }
    return false
  }

  useItem(item) {
    if(this.hasItem(item, 1)) {
      if(item.event) {
        item.event();
      }
    }
  }

  getCraftable() {
    let craftable = [];
    recipeloop:
    for(var i=0; i < CraftingRecipe.list.length; i++) {
      const recipe = CraftingRecipe.list[i];
      inputloop:
      for(var j=0; j < recipe.input.length; j++) {
        if(!this.hasItem(Item.fromName(recipe.input[j].item), recipe.input[j].amount)) {
          continue recipeloop
        }
      }
      craftable.push(CraftingRecipe.list[i]);
    }
    return craftable;
  }

  // itemFromName(itemName) {
  //   for(var i=0; i<this.items.length; i++) {
  //     if(this.items[i].item.name === itemName) {
  //       return this.items[i]
  //     }
  //   }
  // }

  // onSelectItem(itemName) {
  //   this.currentItem = itemName
  // }

  // onUseItem() {
  //   if(!this.currentItem) {
  //     return;
  //   }
  //   const item = Item.fromName(this.currentItem);
  //   if(item.event) {
  //     item.event(this.playerId)
  //     this.removeItem(Item.fromName(this.currentItem), 1)
  //   }
  // }

  craftItem(recipe) {
    for(var i=0; i<recipe.input.length; i++) {
      const item = Item.fromName(recipe.input[i].item)
      const amount = recipe.input[i].amount
      if(!this.hasItem(item, amount)) {
        return;
      }
    }
    for(var i=0; i<recipe.input.length; i++) {
      this.removeItem(Item.fromName(recipe.input[i].item), recipe.input[i].amount);
    }
    this.addItem(Item.fromName(recipe.output.item), recipe.output.amount)
  }

  // updateCrafting(tiers) {
  //   this.craftingTiers = tiers
    
  //   this.craftable = []
  //   this.craftable.push.apply(this.craftable, Settings.crafting.base)

  //   for(var i=0; i<this.craftingTiers.length; i++) {
  //     if(this.craftingTiers[i] === true) {
  //       this.craftable.push.apply(this.craftable, Settings.crafting.tier[i])
  //     }
  //   }
  // }

  clear() {
    this.items = [];
  }
}
module.exports = Inventory