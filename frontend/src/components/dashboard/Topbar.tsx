"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/authStore";

export default function Topbar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="flex flex-col gap-5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-400 sm:text-base">
            Track your income & expenses
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
          {/* USER */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="flex items-center gap-3"
          >
            {/* AVATAR */}
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-cyan-500/20
                sm:h-11
                sm:w-11
                sm:text-base
              "
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* USER INFO */}
            <div className="max-w-[120px] sm:max-w-none">
              <p className="text-xs font-medium text-slate-400 sm:text-sm">
                Welcome back
              </p>

              <p className="truncate text-sm font-semibold text-white sm:text-base">
                {user?.name}
              </p>
            </div>
          </motion.div>

          {/* LOGOUT */}
          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => {
              logout();

              router.replace("/");
            }}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-red-500
              to-red-600
              px-3
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-red-500/20
              transition-all
              duration-300
              hover:shadow-red-500/40
              sm:px-4
            "
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Logout</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
