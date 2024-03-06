const express = require("express");
const upload = require("../middleware/multer");
const { autheticate, restrict } = require("../middleware/auth");
const product_controller = require("../controllers/Product.controller");

const routes = express.Router();

/** Create product */
routes.post(
  "/create",
  autheticate,
  upload.fields([{ name: "product_imag", maxCount: 1 }]),
  product_controller.createProduct
);

/** Get production list */
routes.get("/list", autheticate, product_controller.getProductList);

// Get productbyid
routes.get(
  "/productbyid/:productId",
  autheticate,
  product_controller.getProductById
);

/** Update product details */
routes.put(
  "/update/:productId",
  autheticate,
  upload.fields([{ name: "product_imag", maxCount: 1 }]),
  product_controller.updateProduct
);

/** Delete product */
routes.delete(
  "/delete/:productId",
  autheticate,
  product_controller.deleteProduct
);

module.exports = routes;
