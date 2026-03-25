import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { statesData } from "../../data/indiaData";
import { Commodities } from "../../data/commodities";

type StateData = {
  state: string;
  districts: string[];
};

const MarketPage = () => {
  const [step, setStep] = useState(1);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [crop, setCrop] = useState("");

  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const selectedStateData = statesData.states.find(
    (s: StateData) => s.state === state,
  );

  const fetchPrediction = async () => {
    if (!crop) return;

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/mandi/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state, district, commodity: crop }),
    });

    const data = await res.json();
    setPrediction(data);
    setLoading(false);
  };

  // 🔥 Get commodities dynamically
  const getCommodities = () => {
    if (!category) return [];

    return (
      Commodities[category.toLowerCase() as keyof typeof Commodities] || []
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 p-6">
        {/* 🔢 Progress */}
        <div className="mb-4 text-sm text-gray-600">Step {step} of 4</div>

        <div className="w-full max-w-xl">
          {/* 🔵 STEP 1 */}
          {step === 1 && (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h2 className="text-xl font-bold mb-4">🌍 Select State</h2>

              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => {
                  setState(e.target.value);
                  setStep(2);
                }}
              >
                <option value="">Choose State</option>
                {statesData.states.map((s: StateData, i: number) => (
                  <option key={i} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 🟢 STEP 2 */}
          {step === 2 && (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h2 className="text-xl font-bold mb-4">📍 Select District</h2>

              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setStep(3);
                }}
              >
                <option value="">Choose District</option>
                {selectedStateData?.districts.map((d: string, i: number) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setStep(1)}
                className="mt-4 text-sm text-blue-600"
              >
                ← Back
              </button>
            </div>
          )}

          {/* 🟡 STEP 3 */}
          {step === 3 && (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h2 className="text-xl font-bold mb-4">🥦 Select Category</h2>

              <div className="grid grid-cols-3 gap-4">
                {["Fruits", "Vegetables", "Crops"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setStep(4);
                    }}
                    className="p-4 bg-green-100 rounded-xl hover:bg-green-200 font-medium"
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-4 text-sm text-blue-600"
              >
                ← Back
              </button>
            </div>
          )}

          {/* 🟣 STEP 4 */}
          {step === 4 && (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h2 className="text-xl font-bold mb-4">
                🌾 Select Commodity ({category})
              </h2>

              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setCrop(e.target.value)}
              >
                <option value="">Choose Commodity</option>

                {getCommodities().map((item: string, i: number) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchPrediction}
                disabled={!crop || loading}
                className={`mt-4 w-full py-3 rounded-lg text-white ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Predicting..." : "Find Best Mandi"}
              </button>

              <button
                onClick={() => setStep(3)}
                className="mt-4 text-sm text-blue-600"
              >
                ← Back
              </button>
            </div>
          )}

          {/* 🏆 RESULT */}
         {/* 🏆 RESULT */}
{loading && (
  <div className="mt-6 text-center text-gray-600">
    🔄 Fetching best mandi...
  </div>
)}

{!loading && prediction && prediction.best_mandi && (
  <>
    {/* 🌟 Best Mandi */}
    <div className="mt-6 bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-xl font-bold">🏆 Best Mandi</h2>
      <p className="text-lg">{prediction.best_mandi}</p>
      <p className="text-3xl font-bold">
        ₹{prediction.expected_price || 0}
      </p>
    </div>

    {/* 📊 Other Mandis */}
    {prediction.top_mandis?.length > 0 && (
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">
          📍 Other Mandis in Your Region
        </h3>

        <div className="space-y-3">
          {prediction.top_mandis.map((m: any, i: number) => (
            <div
              key={i}
              className={`flex justify-between items-center p-3 rounded-lg ${
                m.name === prediction.best_mandi
                  ? "bg-green-100 font-bold border border-green-400"
                  : "bg-gray-50"
              }`}
            >
              <span>
                {i === 0
                  ? "🥇"
                  : i === 1
                  ? "🥈"
                  : i === 2
                  ? "🥉"
                  : "📍"}{" "}
                {m.name}
              </span>

              <span className="font-semibold text-green-700">
                ₹{m.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
)}

{/* ❌ NO DATA STATE */}
{!loading && prediction && !prediction.best_mandi && (
  <div className="mt-6 bg-red-100 p-6 rounded-xl text-center">
    ❌ No mandi data available for this selection  
    <br />
    <span className="text-sm text-gray-600">
      Try selecting a different crop or district
    </span>
  </div>
)}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketPage;
