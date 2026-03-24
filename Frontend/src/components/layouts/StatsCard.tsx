import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-5 rounded-xl shadow flex items-center justify-between border border-transparent hover:border-indigo-200 cursor-pointer"
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>

        {trend !== undefined && (
          <p
            className={`text-xs mt-1 ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </p>
        )}
      </div>

      <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
        {icon}
      </div>
    </motion.div>
  );
};

export default StatsCard;