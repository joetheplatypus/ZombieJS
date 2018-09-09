const WoodenWall = require('./structures/WoodenWall');
const StoneWall = require('./structures/StoneWall');
const CopperWall = require('./structures/CopperWall');

module.exports = {
  classMap: new Map([[
    'wooden-wall', WoodenWall
  ],[
    'stone-wall', StoneWall
  ],[
    'copper-wall', CopperWall
  ]]),
  getClass: function(structureName) {
    return this.classMap.get(structureName)
  }
}