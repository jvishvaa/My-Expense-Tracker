"use client";

import { useState } from "react";

import { useExpenseStore } from "@/store/expenseStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  refreshExpenses: () => void;
}

export default function AddExpenseModal({ refreshExpenses }: Props) {
  const { addExpense } = useExpenseStore();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const handleSubmit = async () => {
    try {
      await addExpense({
        ...form,
        amount: Number(form.amount),
      });

      refreshExpenses();

      setForm({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: "",
      });

      alert("Expense added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 cursor-pointer">
          Add Transaction
        </button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            placeholder="Title"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="Amount"
            type="number"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />

          <input
            placeholder="Category"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <select
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option value="expense">Expense</option>

            <option value="income">Income</option>
          </select>

          <input
            type="date"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
