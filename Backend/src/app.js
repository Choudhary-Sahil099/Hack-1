import express from "express";
import cors from "cors";
import schemesRoutes from "./routes/SchemesRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/schemes", schemesRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;