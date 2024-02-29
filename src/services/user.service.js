const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const OTP = require("../models/otp.model");

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

const verify_otp = async (otp) => {
  return await OTP.findOne({OTP:otp});
};

const otp_delete = async (otp_id) => {
  return OTP.findByIdAndDelete(otp_id)
}
const otp_list = async () => {
  return OTP.find({})
}

module.exports = {
  register,
  userlist,
  findById,
  deletedUser,
  userbyid,
  findemail,
  updateuser,
  changepass,
  verify_otp,
  otp_delete,
  otp_list
};
