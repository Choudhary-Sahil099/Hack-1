import express from "express";
import cors from "cors";
import schemesRoutes from "./routes/SchemesRoutes.js";
import mandiRoutes from "./routes/mandi.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemesRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/user", userRoutes);

// ✅ Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ❌ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 🚨 Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;