"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import Link from "next/link";

import API from "@/services/api";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { motion } from "framer-motion";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),

    email: z.string().email("Invalid email"),

    password: z.string().min(6, "Minimum 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",

    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);

      await API.post("/signup", {
        name: data.name,

        email: data.email,

        password: data.password,
      });

      router.push("/login");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute left-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl" />

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
            Create Account
          </motion.h1>

          <p className="mt-3 text-slate-400">
            Start managing your finances smarter.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

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

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-400">
                {errors.confirmPassword.message}
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
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
