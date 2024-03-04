const mongoose = require("mongoose")

const orderschema = new mongoose.Schema(
    {
        c_name: {
            type: String,
            trim: true,
        },
        c_email: {
            type: String,
            trim: true,
        },
        totalAmount: {
            type: String,
            required: true,
        },
        orderDate: {
            type: String,
            default: null,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        }
    },
    {
      timestamps: true,
    }
)

const Order = mongoose.model("Order", orderschema);
module.exports = Order ;