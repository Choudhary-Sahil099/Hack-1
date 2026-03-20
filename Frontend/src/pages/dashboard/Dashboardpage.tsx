import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/layouts/StatsCard";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
const DashboardPage = () => {
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4 "
        >
          <StatsCard
            title="Total Interviews"
            value={24}
            icon={<Video />
              
            }
          />
        </motion.div>
      
    </DashboardLayout>
  );
};

export default DashboardPage;