const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
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
        }
    },
    {
        timestamps: true,
    }
);

const product = mongoose.model("prodct", productSchema);
module.exports = product;