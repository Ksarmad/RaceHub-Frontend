import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RegisterPage from "../pages/public/RegisterPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

import ProtectedRoute from "./ProtectedRoute";

import TournamentLandingPage from "../pages/public/TournamentLandingPage";

import LeaderboardAdminPage from "../pages/public/LeaderboardAdminPage";




function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={<TournamentLandingPage />}
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

        <Route
          path="/admin/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardAdminPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;