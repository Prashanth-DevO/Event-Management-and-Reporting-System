import { UserRegister } from '../models/user.model.js';
import { registrationEmail } from '../services/email.service.js';
import bcrypt from "bcrypt";
import generateToken from "../util/jwt.js"

const registerUser = async (req, res) => {
    try {
        const { registerRole, firstName, lastName,  email, password } = req.body;

        const existingUser = await UserRegister.findOne({ email });
        if(existingUser){
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        };
        
        const hash = await bcrypt.hash(password, 12);

        const newUser = new UserRegister({
            registerRole,
            firstName,
            lastName,
            email,
            password :hash
        })
        await newUser.save();
        const token= generateToken(newUser._id);
        res.cookie("token", token,{
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        })
        await registrationEmail(newUser);
        res.status(201).json({
            message: "User registered successfully"
        });
    }
    catch (error) {
        console.error("registerUser error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        
        const exists = await UserRegister.findOne({ email });
        if(!exists){
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        };

        const match = await bcrypt.compare(password , exists.password );

        if(!match){
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const token= generateToken(exists._id);
        res.cookie("token", token , {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: "Login successful"
        });
    }
    catch (error){
        console.error("loginUser error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const logoutUser = async (req,res) => {
    try {
        res.cookie("token", "" , {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            expires: new Date(0)
        })
        res.status(200).json({
            message: "Logout successful"
        })
    }
    catch (error){
        console.error("logoutUser error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export { registerUser, loginUser , logoutUser };