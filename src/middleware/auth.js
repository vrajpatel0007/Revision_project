const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return jwt.sign(data, process.env.SECRET_key);
};



const autheticate = (req, res, next) => {

  
  const token = req.cookies['token'];

  if (!token) {
    return res.status(400).json({ message: "You are not login" });
  }

  try {
    let user = jwt.verify(token, process.env.SECRET_key);

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};



const restrict=(...data)=>{

  return (req,res,next)=>{
  
      let user = req.user
      if(data[0].includes(user.rol))
      {
          req.user=user
          next()
      }
     
      return res.status(400).json({message:"you are not allow"})
  }
  
  }

module.exports = {
  createToken,
  autheticate,
  restrict
};
