"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Wallet,
  PieChart,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Expense Tracking",
    description:
      "Track every transaction with categorized insights and real-time updates.",
    icon: Wallet,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Visualize your spending patterns with interactive charts and reports.",
    icon: BarChart3,
  },
  {
    title: "Budget Management",
    description:
      "Set monthly budgets and monitor progress with intelligent alerts.",
    icon: PieChart,
  },
  {
    title: "Secure Authentication",
    description:
      "JWT-powered authentication ensures your financial data stays protected.",
    icon: ShieldCheck,
  },
];

const stats = [
  {
    label: "Transactions Managed",
    value: "25K+",
  },
  {
    label: "Monthly Analytics",
    value: "98%",
  },
  {
    label: "Budget Accuracy",
    value: "99.9%",
  },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          {/* LOGO */}
          <motion.h1
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
        bg-gradient-to-r
        from-cyan-400
        to-blue-500
        bg-clip-text
        text-2xl
        font-extrabold
        tracking-tight
        text-transparent
        sm:text-3xl
      "
          >
            ExpenseTracker
          </motion.h1>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="
          rounded-xl
          border
          border-white/10
          px-3
          py-2
          text-xs
          font-medium
          text-slate-300
          transition-all
          duration-300
          hover:bg-white/10
          hover:text-white
          sm:px-5
          sm:text-sm
        "
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                px-3
                py-2
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-cyan-500/20
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-cyan-500/40
                sm:px-5
                sm:text-sm
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300"
        >
          <Sparkles size={16} />
          AI Powered Personal Finance Management
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-8 max-w-5xl text-5xl font-black leading-tight md:text-7xl"
        >
          Manage Your Expenses With
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}
            Smart Insights
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl"
        >
          A modern finance platform that helps you track expenses, manage
          budgets, analyze spending habits, and stay financially organized with
          elegant dashboards and real-time analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/signup"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-semibold text-white transition hover:scale-105"
          >
            Start Tracking
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/login"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            View Dashboard
          </Link>
        </motion.div>

        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 w-full max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-left">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">Monthly Balance</p>

                <TrendingUp className="text-cyan-400" />
              </div>

              <h2 className="mt-4 text-4xl font-bold">₹1,24,500</h2>

              <p className="mt-2 text-sm text-green-400">
                +12.5% from last month
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-left">
              <p className="text-slate-400">Income</p>

              <h2 className="mt-4 text-4xl font-bold text-cyan-400">₹85,000</h2>

              <div className="mt-5 h-3 rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.5 }}
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-left">
              <p className="text-slate-400">Expenses</p>

              <h2 className="mt-4 text-4xl font-bold text-red-400">₹32,000</h2>

              <div className="mt-5 h-3 rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.5 }}
                  className="h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
          >
            <h2 className="text-5xl font-black text-cyan-400">{stat.value}</h2>

            <p className="mt-3 text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-5xl font-black">
            Powerful Features For
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Smart Finance Tracking
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Designed with modern technologies and smooth user experiences to
            simplify personal finance management.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-[28px] border border-white/10 bg-white/5 p-8 transition backdrop-blur-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl rounded-[40px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-10 py-20 text-center backdrop-blur-2xl"
        >
          <h2 className="text-5xl font-black leading-tight">
            Start Managing Your Finances
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Build better financial habits with modern analytics, intelligent
            insights, and smooth budgeting workflows.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </section>
      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
          {/* LEFT */}
          <div>
            <h2 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent">
              ExpenseTracker
            </h2>

            <p className="mt-2 text-md text-slate-400">
              Modern finance management platform with analytics, budgeting, and
              intelligent expense tracking.
            </p>
          </div>

          {/* CENTER */}
          <div className="flex items-center gap-6 text-md text-slate-400">
            <Link href="/login" className="transition hover:text-cyan-400">
              Login
            </Link>

            <Link href="/signup" className="transition hover:text-cyan-400">
              Signup
            </Link>
          </div>

          {/* RIGHT */}
          <div className="text-center md:text-right">
            <p className="text-md text-slate-400">
              © {new Date().getFullYear()} ExpenseTracker
            </p>

            <p className="mt-1 text-md font-medium text-cyan-400">
              Designed & Developed by Jayavishvaa J
            </p>
          </div>
        </div>

        {/* BOTTOM GLOW */}
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </footer>
    </main>
  );
}
