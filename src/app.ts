import { Request, Response } from "express";
import upload from "./config/multer";

const express = require("express");
const app = express();

app.use(upload);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "done",
        data: {},
    });
});

export default app;
