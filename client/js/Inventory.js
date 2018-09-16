import Game from './Helper.js'
import GUI from './GUI.js'
import DOM from './DOM.js'
import Img from './Image.js'

const Inventory =  {
  items: [],
  crafting: [],
  selectedIndex: 0,
  update(pack) {
    this.items = pack.items;
    this.crafting = pack.crafting;
  },
  onUseItem() {
    Game.socket.emit('inventoryUseItem', {})
  },
  onDropItem() {
    Game.socket.emit('inventoryDropItem', {})
  },
  onSelectItem(num) {
    Game.socket.emit('inventorySelectItem', num-1)
    this.selectedIndex = num-1;
    this.drawInventory();
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
      if(this.items[i] == null) {
        continue;
      }
      const item = this.items[i];
      let div = document.createElement('div');
      let imgdiv = document.createElement('div');
      let text = document.createElement('span');
      let img = Img.map.get(`icon-${item.item.name}`);
     // div.setAttribute('data-item',item.item.name);
      div.style.opacity = "0.6";
      imgdiv.style.backgroundImage = `url('${Img.spritesheet.src}')`;
      imgdiv.style.backgroundPosition = `-${img.srcX}px -${img.srcY}px`;
      imgdiv.style.width = `${img.width}px`;
      imgdiv.style.height = `${img.height}px`;
      imgdiv.style.margin = '0 auto'
      div.style.width = '64px';
      div.style.height = '64px';
      div.style.display = 'flex'
      div.style.alignItems = 'center'
      text.innerText = item.amount
      text.style.position = 'absolute'
      text.style.right = '50%';
      text.style.padding = '1';
      text.style.color = 'white';
      text.style.fontSize = '1.5em';
      text.style.fontFamily = 'sans-serif';

      if(i == this.selectedIndex) {
        div.style.opacity = "1";
      }

      div.onmouseenter = function() {
        Game.ctxInteract = false;
        
      }
      div.onmouseleave = function() {
        Game.ctxInteract = true;
      }

      div.appendChild(text)
      div.appendChild(imgdiv);
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