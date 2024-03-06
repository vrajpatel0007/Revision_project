const Order = require("../models/Order.model");


const createOrder = async (reqBody) => {
  return Order.create(reqBody);
};
const getOrderList = async (filter, options) => {
  return Order.find();
};
const deleteOrder = async (OrderId) => {
  return Order.findByIdAndDelete(OrderId);
};

const getOrderById = async (OrderId) => {
  return Order.findById(OrderId);
};

const updateDetails = async (OrderId, updateBody) => {
  return Order.findByIdAndUpdate(OrderId, { $set: updateBody });
};

const OrderId = async (body) => {
  return Order.findById(body)
}

module.exports = {
  createOrder,
  getOrderList,
  deleteOrder,
  updateDetails,
  getOrderById,
  OrderId
};
