import jwt from "jsonwebtoken";

const generateToken = (data)=> {
      return jwt.sign({id: data} , process.env.SECRETE , {expiresIn: "1d"});
}

export default generateToken;