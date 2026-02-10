import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async(to,subject,html) => {
    const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html
  });
  console.log(process.env.SMTP_HOST);
  return info;
}

export default sendEmail;