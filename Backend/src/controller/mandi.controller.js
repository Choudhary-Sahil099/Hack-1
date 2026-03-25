import { getPredictionFromML } from "../services/ml.services.js";

export const getMandiPrediction = async (req, res) => {
try {
  const { state, district, commodity } = req.body;

  console.log("📥 Incoming:", { state, district, commodity });

  if (!state || !district || !commodity) {
    return res.status(400).json({
      error: "State, district, and commodity are required",
    });
  }

  const result = await getPredictionFromML({
    state,
    district,
    commodity,
  });

  console.log("✅ ML Result:", result);
  res.status(200).json(result);

} catch (error) {
  console.error("❌ Prediction Error FULL:", error);
  if (error.code === "ECONNREFUSED") {
    return res.status(500).json({
      error: "ML service is not running",
    });
  }

  if (error.code === "ECONNABORTED") {
    return res.status(500).json({
      error: "ML service timeout",
    });
  }

  if (error.response) {
    return res.status(500).json({
      error:
        error.response.data?.detail ||
        error.response.data?.message ||
        "ML API error",
    });
  }

  return res.status(500).json({
    error: error.message || "Prediction failed",
  });
}
};