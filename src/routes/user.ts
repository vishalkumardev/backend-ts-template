import express from "express";
import { addUser } from "../module/user/user.controller";
const route = express.Router();

route.post("/", addUser);

export default route;
