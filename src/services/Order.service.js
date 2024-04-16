const Order = require("../models/Order.model");

const createOrder = async (reqBody) => {
  return await Order.create(reqBody);
};
const getOrderList = async () => {
  return await Order.find();
};
const deleteOrder = async (OrderId) => {
  return await Order.findByIdAndDelete(OrderId);
};

const getOrderById = async (OrderId) => {
  return await Order.findById(OrderId);
};

const updateDetails = async (OrderId, updateBody) => {
  return await Order.findByIdAndUpdate(OrderId, { $set: updateBody });
};

const OrderId = async (body) => {
  return await Order.findById(body);
};

module.exports = {
  createOrder,
  getOrderList,
  deleteOrder,
  updateDetails,
  getOrderById,
  OrderId
};
