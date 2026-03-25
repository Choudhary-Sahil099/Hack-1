import express from "express";
import User from "../model/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔥 GET USER PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("name phone state district isVerified")
      .lean(); // ⚡ faster response

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user, // 👈 wrapped (better for frontend)
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;