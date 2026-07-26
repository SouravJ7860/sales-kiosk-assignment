import express from "express";
import { bookUnit } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", bookUnit);

export default router;