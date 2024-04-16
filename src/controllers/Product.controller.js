const fs = require("fs");
const ProductService = require("../services/Product.service");

// Create product
const createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const body = {
      product_name: reqBody.product_name,
      price: reqBody.price,
      product_desc: reqBody.product_desc,
      product_imag: "public/temp/" + req.files.product_imag[0].filename,
    };
    const createdProduct = await ProductService.createProduct(body);

    res.status(200).json({
      message: "Product create successfully!",
      data: createdProduct,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

// Get prooduct list
const getProductList = async (req, res) => {
  try {
    const getList = await ProductService.getProductList();

    res.status(200).json({
      data: getList,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const productId = req.params.productId;
    const productExists = await ProductService.getProductById(productId);
    if (!productExists) {
      throw new Error("Product not found!");
    }
    const body = {};
    if (req.body) {
      body.product_name = reqBody.product_name;
      body.price = reqBody.price;
      body.product_desc = reqBody.product_desc;
    }
    if (req.files && req.files.product_imag) {
      const parth = productExists.product_imag;
      fs.unlink(parth, (err) => {
        if (err) {
          console.log(`An error occurred ${err.message}`);
        } else {
          console.log("Deleted product_imag");
        }
      });
      body.product_imag = "public/temp/" + req.files.product_imag[0].filename;
    }
    const updatedProduct = await ProductService.updateProduct(productId, body);
    res.status(200).json({
      message: "Product details update successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

//  Delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await ProductService.getProductById(productId);
    if (!productExists) {
      throw new Error("Product not found!");
    }

    const deletedProduct = await ProductService.deleteProduct(productId);
    if (deletedProduct) {
      const parth = productExists.product_imag;
      fs.unlink(parth, (err) => {
        if (err) {
          console.log(`An error occurred ${err.message}`);
        } else {
          console.log("Deleted product_imag");
        }
      });
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      message: "Product delete successfully!",
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

// Get_ProductById
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const productExists = await ProductService.getProductById(productId);

    if (!productExists) {
      return res.json({ message: "Product not found!" });
    }

    const product = await ProductService.productId(productId);
    console.log("Retrieved Product:", product);

    return res
      .status(200)
      .json({ message: "Product retrieved successfully", data: product });
  } catch (error) {
    console.error("Error during product retrieval:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  getProductById,
};
