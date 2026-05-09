import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast, { Toaster } from "react-hot-toast";

import TextInput from "../../components/form/TextInput";

import api from "../../api/axios";

import {
  registerSchema,
  type RegisterFormData,
} from "../../validations/registerValidation";

function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setLoading(true);

      const response = await api.post(
        "/register",
        data
      );

      toast.success(
        response.data.message ||
          "Registration successful"
      );

      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
          px-4
          py-10
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
            backdrop-blur-xl
            p-6
            shadow-[0_0_50px_rgba(255,0,0,0.15)]
          "
        >
          <div className="mb-8 text-center">
            <div
              className="
                mx-auto
                mb-4
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-600/20
                text-3xl
                font-bold
                text-red-500
                shadow-[0_0_30px_rgba(255,0,0,0.3)]
              "
            >
              G
            </div>

            <h1
              className="
                text-3xl
                font-black
                tracking-tight
              "
            >
              Game Registration
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-zinc-400
              "
            >
              Register now and secure your slot
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
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
              placeholder="+919999999999"
              error={errors.phone?.message}
              {...register("phone")}
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

                shadow-[0_0_30px_rgba(255,0,0,0.3)]
              "
            >
              {loading
                ? "Registering..."
                : "Register Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;