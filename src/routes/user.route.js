const express = require("express");
const user_controller = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const { autheticate, restrict } = require("../middleware/auth");
const routes = express.Router();

routes.post(
  "/register",
  upload.fields([{ name: "image", maxCount: 1 }]),
  user_controller.register
);
routes.get("/list", autheticate, user_controller.userlist);
routes.get("/userByid/:userId", autheticate, user_controller.Iduser);
routes.put("/Changepassword/:userId", user_controller.forgetpassword);
routes.put(
  "/userupdate/:userId",
  autheticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  user_controller.userupdate
);
routes.delete("/usersdelete/:userId", autheticate, user_controller.usersdelete);
routes.post("/login", user_controller.login);
routes.get(
  "/profile",
  autheticate,
  restrict(["admin"]),
  user_controller.profile
);
routes.post("/OTP", user_controller.otp);
routes.post("/verifyotp", user_controller.verifyotp);

module.exports = routes;
