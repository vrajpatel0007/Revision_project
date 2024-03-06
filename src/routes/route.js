const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const product = require("./Product.route");
const Order = require("./Order.route");
const cart = require("./cart.route");

routes.use("/user", userRoute);
routes.use("/product", product);
routes.use("/Order", Order);
routes.use("/cart", cart);

module.exports = routes;
