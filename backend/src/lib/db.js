import mongo from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongo.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully:", connection.connection.host);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}