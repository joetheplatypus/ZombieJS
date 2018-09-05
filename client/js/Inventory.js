import Game from './Helper.js'
import GUI from './GUI.js'
import DOM from './DOM.js'

const Inventory =  {
  items: [],
  crafting: [],
  update(pack) {
    this.items = pack.items;
    this.crafting = pack.crafting;
  },
  onUseItem(itemName) {
    Game.socket.emit('inventoryUseItem', itemName)
  },
  craftItem(recipe) {
    Game.socket.emit('inventoryCraftItem', recipe)
  },
  draw() {
    this.drawInventory();
    this.drawCrafting();
  },
  drawInventory() {
    DOM.inventory.innerHTML = '';

    for(var i=0; i<this.items.length; i++) {
      const item = this.items[i];
      let div = document.createElement('div');
      let text = document.createElement('span');
      let img = GUI.itemImages.get(item.item.name);
      div.setAttribute('data-item',item.item.name);
      img.style.opacity = "0.6";
      text.innerText = item.amount
      div.onmouseenter = function() {
        Game.ctxInteract = false;
        img.style.opacity = "1";
      }
      div.onmouseleave = function() {
        Game.ctxInteract = true;
        img.style.opacity = "0.6";
      }
      div.onclick = function() {
        const itemName = this.getAttribute('data-item')
        Inventory.onUseItem(itemName)
      }

      div.appendChild(img);
      div.appendChild(text);
      DOM.inventory.appendChild(div)
    
    }
  },
  drawCrafting() {
    DOM.crafting.innerHTML = '';

    for(var i=0; i<this.crafting.length; i++) {
      const recipe = this.crafting[i];

      let button = document.createElement('button');
      let text = document.createTextNode('item'); 
      button.setAttribute('data-item',recipe.output.item);
      text.nodeValue = GUI.itemNames.get(recipe.output.item)

      button.onmouseenter = function() {
        Game.ctxInteract = false;
      }
      button.onmouseleave = function() {
        Game.ctxInteract = true;
      }
      button.onclick = function() {
        const itemName = this.getAttribute('data-item')
        Inventory.craftItem(recipe)
      }
      button.appendChild(text);
      DOM.crafting.appendChild(button)

    }
  }
}
export default Inventory;