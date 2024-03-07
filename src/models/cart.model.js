const { Schema, model, mongoose } = require("mongoose");

const cartSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const cart = model("cart", cartSchema);

module.exports = cart;
