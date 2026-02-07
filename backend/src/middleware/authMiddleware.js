import jwt from "jsonwebtoken";
import { UserRegister } from "../models/user.model.js";

const checkUser = async (req,res, next) => {
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith("webWall")){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token , process.env.SECRETE);
            const exists = await UserRegister.findById({ _id: decode.id}).select("-password");
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
     if(!token){
        return res.status(401).json({ message: "Not authorized, token failed" });
     }
}

export { checkUser };