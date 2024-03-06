const express = require('express');
const cart_controller = require("../controllers/cart.controller")
const routes = express.Router();

routes.post("/add/:productId", cart_controller.addtocart)


module.exports = routes;
