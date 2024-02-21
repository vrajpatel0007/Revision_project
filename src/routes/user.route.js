const express = require("express");
const user_controller = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const { autheticate , restrict } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  user_controller.register
);
router.get("/list", autheticate, user_controller.userlist);
router.get("/userByid/:userId", autheticate, user_controller.Iduser);
router.put("/Changepassword/:userId",user_controller.forgetpassword);
router.put(
  "/userupdate/:userId",
  autheticate,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  user_controller.userupdate
);
router.delete("/usersdelete/:userId", autheticate, user_controller.usersdelete);
router.post("/login", user_controller.login);
router.get("/profile", autheticate,restrict(['admin']), user_controller.profile);

module.exports = router;
