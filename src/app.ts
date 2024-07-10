import upload from "./config/s3";
import router from "./routes/index";

const express = require("express");
const app = express();

app.use(upload);

app.use(express.json());

app.use("/api/v1", router);

export default app;
