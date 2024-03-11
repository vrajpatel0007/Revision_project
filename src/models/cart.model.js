const { Schema, model, mongoose } = require("mongoose");

const cartSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    product_name: {
      type: String,
      trim: true,
    },
    product_imag: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    product_desc: {
      type: String,
      trim: true,
    },
    qty: {
      type: String,
      required: true,
      default: "1",
    },
  },
  {
    timestamps: true,
  }
);

const cart = model("cart", cartSchema);

module.exports = cart;
