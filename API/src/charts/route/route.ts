import express from "express";
import { charts } from "../handlers/charts";
const router = express.Router();

router.get("/", charts);

export default router;
