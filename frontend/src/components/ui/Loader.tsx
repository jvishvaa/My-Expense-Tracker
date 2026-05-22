"use client";

export default function BouncingLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-slate-950">
      <div className="loader" />

      <div className="text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent">
          ExpenseTracker
        </h1>

        <p className="mt-2 text-slate-400">
          Loading your financial dashboard...
        </p>
      </div>
    </div>
  );
}
