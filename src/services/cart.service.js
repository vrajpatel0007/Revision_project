const Cart = require("../models/cart.model");
const Product = require("../models/Product.model");

const addProduct = async (product) => {
  return Cart.create(product);
};

const idproduct = async (productId) => {
  return await Product.findById(productId);
};

const cart_id = async (cart_id) => {
  return await Cart.findById(cart_id);
};

const prodid = async (body) => {
  return await Product.findById(body);
};

const cart_list = async () => {
  return Cart.find();
};
const cartupdate = async (cartid, add, price) => {
  return Cart.findByIdAndUpdate(
    cartid,
    { qty: add },
    { price: price },
    { new: true }
  );
};

const cart_delete = async (cartid) => {
  return Cart.findByIdAndDelete(cartid);
};

const cart_update = async (cartid, reqbody, prices) => {
  return Cart.findByIdAndUpdate(cartid,{ $set: reqbody },{ price: prices },{ new: true });
};

module.exports = {
  addProduct,
  idproduct,
  prodid,
  cart_list,
  cartupdate,
  cart_id,
  cart_delete,
  cart_update,
};
