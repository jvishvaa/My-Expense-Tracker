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

import { motion } from "framer-motion";

import { Pencil, IndianRupee, Tag, Save } from "lucide-react";

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense) {
      setForm(expense);
    }
  }, [expense]);

  if (!form) return null;

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await API.put(`/expenses/${expense?.id}`, form);

      refreshExpenses();

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!expense} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-hidden border border-white/10 bg-[#0f172a] p-0 text-white shadow-2xl shadow-cyan-500/10">
        {/* TOP GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

        <DialogHeader className="relative border-b border-white/10 px-8 py-6">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="rounded-xl bg-cyan-500/20 p-2 text-cyan-400">
              <Pencil size={22} />
            </div>
            Edit Transaction
          </DialogTitle>

          <p className="mt-2 text-sm text-slate-400">
            Update your transaction details seamlessly.
          </p>
        </DialogHeader>

        {/* FORM */}
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
            duration: 0.35,
          }}
          className="relative space-y-5 px-8 py-7"
        >
          {/* TITLE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Transaction Title
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Ex: Netflix Subscription"
                className="w-full bg-transparent p-4 outline-none"
              />
            </div>
          </div>

          {/* AMOUNT + CATEGORY */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* AMOUNT */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Amount
              </label>

              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <IndianRupee size={18} className="mr-2 text-cyan-400" />

                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount: Number(e.target.value),
                    })
                  }
                  placeholder="Enter amount"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            {/* CATEGORY */}
            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <Tag size={18} className="mr-2 text-cyan-400" />

                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  placeholder="Enter category"
                  className="w-full bg-transparent py-4 outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* TYPE + DATE */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* TYPE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Transaction Type
              </label>

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="expense" className="bg-slate-900 text-white">
                  Expense
                </option>

                <option value="income" className="bg-slate-900 text-white">
                  Income
                </option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Date
              </label>

              <input
                type="date"
                value={form.date?.split("T")[0] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: loading ? 1 : 1.02,
            }}
            whileTap={{
              scale: loading ? 1 : 0.98,
            }}
            disabled={loading}
            onClick={handleUpdate}
            className="
                mt-4
                flex
                min-h-[64px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                py-4
                font-semibold
                text-black
                shadow-lg
                shadow-cyan-500/20
                transition-all
                duration-300
                hover:shadow-cyan-500/40
                disabled:cursor-not-allowed
                disabled:opacity-80
              "
          >
            {loading ? (
              <div className="loader scale-50" />
            ) : (
              <>
                <Save size={18} />
                Update Transaction
              </>
            )}
          </motion.button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
