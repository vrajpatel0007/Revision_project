const express = require("express");
const user_controller = require('../controllers/user.controller')
const upload = require('../middleware/multer');
const router = express.Router();

router.post("/register",upload.fields([{
  name:"image",
  maxCount : 1
}]), user_controller.register);
router.get("/list", user_controller.userlist);
router.get("/userByid/:userId", user_controller.Iduser);
router.put("/userupdate/:userId",upload.fields([{
  name:"image",
  maxCount : 1
}]), user_controller.userupdate);
router.delete("/usersdelete/:userId", user_controller.usersdelete);
router.post("/login", user_controller.login);

module.exports = router;
