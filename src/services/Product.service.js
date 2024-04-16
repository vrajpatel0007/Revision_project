const Product = require("../models/Product.model");

const getProductList = async (filter, options) => {
  return await Product.find();
};
const getProductById = async(productId)=>{
  return await Product.findById(productId)
}
const createProduct = async (reqBody) => {
  return await Product.create(reqBody);
};

const updateProduct = async (productId, reqBody) => {
  return await Product.findOneAndUpdate(
    { _id: productId },
    { $set: reqBody },
    { new: true }
  );
};

const deleteProduct = async (productId) => {
  return await Product.findOneAndDelete({ _id: productId });
};

const productId = async (body) => {
  return await Product.findById(body)
}

module.exports = {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  productId
};
