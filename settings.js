module.exports = {
  tickRate: 20,
  gatherRate: 0,
  noWeaponDamage: 1,
  crafting: {
    base: [{
      item: 'wooden-crafting-hut',
      recipe: [{
        item: 'wood',
        amount: 10
      }]
    }],
    tier: [[
      {
        item: 'wooden-crafting-hut',
        recipe: [{
          item: 'wood',
          amount: 10
        }]
      },{
        item: 'bow',
        recipe: [{
          item: 'wood',
          amount: 10
        },{
          item: 'string',
          amount: 10
        }]
      },{
        item: 'wooden-axe',
        recipe: [{
          item: 'wood',
          amount: 20
        },{
          item: 'string',
          amount: 10
        }]
      },{
        item: 'wooden-pickaxe',
        recipe: [{
          item: 'wood',
          amount: 20
        },{
          item: 'string',
          amount: 10
        }]
      },{
        item: 'wooden-sword',
        recipe: [{
          item: 'wood',
          amount: 20
        },{
          item: 'string',
          amount: 20
        }]
      }
    ],[

    ],[

    ]]
  }
}