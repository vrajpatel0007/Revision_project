const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  OTP: {
    type: String,
  }
},{
  timestamps: true,
});

const otp = model("otp", otpSchema);

module.exports = otp;
