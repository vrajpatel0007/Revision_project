const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  image: {
    type: String,
  },
  rol: {
    type: String,
    default: "user",
  },
},{
  timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;
