const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return jwt.sign(data, process.env.SECRET_key);
};

// const autheticate = (res, req, next) => {
//   // const token = req.cookie(token)
//   const token = req.cookies.token;
//   console.log("🚀 ~ autheticate ~ token:", token);
//   if (!token) {
//     res.status(400).json({ message: "you are not login" });
//   }

//   let user = jwt.verify(token, process.env.SECRET_key);
//   console.log("🚀 ~ autheticate ~ user:", user);

//   req.user = user;
//   next();
// };


const autheticate = (req, res, next) => {
    console.log("🚀 ~ authenticate ~ req.cookies:", req.cookies.token);

    // Access token from req.cookies.token
    const token = req.cookies.token;
    console.log("🚀 ~ authenticate ~ token:", token);

    if (!token) {
        return res.status(400).json({ message: "You are not logged in" });
    }

    try {
        let user = jwt.verify(token, process.env.SECRET_key);
        console.log("🚀 ~ authenticate ~ user:", user);
        
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


module.exports = {
  createToken,
  autheticate,
};
