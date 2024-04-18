const passport = require("passport");


const autheticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, userData) => {
    console.log("🚀 ~ passport.authenticate ~ userData:", userData)
    if (err) {
      return res.status(400).json({ msg: "error authenticating" });
    }
    if (userData == false) {
      return res.status(400).json({ msg: "authenticate your self" });
    }
    req.user = userData;
    next();
  })(req, res, next);
};

const restrict = (...data) => {
  return (req, res, next) => {
    let user = req.user;
    console.log("🚀 ~ return ~ user:", user);
    if (data[0].includes(user.rol)) {
      req.user = user;
      next();
    }
    console.log(
      "🚀 ~ return ~ data[0].includes(user.rol):",
      data[0].includes(user.rol)
    );
    console.log("🚀 ~ return ~ data[0]:", data[0]);
    return res.status(400).json({ message: "you are not allow" });
  };
};

module.exports = {
  autheticate,
  restrict,
};
