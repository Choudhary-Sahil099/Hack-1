import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import DashboardPage from "../pages/dashboard/Dashboardpage";
import ProtectedRoute from "./ProtectedRoutes";
import MarketPage from "../pages/Market/Marketpage";
import SchemesPage from "../pages/GovtSchemes/GovtSchemes";
import AnalyticsPage from "../pages/Analytics/Analyticspage";
import SettingsPage from "../pages/settingPage/SettingPage";

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
      path="/schemes"
      element={
        <ProtectedRoute>
          <SchemesPage />
        </ProtectedRoute>
      }/>
      <Route 
      path="/analytics"
      element={
        <ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>
      }/>
      <Route 
      path="/settings"
      element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      }/>
    </Routes>
  );
};

export default AppRoutes;