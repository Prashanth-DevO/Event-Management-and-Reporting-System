import mongoose , { Schema } from "mongoose";

const userRegisterSchema = new Schema({
    registerRole:{
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

})


const UserRegister = mongoose.model("UserRegister", userRegisterSchema);

export default UserRegister; 