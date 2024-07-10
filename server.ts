require("dotenv").config();
import app from "./src/app";
import { config } from "./src/config/config";
import { connectDb } from "./src/config/db";

const startServer = async () => {
    connectDb();

    const port = config.port;

    app.listen(port, () => {
        console.log(`server is listening on the port no ${port}`);
    });
};

startServer();
