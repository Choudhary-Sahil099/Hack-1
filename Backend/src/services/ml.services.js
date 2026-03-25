import axios from "axios";

const ML_BASE_URL = process.env.ML_API_URL || "http://127.0.0.1:8000";

export const getPredictionFromML = async (data) => {
  try {
    // ✅ Clean + validate input
    const cleanData = {
      state: data.state?.trim(),
      district: data.district?.trim(),
      commodity: data.commodity?.trim(),
    };

    if (!cleanData.state || !cleanData.district || !cleanData.commodity) {
      throw new Error("Missing required fields");
    }

    console.log("🚀 Sending to FastAPI:", cleanData);

    // ✅ API call
    const response = await axios.post(
      `${ML_BASE_URL}/predict`,
      cleanData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000, // ⏱️ prevent hanging
      }
    );

    console.log("📊 ML Response:", response.data);

    // 🔥 HANDLE ML "NO DATA" CASE (IMPORTANT FIX)
    if (response.data?.error) {
      throw new Error(response.data.error);
    }

    // ✅ Validate expected structure
    if (
      !response.data ||
      typeof response.data.best_mandi === "undefined" ||
      !Array.isArray(response.data.top_mandis)
    ) {
      throw new Error("Invalid ML response format");
    }

    return response.data;

  } catch (error) {
    console.error("❌ ML Service Error:", error.message);

    // 🚫 ML server not running
    if (error.code === "ECONNREFUSED") {
      throw new Error("ML service is not running");
    }

    // ⏱️ Timeout
    if (error.code === "ECONNABORTED") {
      throw new Error("ML service timeout");
    }

    // 🔁 FastAPI error response
    if (error.response) {
      const message =
        error.response.data?.detail ||
        error.response.data?.message ||
        error.response.data?.error ||
        "ML service error";

      throw new Error(message);
    }

    // ⚠️ Custom thrown error (like "No data found")
    if (error.message) {
      throw new Error(error.message);
    }

    // ❓ Fallback
    throw new Error("Prediction failed");
  }
};