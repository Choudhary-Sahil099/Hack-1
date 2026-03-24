import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/layouts/StatsCard";
import { motion } from "framer-motion";
import { IndianRupee, MapPin, TrendingUp, Wheat  } from "lucide-react";
import PriceChart from "../../components/dashboard/PriceChart";
const DashboardPage = () => {
  const chartData = [
  { market: "Mandi", price: 2200 },
  { market: "Kangra", price: 2350 },
  { market: "Shimla", price: 2100 },
  { market: "Solan", price: 2250 },
];
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
       <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4"
>
  <StatsCard
    title="Best Price"
    value="₹2350"
    icon={<IndianRupee />}
    trend={5}
  />

  <StatsCard
    title="Best Mandi"
    value="Kangra"
    icon={<MapPin />}
  />

  <StatsCard
    title="Price Trend(5D)"
    value="Rising"
    icon={<TrendingUp />}
    trend={3}
  />

  <StatsCard
    title="Crop"
    value="Wheat"
    icon={<Wheat />}
  />
</motion.div>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
  <div className="lg:col-span-2">
    <PriceChart data={chartData} />
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="font-semibold text-lg mb-2">
      💡 Recommendation
    </h3>
    <p className="text-gray-600">
      Sell at <span className="font-semibold">Kangra Mandi</span> today for maximum profit (+₹150 more).
    </p>
  </div>

</div>
    </DashboardLayout>
  );
};

export default DashboardPage;