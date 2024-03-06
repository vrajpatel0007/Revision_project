const product = require("../models/Product.model");
const Product = require("../models/Product.model");

const getProductList = async (filter, options) => {
  const skip = Number((options.page || 1) - 1) * Number(options.limit || 10);
  return Product.find(filter).limit(Number(options.limit)).skip(Number(skip));
};
const getProductById = async(productId)=>{
  return Product.findById(productId)
}
const createProduct = async (reqBody) => {
  return Product.create(reqBody);
};

const updateProduct = async (productId, reqBody) => {
  return Product.findOneAndUpdate(
    { _id: productId },
    { $set: reqBody },
    { new: true }
  );
};

const deleteProduct = async (productId) => {
  return Product.findOneAndDelete({ _id: productId });
};

const productId = async (body) => {
  return product.findById(body)
}

module.exports = {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  productId
};
