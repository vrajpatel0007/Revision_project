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

    const product = await cart_service.cart_list();
    console.log("🚀 ~ addtocart ~ product:", product);
    if (body.product_name == product.product_name) {
      const add = product.qty + 1;
      const price = product.price + body.price;
      const addqty = await cart_service.cartupdate(product._id, add, price);
      res.status(200).json({ message: "qty add" });
    }
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

// delete
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

const cart_update = async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    console.log("🚀 ~ constcart_update= ~ cart_id:", cart_id);
    const cartExists = await cart_service.cart_id(cart_id);
    if (!cartExists) {
      return res.status(404).json({ message: "Cart Not Exists" });
    }
    const body = {
      price: cartExists.price,
    };
     
    const qty = req.body.qty
    console.log("🚀 ~ constcart_update= ~ qty:", qty)
    console.log("🚀 ~ constcart_update= ~ body.price:", body.price);
    const cartDetails = await cart_service.cart_update(cart_id,req.body,body.price*qty);

    return res.status(200).json({
      success: true,
      message: "cart details update successfully!",
      deta: cartDetails,
    });
  } catch (error) {
    console.log("🚀 ~ constcart_update= ~ error.message:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addtocart,
  list,
  Cart_delete,
  cart_update,
};
