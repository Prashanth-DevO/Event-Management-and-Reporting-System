import { Queue } from "bullmq";
import connection from "../config/redis.js";

const emailQueue = new Queue("email-queue", { connection });
const remainderQueue = new Queue("remainder", {connection});

export const addEmailJob = async (to, subject, html) => {
  await emailQueue.add("send-email", { to, subject, html });
};

export const addEventsReminder = async() => {
  await remainderQueue.add(
    "start_seacrh",
    {},
    {
      repeat: {
        every: 60*60*1000
      },
      removeOnComplete: true,
      removeOnFail: true,
    }
  );
};

addEventsReminder();
