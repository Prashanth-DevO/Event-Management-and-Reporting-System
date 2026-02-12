import { Worker } from "bullmq";
import connection from "../config/redis.js";
import transporter from "../config/mail.js";

const worker = new Worker(
  "email-queue",
  async job => {
    const { to, subject, html } = job.data;
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
      });
      console.log(`Email sent for job ${job.id}: ${info.messageId}`);
      return info;
    } catch (err) {
      console.error(`Email send failed for job ${job.id}:`, err.message || err);
      throw err;
    }
  },
  { connection }
);