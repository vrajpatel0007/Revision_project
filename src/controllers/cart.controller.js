const cart_service = require("../services/cart.service");

const addtocart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await cart_service.idproduct(productId);
    console.log("🚀 ~ addtocart ~ productExists:", productExists);
    if (!productExists) {
      return res.status(404).json({ message: "product not found" });
    }
    const body = {
      product_name: productExists.product_name,
      product_imag: productExists.product_imag,
      price: productExists.price,
    };
    console.log("🚀 ~ addtocart ~ body:", body);

    const addcart = await cart_service.addProduct(body);
    console.log("🚀 ~ addtocart ~ addcart:", addcart);

    return res
      .status(200)
      .json({ message: "Add cart successfully", data: addcart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addtocart,
};
