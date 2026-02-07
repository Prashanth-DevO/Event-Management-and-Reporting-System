import jwt from "jsonwebtoken";

const generateToken = (data)=> {
      return jwt.sign({id: data} , process.env.SECRETE);
}

export default generateToken;