import app from "./app.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

const startServer = async() => {
    try{
        await connectDB();
        app.on("error", (error)=>{
            console.error("Error in server: ", error);
            process.exit(1);
        })
        app.listen(process.env.PORT||8000, ()=>{
            console.log('Server is running on port ', process.env.PORT||8000);
        })
    }
    catch(error){
        console.error("Error starting the server: ", error);
        process.exit(1);
    }
}

startServer();