import express from "express";
import {
  register,
  login,
  verifyOTP,
  sendOTP,
  resetPasswordWithOTP
} from "../controller/auth.controller.js";

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

// 🔁 Password Reset (OTP based)
router.post("/send-otp", sendOTP);
router.post("/reset-password", resetPasswordWithOTP);

export default router;