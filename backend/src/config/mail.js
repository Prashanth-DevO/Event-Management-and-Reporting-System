import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path:"../.env"
})


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // for ssl (465)   , it is false for tls (587)
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  },
});

export default transporter;

