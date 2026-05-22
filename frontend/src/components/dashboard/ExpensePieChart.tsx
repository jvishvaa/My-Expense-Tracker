"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

import { Expense } from "@/types/expense";

interface Props {
  expenses: Expense[];
}

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
  "#eab308",
  "#ef4444",
];

export default function ExpensePieChart({ expenses }: Props) {
  const grouped = expenses.reduce((acc: any, curr) => {
    if (curr.type !== "expense") return acc;

    const existing = acc.find((item: any) => item.name === curr.category);

    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({
        name: curr.category,
        value: curr.amount,
      });
    }

    return acc;
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Expense Categories</h2>

          <p className="mt-1 text-sm text-slate-400">
            Category wise spending breakdown
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={grouped}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              innerRadius={70}
              paddingAngle={4}
            >
              {grouped.map((_: any, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={50}
              formatter={(value) => (
                <span className="text-sm text-slate-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
