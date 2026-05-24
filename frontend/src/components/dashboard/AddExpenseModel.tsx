"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Plus, Wallet, IndianRupee, Tag, CalendarDays } from "lucide-react";

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
  const { addExpense, expenses } = useExpenseStore();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  // fetch unique categories
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(
        expenses
          .map((expense) => expense.category)
          .filter((category) => category && category.trim() !== ""),
      ),
    ];

    setCategories(uniqueCategories);
  }, [expenses]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await addExpense({
        ...form,
        amount: Number(form.amount),
      });

      await refreshExpenses();

      setForm({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: "",
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          setOpen(value);
        }
      }}
    >
      {/* BUTTON */}
      <DialogTrigger asChild>
        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 sm:w-auto cursor-pointer"
        >
          <Plus
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          Add Transaction
        </motion.button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="max-h-[92vh] max-w-[95vw] overflow-y-auto rounded-3xl border border-white/10 bg-[#07111f] p-0 text-white shadow-2xl shadow-cyan-500/10 sm:max-w-2xl">
        {/* TOP GRADIENT */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

        <div className="p-5 sm:p-8">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                <Wallet size={24} />
              </div>
              Add New Transaction
            </DialogTitle>

            <p className="mt-2 text-sm text-slate-400">
              Track your income and expenses seamlessly.
            </p>
          </DialogHeader>

          {/* FORM */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="mt-8 grid gap-5"
          >
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Transaction Title
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 transition-all duration-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <Tag size={18} className="text-cyan-400" />

                <input
                  placeholder="Netflix Subscription"
                  className="w-full bg-transparent py-4 outline-none placeholder:text-slate-500"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* GRID */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* AMOUNT */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Amount
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 transition-all duration-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                  <IndianRupee size={18} className="text-emerald-400" />

                  <input
                    placeholder="5000"
                    type="number"
                    className="w-full bg-transparent py-4 outline-none placeholder:text-slate-500"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Type
                </label>

                <select
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
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
              </div>
            </div>

            {/* CATEGORY + DATE */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">
                  <Tag size={18} className="mr-2 text-cyan-400" />

                  <input
                    type="text"
                    list="categories"
                    placeholder="Enter category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-transparent py-4 outline-none placeholder:text-slate-500"
                  />

                  <datalist id="categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Date
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 transition-all duration-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                  <CalendarDays size={18} className="text-orange-400" />

                  <input
                    type="date"
                    className="w-full bg-transparent py-4 outline-none"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
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
              onClick={handleSubmit}
              className="mt-4 flex min-h-[70px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {loading ? (
                <div className="flex scale-50 items-center justify-center">
                  <div className="loader" />
                </div>
              ) : (
                "Save Transaction"
              )}
            </motion.button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
