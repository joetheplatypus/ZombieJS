class GameObject {
  constructor(params) {
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
    this.renderLayer = 1;

    GameObject.list.push(this);
  }
  update(data) {
    this.x = data.x;
    this.y = data.y;
  }
  statUpdate() {
    
  }
  draw() {

  }
  onRemove() {
    
  }
  getRenderLayer() {
    return this.renderLayer
  }
  inViewPort(viewport) {
    if(this.x < viewport.left - 64 || this.y < viewport.top - 64 || this.x > viewport.right + 64 || this.y > viewport.bottom + 64) {
      return false;
    }
    return true;
  }
  static fromID(id) {
    for(var i = 0; i < GameObject.list.length; i++) {
      if(GameObject.list[i].id === id) {
        return GameObject.list[i]
      }
    }
  }
  static drawAll(viewport) {
    let renderLayers =[[],[],[]]
    for(var i = 0; i < GameObject.list.length; i++) {
      if(GameObject.list[i].inViewPort(viewport)) {
        renderLayers[GameObject.list[i].getRenderLayer()-1].push(GameObject.list[i])
      }
    }
    for(var i = 0; i < renderLayers.length; i++) {
      for(var j = 0; j < renderLayers[i].length; j++) {
        renderLayers[i][j].draw();
      }
    }
  }
  static statUpdateAll() {
    for(var i = 0; i < GameObject.list.length; i++) {
      GameObject.list[i].statUpdate()
    }
  }
}
GameObject.list = [];

export default GameObject