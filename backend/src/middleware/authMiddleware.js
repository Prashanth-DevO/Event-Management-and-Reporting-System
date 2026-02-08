import jwt from "jsonwebtoken";
import { UserRegister } from "../models/user.model.js";

const checkUser = async (req,res, next) => {
     try{
          const token = req.cookies.token;
          if(!token){
               return res.status(401).json({ message: "Not authorized, token failed" });
          }
          const decode = jwt.verify(token , process.env.SECRETE);
          const exists = await UserRegister.findById(decode.id).select("-password");
          if(!exists){
               return res.status(401).json({ message: "Not authorized, token failed" });
          }
          else{
               req.user=exists;
               next();
          }
     }
     catch(error){
          return res.status(401).json({ message: "Not authorized, token failed" });
     }
}

export { checkUser };