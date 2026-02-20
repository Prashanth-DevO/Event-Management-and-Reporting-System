import express from "express";
import loginRouter from "./routes/login.route.js";
import eventRouter from "./routes/event.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());


// This have to learn why....
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.use("/api/auth",loginRouter);
app.use("/api/events", eventRouter);

export default app;