import { Queue } from "bullmq";
import connection from "../config/redis.js";

export const emailQueue = new Queue("email-queue", { connection });

export const addEmailJob = async (to, subject, html) => {
  await emailQueue.add("send-email", { to, subject, html });
};
