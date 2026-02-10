import express from "express";
import loginRouter from "./routes/login.route.js";
import eventRouter from "./routes/event.route.js";
import emailRouter from "./routes/email.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());


// This have to learn why....
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}));


app.use("/api/auth",loginRouter);
app.use("/api/events", eventRouter);
app.use("/api/email",emailRouter);

export default app;