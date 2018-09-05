class CraftingRecipe {
  constructor(params) {
    this.input = params.input;
    this.output = params.output;

    CraftingRecipe.list.push(this)
  }

  static setup() {
    new CraftingRecipe({
      input: [{
        item: "wood",
        amount: 5
      }],
      output: {
        item: "wooden-wall",
        amount: 1
      }
    })
    new CraftingRecipe({
      input: [{
        item: "stone",
        amount: 10
      }],
      output: {
        item: "stone-wall",
        amount: 1
      }
    })
    new CraftingRecipe({
      input: [{
        item: "copper",
        amount: 10
      }],
      output: {
        item: "copper-wall",
        amount: 1
      }
    })
    new CraftingRecipe({
      input: [{
        item: "iron",
        amount: 10
      }],
      output: {
        item: "iron-wall",
        amount: 1
      }
    })
  }
  
}
CraftingRecipe.list = [];
module.exports = CraftingRecipe;