const cart_service = require("../services/cart.service");

// Add_to_Cart
const addtocart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await cart_service.idproduct(productId);
    console.log("🚀 ~ addtocart ~ productExists:", productExists);

    if (!productExists) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const body = {
      product_name: productExists.product_name,
      product_imag: productExists.product_imag,
      price: productExists.price,
    };

    const addcart = await cart_service.addProduct(body);

    return res
      .status(200)
      .json({ message: "Add To Cart Successfully", data: addcart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Cart_List
const list = async (req, res) => {
  try {
    const product = await cart_service.cart_list();
    if (!product) {
      return res
        .status(404)
        .json({ message: "You Not Added A Product In Cart" });
    }
    return res.status(200).json({ message: "All Cart Items", data: product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Cart_delete
const Cart_delete = async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    const cartExists = await cart_service.cart_id(cart_id);
    if (!cartExists) {
      return res.status(404).json({ message: "Cart Not Exists" });
    }
    const cart = await cart_service.cart_delete(cart_id);
    return res.status(200).json({ message: "Cart Delete Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// cart_update
const cart_update = async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    console.log("🚀 ~ constcart_update= ~ cart_id:", cart_id);
    const cartExists = await cart_service.cart_id(cart_id);
    if (!cartExists) {
      return res.status(404).json({ message: "Cart Not Exists" });
    }
    console.log(
      "🚀 ~ constcart_update= ~ cartExists.product_name:",
      cartExists.product_name
    );
    const cart = await cart_service.product(cartExists.product_name);

    const price = parseFloat(cart.price);
    console.log("🚀 ~ constcart_update= ~ price:", price);
    const qty = parseFloat(req.body.qty);
    console.log("🚀 ~ constcart_update= ~ qty:", qty);

    if (isNaN(price) || isNaN(qty)) {
      throw new Error("Price or quantity is not a valid number");
    }

    const tottel = price * qty;
    console.log("🚀 ~ constcart_update= ~ tottel:", tottel);

    const reqbody = {
      price: tottel,
    };

    const cartDetails = await cart_service.cart_update(
      cart_id,
      req.body,
      reqbody.price
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Cart details updated successfully!",
        details: cartDetails,
        Total: tottel,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addtocart,
  list,
  Cart_delete,
  cart_update,
};
