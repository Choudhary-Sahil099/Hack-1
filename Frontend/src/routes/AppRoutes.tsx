import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import DashboardPage from "../pages/dashboard/Dashboardpage";
import ProtectedRoute from "./ProtectedRoutes";
import MarketPage from "../pages/Market/Marketpage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route 
      path="/market"
      element={
        <ProtectedRoute>
          <MarketPage />
        </ProtectedRoute>
      }/>
      <Route 
      path="/scheme"
      element={
        <ProtectedRoute>
          <MarketPage />
        </ProtectedRoute>
      }/>
    </Routes>
  );
};

export default AppRoutes;