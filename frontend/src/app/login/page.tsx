"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import Link from "next/link";

import API from "@/services/api";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await API.post("/login", data);

      console.log(response.data);

      login(response.data.access_token, response.data.user);

      alert("Login successfully");

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="mb-2 text-4xl font-bold text-white">Welcome Back</h1>

        <p className="mb-8 text-slate-400">
          Login to continue managing your finances.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
}
