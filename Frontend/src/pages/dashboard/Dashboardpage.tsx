import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/layouts/StatsCard";
import { motion } from "framer-motion";
import { IndianRupee, MapPin, TrendingUp, Wheat } from "lucide-react";
import PriceChart from "../../components/dashboard/PriceChart";
import WeatherCard from "../../components/dashboard/WeatherCard";
import { Commodities } from "../../data/commodities";

interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
}

const DashboardPage = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const [category, setCategory] = useState("fruits");
  const [crop, setCrop] = useState("banana");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const userState = "Himachal Pradesh";
  const userDistrict = "Kangra";

  // 🌦️ Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${userDistrict}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();
        if (!res.ok) return;

        setWeather({
          temp: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].main,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [API_KEY]);

  useEffect(() => {
    const fetchPrediction = async () => {
      if (!crop) return;

      try {
        setLoadingPrediction(true);

        const res = await fetch("http://localhost:5000/api/mandi/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: userState,
            district: userDistrict,
            commodity: crop,
          }),
        });

        const data = await res.json();
        setPrediction(data);
      } catch (err) {
        console.error("Prediction error:", err);
      } finally {
        setLoadingPrediction(false);
      }
    };

    fetchPrediction();
  }, [crop]);

  // 📊 Chart Data
  const chartData =
    prediction?.top_mandis?.map((m: any) => ({
      market: m.name,
      price: m.price,
    })) || [];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">🌾 Smart Mandi Dashboard</h2>

      {/* 🔥 Crop Selector */}
      <div className="flex gap-4 mt-4 mb-6">

        {/* Category */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCrop(""); // reset crop
          }}
          className="p-2 border rounded-md"
        >
          <option value="crops">Crops</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
        </select>

        {/* Crop */}
        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Item</option>
          {Commodities[
            category as keyof typeof Commodities
          ].map((item: string, i: number) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatsCard
          title="Best Price"
          value={
            loadingPrediction
              ? "..."
              : `₹${prediction?.expected_price || 0}`
          }
          icon={<IndianRupee />}
        />

        <StatsCard
          title="Best Mandi"
          value={
            loadingPrediction
              ? "..."
              : prediction?.best_mandi || "-"
          }
          icon={<MapPin />}
        />

        <StatsCard
          title="Trend"
          value={loadingPrediction ? "..." : "Live"}
          icon={<TrendingUp />}
        />

        <StatsCard title="Crop" value={crop || "-"} icon={<Wheat />} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 📈 Chart */}
        <div className="lg:col-span-2">
          {chartData.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow">
              Loading chart...
            </div>
          ) : (
            <PriceChart data={chartData} />
          )}
        </div>

        <div className="flex flex-col gap-4">

          {/* 🌦️ Weather */}
          {weather && (
            <WeatherCard {...weather} />
          )}

          {/* 🧠 Recommendation */}
          <div className="bg-indigo-100 p-5 rounded-xl">
            <h3 className="font-semibold text-lg">🧠 Recommendation</h3>

            {loadingPrediction ? (
              <p>Generating...</p>
            ) : (
              <>
                <p>
                  Sell <b>{crop}</b> at{" "}
                  <b>{prediction?.best_mandi}</b>
                </p>
                <p>₹{prediction?.expected_price}</p>
              </>
            )}
          </div>
        </div>
      </div>
      {!loadingPrediction && prediction?.top_mandis && (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h3 className="font-semibold text-lg mb-3">
            📍 Other Mandis in Region
          </h3>

          {prediction.top_mandis.map((m: any, i: number) => (
            <div
              key={i}
              className={`flex justify-between p-3 rounded-lg ${
                m.name === prediction.best_mandi
                  ? "bg-green-100 font-bold"
                  : "bg-gray-50"
              }`}
            >
              <span>{m.name}</span>
              <span>₹{m.price}</span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;