import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RegisterPage from "../pages/public/RegisterPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={<RegisterPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;