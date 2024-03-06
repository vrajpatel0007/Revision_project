const Cart = require("../models/cart.model");
const Product = require("../models/Product.model");


const addProduct = async (product) => {
  return Cart.create(product);
};

const idproduct = async (productId) => {
  return await Product.findById(productId);
};

const prodid = async (body) => {
  return await Product.findById(body);
};

module.exports = {
  addProduct,
  idproduct,
  prodid,
};