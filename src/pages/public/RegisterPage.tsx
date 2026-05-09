import { useState } from "react";

import { useForm } from "react-hook-form";


import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import TextInput from "../../components/form/TextInput";

import api from "../../api/axios";

import {
  registerSchema,
  type RegisterFormData,
} from "../../validations/registerValidation";
import { useNavigate } from "react-router-dom";

import AppShell from "../../components/layout/AppShell";

function RegisterPage() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/login");
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);


      const response = await api.post("/register", data);

      toast.success(response.data.message || "Registration successful");

      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell active="register">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-200 shadow-[0_0_30px_rgba(255,0,0,0.12)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
              QR Registration Live
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Register for the Tournament
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              Fill your details. We’ll confirm via WhatsApp.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleNavigate}
              className="rounded-xl border border-red-500/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              type="button"
            >
              Admin Login
            </button>
            <button
              onClick={() => navigate("/student/dashboard")}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              type="button"
            >
              Student Dashboard
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-red-500/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/15 text-red-300 shadow-[0_0_35px_rgba(255,0,0,0.18)]">
                  🎮
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-200">
                    Fast Registration
                  </div>
                  <div className="text-xs text-zinc-400">
                    Mobile-first • Red/Black UI
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <MiniCard
                  n="01"
                  title="Scan & Open"
                  desc="QR opens this registration page"
                />
                <MiniCard
                  n="02"
                  title="Submit Details"
                  desc="Name, email, and WhatsApp number"
                />
                <MiniCard
                  n="03"
                  title="Timeslot Assignment"
                  desc="Admin assigns and you get notified"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="text-xs font-semibold text-zinc-200">
                  Tip
                </div>
                <div className="mt-2 text-xs text-zinc-400">
                  Enter a 10-digit WhatsApp number.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">


            <div className="rounded-3xl border border-red-500/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.12)]">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">Player Form</h2>
                  <span className="rounded-full bg-red-600/15 px-3 py-1 text-xs font-semibold text-red-200">
                    Secure
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  Your data is validated and stored on the backend.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <TextInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                  <TextInput
                  label="WhatsApp Number"
                  placeholder="9999999999"

                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-red-600 py-3 text-base font-semibold text-white shadow-[0_0_35px_rgba(255,0,0,0.18)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Registering..." : "Register Now"}
                  </button>

                  <div className="mt-3 text-center text-xs text-zinc-500">
                    By registering, you’ll receive a confirmation WhatsApp.
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-4 rounded-3xl border border-red-500/10 bg-white/5 p-5 text-sm text-zinc-400">
              <span className="font-semibold text-zinc-200">Already registered?</span>{" "}
              Go to Student Dashboard to see your flow.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MiniCard({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/30 p-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-red-600/15 text-red-200 font-black">
        {n}
      </div>
      <div>
        <div className="text-sm font-semibold text-zinc-200">{title}</div>
        <div className="mt-1 text-xs text-zinc-400">{desc}</div>
      </div>
    </div>
  );
}

export default RegisterPage;

