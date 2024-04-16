const Cart = require("../models/cart.model");
const Product = require("../models/Product.model");

const addProduct = async (product) => {
  return await Cart.create(product);
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

const product = async (product_name) => {
  return await Product.findOne({ product_name: product_name });
};

const cart_list = async () => {
  return await Cart.find().populate("product");
};

const cartupdate = async (cartid, add, price) => {
  return await Cart.findByIdAndUpdate(
    cartid,
    { qty: add },
    { price: price },
    { new: true }
  );
};

const cart_delete = async (cartid) => {
  return await Cart.findByIdAndDelete(cartid);
};

const cart_update = async (cartid, reqbody, pric) => {
  return await Cart.findByIdAndUpdate(
    cartid,
    { $set: reqbody, price: pric },
    { new: true }
  );
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
  product,
};
