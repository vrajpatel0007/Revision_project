const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const product = require("./Product.route");
const Order = require("./Order.route");

routes.use("/user", userRoute);
routes.use("/product", product);
routes.use("/Order", Order);

module.exports = routes;
