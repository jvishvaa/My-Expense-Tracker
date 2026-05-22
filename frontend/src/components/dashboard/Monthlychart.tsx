"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

import { Expense } from "@/types/expense";

interface Props {
  expenses: Expense[];
}

export default function MonthlyChart({ expenses }: Props) {
  const monthlyData: any = {};

  expenses.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expense: 0,
        savings: 0,
      };
    }

    if (item.type === "income") {
      monthlyData[month].income += item.amount;
    }

    if (item.type === "expense") {
      monthlyData[month].expense += item.amount;
    }

    monthlyData[month].savings =
      monthlyData[month].income - monthlyData[month].expense;
  });

  const grouped = Object.values(monthlyData);

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Monthly Financial Trend
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Income vs Expenses vs Savings overview
        </p>
      </div>

      {/* CHART */}
      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={grouped}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="top"
              wrapperStyle={{
                color: "#fff",
                paddingBottom: "20px",
              }}
            />

            {/* INCOME */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              name="Income"
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />

            {/* EXPENSE */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              name="Expenses"
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />

            {/* SAVINGS */}
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#06b6d4"
              strokeWidth={3}
              name="Savings"
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
