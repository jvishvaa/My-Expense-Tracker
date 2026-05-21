"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-lg">
      <div className="mx-auto flex justify-between items-center max-w-7xl px-6 py-4">
        <h1 className="text-2xl font-bold text-white">ExpenseTracker</h1>

        <div className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#about" className="hover:text-white">
            About
          </a>

          <a href="#contact" className="hover:text-white">
            Contact
          </a>

          <Link
            href="/login"
            className="rounded-xl bg-white px-4 py-2 font-medium text-black transition hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
