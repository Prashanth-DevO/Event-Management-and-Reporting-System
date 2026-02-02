import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionDetails = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected !!! 
            Host: ${connectionDetails.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB: ",error);
        process.exit(1);
    }
}

export default connectDB;