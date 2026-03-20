import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import DashboardPage from "../pages/dashboard/Dashboardpage";
import ProtectedRoute from "./ProtectedRoutes";

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
    </Routes>
  );
};

export default AppRoutes;