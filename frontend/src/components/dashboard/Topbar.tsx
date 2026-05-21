"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

export default function Topbar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  return (
    <header className="border-b border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold text-white"> Dashboard</h1>

          <p className="text-slate-400">Track your income & expenses</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block">
              <p className="font-semibold text-white">Welcome back</p>

              <p className="text-sm text-slate-400">{user?.name}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();

              router.replace("/");
            }}
            className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
