const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return jwt.sign(data, process.env.SECRET_key);
};



const autheticate = (req, res, next) => {

  
  const token = req.cookies['token'];

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



const restrict=(...data)=>{

  return (req,res,next)=>{
  
      let user = req.user
      console.log(user,"restricttttt");
  
      console.log("🚀 ~ return ~ data[0].includes(user.rol):", data[0].includes(user.rol))
      if(data[0].includes(user.rol))
      {
          req.user=user
          next()
      }
     
      res.status(400).json({message:"you are not allow"})
  }
  
  }

module.exports = {
  createToken,
  autheticate,
  restrict
};
