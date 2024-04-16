const express = require("express");
const Order_controller = require("../controllers/Order.controller");
const { autheticate, restrict } = require("../middleware/auth");
const routes = express.Router();

// create-Order
routes.post("/create-Order/:productId", autheticate, Order_controller.createOrder);

//  Get Order list 
routes.get("/list", autheticate, Order_controller.getOrderList);

// Get IdbyOrder
routes.get("/OrderId/:OrderId", autheticate, Order_controller.IdbyOrder);

//  Delete Order 
routes.delete(
  "/delete-Order/:OrderId",
  autheticate,
  Order_controller.deleteOrder
);

// Update Order
routes.put(
  "/update-details/:OrderId",
  autheticate,
  Order_controller.updateDetails
);

module.exports = routes;
