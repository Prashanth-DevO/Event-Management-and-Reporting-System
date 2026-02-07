import { UserRegister } from '../models/user.model.js';
import bcrypt from "bcrypt";
import generateToken from "../util/jwt.js"

const registerUser = async (req, res) => {
    try {
        const { registerRole, firstName, lastName,  email, password } = req.body;

        const existingUser = await UserRegister.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User already exists with this email"});
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
        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(newUser._id)
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        
        const exists = await UserRegister.findOne({ email });
        if(!exists){
            return res.status(400).json({message: "Invalid email or password"});
        };

        const match = await bcrypt.compare(password , exists.password );

        if(!match){
            return res.status(400).json({message: "Invalid email or password"});
        }

        res.status(200).json({
            message: "Login successful",
            token: generateToken(match._id)
        });
    }
    catch (error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export { registerUser, loginUser };