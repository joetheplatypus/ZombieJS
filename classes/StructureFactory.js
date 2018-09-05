const WoodenWall = require('./structures/WoodenWall');
const StoneWall = require('./structures/StoneWall');
const CopperWall = require('./structures/CopperWall');
const IronWall = require('./structures/IronWall');

module.exports = {
  classMap: new Map([[
    'wooden-wall', WoodenWall
  ],[
    'stone-wall', StoneWall
  ],[
    'copper-wall', CopperWall
  ],[
    'iron-wall', IronWall
  ]]),
  getClass: function(structureName) {
    return this.classMap.get(structureName)
  }
}