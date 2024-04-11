import mongoose from "mongoose";
import { config } from "./config";

const connectDb = () => {
    try {
        const uri = config.uri;
        mongoose.connect(uri as string);

        mongoose.connection.on("connected", () => {
            console.log("database connected");
        });

        mongoose.connection.on("error", (err) => {
            console.log(err);
        });
    } catch (error) {
        console.log("database connection error", error);
        process.exit(1);
    }
};

export default connectDb;
