const express = require("express");
const Order_controller = require("../controllers/Order.controller")
const { autheticate, restrict } = require("../middleware/auth");
const routes = express.Router();

// create-Order
routes.post("/create-Order",Order_controller.createOrder)

/** Get Order list */
routes.get("/list",Order_controller.getOrderList);

/** Delete Order */
routes.delete("/delete-Order/:OrderId",Order_controller.deleteOrder);

// Update Order
routes.put("/update-details/:OrderId",Order_controller.updateDetails);


module.exports = routes;