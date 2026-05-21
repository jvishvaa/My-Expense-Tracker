"use client";

import {
  LayoutDashboard,
  Wallet,
  PieChart,
  Target,
  Settings,
  LogOut,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import clsx from "clsx";

import { useAuthStore } from "@/store/authStore";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    active: true,
  },

  {
    label: "Expenses",
    icon: Wallet,
    path: "#",
    active: false,
  },

  {
    label: "Analytics",
    icon: PieChart,
    path: "#",
    active: false,
  },

  {
    label: "Budgets",
    icon: Target,
    path: "#",
    active: false,
  },

  {
    label: "Settings",
    icon: Settings,
    path: "#",
    active: false,
  },
];

export default function Sidebar() {
  const router = useRouter();

  const pathname = usePathname();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex md:flex-col">
      {/* LOGO */}
      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent">
          ExpenseTracker
        </h1>

        <p className="mt-2 text-sm text-slate-400">Smart Finance Management</p>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-10 flex-1 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.active) {
                  router.push(item.path);
                }
              }}
              className={clsx(
                "flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer",

                item.active
                  ? isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg shadow-cyan-500/10"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  : "cursor-not-allowed opacity-50",
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} />

                <span className="font-medium">{item.label}</span>
              </div>

              {!item.active && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                  WIP
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-10 border-t border-white/10 pt-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400 transition hover:bg-red-500/20 cursor-pointer"
        >
          <LogOut size={20} />

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
