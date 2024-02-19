const jwt = require('jsonwebtoken')


const createToken = (data)=>{
    return jwt.sign(data,process.env.SECRET_key)
}


module.exports={createToken,}