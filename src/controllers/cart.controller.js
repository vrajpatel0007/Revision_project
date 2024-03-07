const cart_service = require("../services/cart.service");

// Add_to_Cart
const addtocart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await cart_service.idproduct(productId);

    if (!productExists) {
      return res.status(404).json({ message: "product not found" });
    }
    const body = {
      product_name: productExists.product_name,
      product_imag: productExists.product_imag,
      price: productExists.price,
    };

    const addcart = await cart_service.addProduct(body);

    return res
      .status(200)
      .json({ message: "Add to cart successfully", data: addcart });
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
        .json({ message: "you not added a product in cart" });
    }
    return res.status(200).json({ message: "All cart items", data: product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addtocart,
  list,
};
