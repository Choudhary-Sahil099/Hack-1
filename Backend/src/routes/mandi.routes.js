import express from "express";
import { getMandiPrediction } from "../controller/mandi.controller.js";

const router = express.Router();

router.post("/predict", getMandiPrediction);

export default router;