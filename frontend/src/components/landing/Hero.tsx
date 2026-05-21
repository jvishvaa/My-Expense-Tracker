import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-500/10 to-cyan-500/20" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-lg">
          Smart Finance Management Platform
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
          Track Your
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}
            Expenses
          </span>
          <br />
          Like A Pro
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
          Manage spending, analyze budgets, monitor monthly targets, and gain
          financial insights through powerful analytics.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
            Get Started
            <ArrowRight size={18} />
          </button>

          <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white backdrop-blur-lg transition hover:bg-white/10">
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}
