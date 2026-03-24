import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/agriculture_schemes.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
router.get("/", (req, res) => {
  const { state, category } = req.query;

  const mapped = data.map((item) => ({
    name: item.scheme_name,
    state: item.level || "All",
    benefit: item.benefits,
    category: item.schemeCategory,
  }));

  const filtered = mapped.filter((scheme) => {
    return (
      (!state ||
        scheme.state.toLowerCase().includes(state.toLowerCase()) ||
        scheme.state === "All" || scheme.state === "Central" || scheme.state === "State" ) &&
      (!category ||
        scheme.category.toLowerCase().includes(category.toLowerCase()))
    );
  });

  res.json(filtered);
});

export default router;