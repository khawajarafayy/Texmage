import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/texmage`);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(0);
        
    }
};

export default connectDB;