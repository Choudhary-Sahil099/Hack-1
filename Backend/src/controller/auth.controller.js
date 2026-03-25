import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


// 📌 Generate OTP (helper)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, phone, password, state, district } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    // 🔐 Hash OTP (secure)
    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      state,
      district,
      otp: hashedOTP,
      otpExpiry: Date.now() + 5 * 60 * 1000, // 5 min
    });

    console.log("OTP:", otp); // 📲 replace with SMS later

    res.status(201).json({
      success: true,
      message: "OTP sent successfully",
      phone,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ================= VERIFY OTP =================
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.otp !== hashedOTP ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify OTP first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ================= SEND OTP (FORGOT PASSWORD) =================
export const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("OTP:", otp); // 📲 replace with SMS API

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ================= RESET PASSWORD USING OTP =================
export const resetPasswordWithOTP = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.otp !== hashedOTP ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    const user = await User.findById(userId).select(
      "name phone state district isVerified"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};