import express from "express";
const router = express();
import userRouter from "./user";

router.use("/user", userRouter);

export default router;
