import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const priceTrendData = [
  { month: "21March", price: 1800 },
  { month: "22March", price: 2000 },
  { month: "23Mar", price: 2200 },
  { month: "24Apr", price: 2100 },
];

const mandiData = [
  { name: "Kangra", price: 2200 },
  { name: "Dharamshala", price: 2100 },
  { name: "Nagrota", price: 2050 },
  { name: "Baijnath", price: 2000 },
];

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-gray-100">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Analytics Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-2xl shadow-md">
            <p className="text-gray-500">Best Mandi</p>
            <h2 className="text-xl font-bold text-green-600">Kangra</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md">
            <p className="text-gray-500">Current Price</p>
            <h2 className="text-xl font-bold text-green-600">₹2200</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md">
            <p className="text-gray-500">Trend</p>
            <h2 className="text-xl font-bold text-green-600">📈 Rising</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-green-700">
              Price Trend
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={priceTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              Top Mandis Comparison
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mandiData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔥 Insights Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-600">
            AI Insights 🤖
          </h3>

          <ul className="space-y-2 text-gray-700">
            <li>✅ Prices are increasing this month</li>
            <li>📍 Best mandi: Kangra</li>
            <li>💡 Suggestion: Sell after 2-3 days for higher profit</li>
          </ul>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;