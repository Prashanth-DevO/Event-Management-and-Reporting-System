import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // TLS
  auth: {
    user: "apikey", // literally the word "apikey"
    pass: process.env.EMAIL_API,
  },
});

export default transporter;

