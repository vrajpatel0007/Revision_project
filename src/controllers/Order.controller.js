const OrderService = require("../services/Order.service");
const { send_mail } = require("../services/mail.service");

// create_Order
const createOrder = async (req, res) => {
  try {
    const reqBody = req.body;

    const Order = await OrderService.createOrder(reqBody);
    if (!Order) {
      throw new Error("Something went wrong, please try again or later!");
    }
    if (Order) {
      const email = send_mail(
        reqBody.c_email,
        "Order",
        "you are Order successfully "
      );
    }

    res.status(200).json({
      message: "Order create successfully!",
      data: { Order },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get Order list */
const getOrderList = async (req, res) => {
  try {
    const getList = await OrderService.getOrderList();

    res.status(200).json({
      message: "Get Order list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//   delete Order
const deleteOrder = async (req, res) => {
  try {
    const OrderId = req.params.OrderId;
    const OrderExists = await OrderService.deleteOrder(OrderId);
    if (!OrderExists) {
      throw new Error("Order not found!");
    }

    const deleteOrder = await OrderService.deleteOrder(OrderId);
    if (deleteOrder) {
      const email = send_mail(
        OrderExists.c_email,
        "delete Order",
        "your Order successfully delete"
      );
    }

    res.status(200).json({ message: "Order delete successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  update Order
const updateDetails = async (req, res) => {
  const reqBody = req.body;
  try {
    const OrderId = req.params.OrderId;
    const OrderExists = await OrderService.getOrderById(OrderId);
    if (!OrderExists) {
      throw new Error("Order not found!");
    }

    const updateDetails = await OrderService.updateDetails(OrderId, req.body);
    if (updateDetails) {
      const email = send_mail(
        reqBody.c_email,
        "update Order",
        "your Order successfully update"
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Order details update successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Id_byOrder
const IdbyOrder = async (req, res) => {
  try {
    const OrderId = req.params.OrderId;
    const orderExists = await OrderService.OrderId(OrderId);
    if (!orderExists) {
      return res.status(404).json({ message: "Order does not exist" });
    }

    const order = await OrderService.OrderId(OrderId);
    await order.populate("product")
    return res
      .status(200)
      .json({ message: "Order successfully find!", user: order });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderList,
  deleteOrder,
  updateDetails,
  IdbyOrder,
};
