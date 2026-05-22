"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import Link from "next/link";

import API from "@/services/api";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

import { useState } from "react";

import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await API.post("/login", data);

      login(response.data.access_token, response.data.user);

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(error.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* BACKGROUND BLUR */}
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-extrabold text-transparent"
          >
            Welcome Back
          </motion.h1>

          <p className="mt-3 text-slate-400">
            Login to continue managing your finances.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: loading ? 1 : 1.02,
            }}
            whileTap={{
              scale: loading ? 1 : 0.98,
            }}
            disabled={loading}
            type="submit"
            className="flex w-full items-center justify-center gap-3 cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 py-4 font-semibold text-black shadow-lg shadow-cyan-500/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                {/* LOADER */}
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Signup
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
