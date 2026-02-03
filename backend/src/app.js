import express from "express";
import loginRouter from "./routes/login.route.js";
import eventRouter from "./routes/event.route.js";

const app = express();

app.use(express.json());


// This have to learn way....
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use("/api/auth",loginRouter);
app.use("/api/events", eventRouter);

export default app;