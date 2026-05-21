"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Expense } from "@/types/expense";

interface Props {
  expenses: Expense[];
}

export default function MonthlyChart({ expenses }: Props) {
  const grouped = expenses.reduce((acc: any, curr) => {
    const month = new Date(curr.date).toLocaleString("default", {
      month: "short",
    });

    const existing = acc.find((item: any) => item.month === month);

    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({
        month,
        amount: curr.amount,
      });
    }

    return acc;
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-2xl font-bold">Monthly Trend</h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={grouped}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="amount" stroke="#06b6d4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
