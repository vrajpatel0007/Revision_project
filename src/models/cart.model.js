const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  cart:[
      
  ]         
},{
  timestamps: true,
});

const cart = model("cart", cartSchema);

module.exports = cart;
