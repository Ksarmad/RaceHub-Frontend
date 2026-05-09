import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import { authStorage } from "../../lib/auth";

import AppShell from "../../components/layout/AppShell";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/admin/login",
        formData
      );

      const token = response.data.data.accessToken;

      authStorage.setToken(token);

      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell active="admin">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-red-500/20
            bg-white/5
            p-8
            backdrop-blur-xl
            shadow-[0_0_50px_rgba(255,0,0,0.15)]
          "
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
              Admin Control
            </div>

            <h1 className="mt-4 text-3xl font-black text-white">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Secure dashboard access
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-red-500/20
                bg-black/40
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/20
              "
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-red-500/20
                bg-black/40
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/20
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-red-600
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-red-500
                disabled:cursor-not-allowed
                disabled:opacity-70
                shadow-[0_0_30px_rgba(255,0,0,0.22)]
              "
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}

export default AdminLoginPage;

