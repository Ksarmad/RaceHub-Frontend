import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import { authStorage } from "../../lib/auth";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

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

      const response =
        await api.post(
          "/admin/login",
          formData
        );

      const token =
        response.data.data.accessToken;

      authStorage.setToken(token);

      toast.success("Login successful");

      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-black
        px-4
      "
    >
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
          <h1
            className="
              text-3xl
              font-black
              text-white
            "
          >
            Admin Login
          </h1>

          <p className="mt-2 text-zinc-400">
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

              disabled:opacity-70
            "
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;