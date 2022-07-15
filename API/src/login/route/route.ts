import express from "express";
import { loginHandler } from "../handlers/loginUser";
const router = express.Router();

router.post("/", loginHandler);

export default router;
