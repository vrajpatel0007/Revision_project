const Userservice = require("../services/user.service");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { send_mail } = require("../services/mail.service");
const { send_otp } = require("../services/verify.service");
const { createToken } = require("../middleware/auth");

// register
const register = async (req, res) => {
  const reqBody = req.body;

  try {
    const userExists = await Userservice.findemail(reqBody.email);
    if (userExists) {
      res.json({ message: "Email already exists" });
    }

    const body = {
      name: reqBody.name,
      email: reqBody.email,
      password: reqBody.password,
      image: "public/temp/" + req.files.image[0].filename,
    };
    const user = await Userservice.register(body);
    if (user) {
      const email = await send_mail(
        body.email,
        "register",
        "you are registered successfully "
      );
    }
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// user_list
const userlist = async (req, res) => {
  try {
    const user = await Userservice.userlist();

    res.status(201).json({ message: "User list", data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// users_delete
const usersdelete = async (req, res) => {
  try {
    const userid = req.params.userId;
    const userExists = await Userservice.findById(userid);
    if (!userExists) {
      res.json({ message: "user not found!" });
    }
    const deletedUser = await Userservice.deletedUser(userid);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Id_user
const Iduser = async (req, res) => {
  try {
    const userid = req.params.userId;
    const userExists = await Userservice.findById(userid);
    if (!userExists) {
      res.json({ message: "user not found!" });
    }
    const user = await Userservice.userbyid(userid);
    res.status(200).json({ message: "user  successfully", data: user });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login_user
const login = async (req, res) => {
  const body = req.body;
  const password = req.body.password;
  const user = await Userservice.findemail(body.email);

  if (!user) {
    return res.status(500).json({ message: "Email not found" });
  }

  const bcryptpass = await bcrypt.compare(password, user.password);
  if (!bcryptpass) {
    return res.status(500).json({ message: "Incorrect password" });
  }
  const data = {
    _id: user._id,
    email: user.email,
    rol: user.rol,
  };
  if (data) {
    const email = await send_mail(
      data.email,
      "login",
      "you are login successful"
    );
  }
  let token = createToken(data);
  res.cookie("token", token);

  return res.status(200).json({ message: "User login successful" });
};

// user_update
const userupdate = async (req, res) => {
  try {
    const userid = req.params.userId;
    const userExists = await Userservice.findById(userid);
    if (!userExists) {
      res.json({ message: "user not found!" });
    }

    const body = {};

    if (req.body) {
      body.name = req.body.name;
      body.email = req.body.email;
    }

    if (req.files && req.files.image) {
      const parth = userExists.image;
      fs.unlink(parth, (err) => {
        if (err) {
          console.log(`An error occurred ${err.message}`);
        } else {
          console.log("Deleted image");
        }
      });
      body.image = "public/temp/" + req.files.image[0].filename;
    }

    const updateuser = await Userservice.updateuser(userid, body);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updateuser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// forget_password
const forgetpassword = async (req, res) => {
  try {
    const userid = req.params.userId;
    const userExists = await Userservice.findById(userid);
    if (!userExists) {
      res.json({ message: "user not found!" });
    }

    const newpassword = req.body.newpassword;
    const password = req.body.password;
    if (!password == newpassword) {
      res.json({ message: "passwords does not match?" });
    }
    const bpass = await bcrypt.hash(password, 10);
    const pass = {
      password: bpass,
    };
    const changepassword = await Userservice.changepass(userid, pass.password);

    res.json({ message: "successfull password changed" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// profile
const profile = (req, res) => {
  let user = req.user;
  res.status(200).json({ message: "profile success", user: user });
};

// OTP
const otp = async (req, res) => {
  const useremail = req.body.email;
  try {
    const user = await Userservice.findemail(useremail);
    if (!user.email) {
      res.status(404).json({ message: "This Email Doesn't Exist" });
    }

    const otp = await send_otp(user.email);
    const v_otp = await Userservice.otp_list();
    res.status(200).json({ message: "OTP Sed Success Fully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// verify_OTP
const verifyotp = async (req, res) => {
  const otp = req.body.otp;

  if (!otp || otp.trim() === "") {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const v_otp = await Userservice.verify_otp(otp);

    if (v_otp == null) {
      return res.status(404).json({ message: "This OTP is not valid" });
    }

    if (v_otp.OTP === otp) {
      await Userservice.otp_delete(v_otp.id);
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(404).json({ message: "This OTP is not valid" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  userlist,
  usersdelete,
  login,
  Iduser,
  userupdate,
  forgetpassword,
  profile,
  otp,
  verifyotp,
};