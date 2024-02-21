const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (body) => {
  const bpass = await bcrypt.hash(body.password, 10);
  return User.create({
    name: body.name,
    email: body.email,
    password: bpass,
    image: body.image,
  });
};
const userlist = async () => {
  return await User.find({});
};
const findById = (userid) => {
  return User.findById(userid);
};
const userbyid = (body) => {
  return User.findById(body);
};
const deletedUser = (userId) => {
  return User.findByIdAndDelete(userId);
};
const findemail = (email) => {
  return User.findOne({ email });
};
const updateuser = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody },{new:true});
};

const changepass =(userId, password) => {
  return User.findByIdAndUpdate(userId, { password},{new:true});
};


module.exports = {
  register,
  userlist,
  findById,
  deletedUser,
  userbyid,
  findemail,
  updateuser,
  changepass
};
