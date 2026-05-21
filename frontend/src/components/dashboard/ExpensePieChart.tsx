"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

import { Expense } from "@/types/expense";

interface Props {
  expenses: Expense[];
}

const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6", "#14b8a6", "#f97316"];

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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-2xl font-bold">Expense Categories</h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={grouped}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
            >
              {grouped.map((_: any, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
