"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

interface Props {
  onCreated: () => void;
}

export default function BudgetForm({ onCreated }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  const [category, setCategory] = useState("");

  const [monthlyLimit, setMonthlyLimit] = useState("");

  // fetch unique categories
  const fetchCategories = async () => {
    try {
      const response = await API.get("/expenses");

      const uniqueCategories = [
        ...new Set(response.data.map((expense: any) => expense.category)),
      ] as string[];

      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createBudget = async () => {
    try {
      if (!category || !monthlyLimit) {
        return alert("Please fill all fields");
      }

      await API.post("/budgets", {
        category,

        monthly_limit: Number(monthlyLimit),
      });

      setCategory("");

      setMonthlyLimit("");

      onCreated();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Monthly Budget</h2>

        <p className="mt-1 text-sm text-slate-400">
          Set spending limits for each category
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* CATEGORY SELECT */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* LIMIT INPUT */}
        <input
          type="number"
          placeholder="Monthly Limit"
          value={monthlyLimit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={createBudget}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-3 font-semibold text-white transition hover:scale-[1.02] cursor-pointer"
        >
          Save Budget
        </button>
      </div>
    </div>
  );
}
