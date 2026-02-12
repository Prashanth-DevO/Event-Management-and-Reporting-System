import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";


dotenv.config({
    path: "../.env"
});

// Start background workers (email worker) after loading env
import "./util/email.worker.js";

const startServer = async() => {
    try{
        await connectDB();
        app.on("error", (error)=>{
            console.error("Error in server: ", error);
            process.exit(1);
        })
        const server = app.listen(process.env.PORT||4000, ()=>{
            console.log('Server is running on port ', process.env.PORT||3000);
        })

    }
    catch(error){
        console.error("Error starting the server: ", error);
        process.exit(1);
    }
}

startServer();