const Userservice = require("../services/user.service");
const fs = require("fs")
const bcrypt = require("bcrypt");

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
      image: "public/temp/"+req.files.image[0].filename
    };  
    const user = await Userservice.register(body);
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userlist = async (req, res) => {
  const reqBody = req.body;
  try {
    const user = await Userservice.userlist(reqBody);
    res.status(201).json({ message: "User list", data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
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
  
  return res.status(200).json({ message: "User login successful" });
};

const userupdate = async (req, res) => {
  try {
    const userid = req.params.userId;
    const userExists = await Userservice.findById(userid);
    console.log("🚀 ~ userupdate ~ userExists:", userExists)
    if (!userExists) {
      res.json({ message: "user not found!" });
    }
    const parth =userExists.image 
    console.log("🚀 ~ userupdate ~ parth:", parth)
    fs.unlink(parth, err=>{
      if(err){
        console.log(`An error occurred ${err.message}`);
      }
      else{
        console.log("Deleted image");
      }
    })
    
    const body ={
      name: req.body.name,
      email: req.body.email,
      image: "public/temp/"+req.files.image[0].filename
    }
    const updateuser = await Userservice.updateuser(userid,body);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updateuser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
    console.log("🚀 ~ userupdate ~ req.body:", req.body)
};

module.exports = {
  register,
  userlist,
  usersdelete,
  login,
  Iduser,
  userupdate,
};
