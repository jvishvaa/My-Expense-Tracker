"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import { Expense } from "@/types/expense";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  expense: Expense | null;

  onClose: () => void;

  refreshExpenses: () => void;
}

export default function EditTransactionModal({
  expense,
  onClose,
  refreshExpenses,
}: Props) {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (expense) {
      setForm(expense);
    }
  }, [expense]);

  if (!form) return null;

  const handleUpdate = async () => {
    try {
      await API.put(`/expenses/${expense?.id}`, form);

      refreshExpenses();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={!!expense} onOpenChange={onClose}>
      <DialogContent className="border-white/10 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
          />

          <input
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
          />

          <button
            onClick={handleUpdate}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black"
          >
            Update Transaction
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
