const express = require("express");
const cart_controller = require("../controllers/cart.controller");
const { autheticate } = require("../middleware/auth");
const routes = express.Router();

routes.post("/add/:productId", autheticate, cart_controller.addtocart);
routes.get("/list", autheticate, cart_controller.list);
routes.delete("/delete/:cart_id", autheticate, cart_controller.Cart_delete);
routes.put("/update/:cart_id", autheticate, cart_controller.cart_update);

module.exports = routes;
