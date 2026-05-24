"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { useExpenseStore } from "@/store/expenseStore";

import { Expense } from "@/types/expense";

import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmationModel";

interface Props {
  expenses: Expense[];

  refreshExpenses: () => void;

  setEditingExpense: (expense: Expense) => void;
}

export default function ExpenseTable({
  expenses,
  refreshExpenses,
  setEditingExpense,
}: Props) {
  const { deleteExpense } = useExpenseStore();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);

      await deleteExpense(deleteId);

      refreshExpenses();

      setDeleteId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Transactions</h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage your recent financial activities
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
          {expenses.length} Transactions
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="space-y-4 p-4 lg:hidden">
        {expenses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-400">
            No transactions found
          </div>
        ) : (
          expenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-5"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-semibold text-white">
                    {expense.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {expense.category}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold capitalize ${
                    expense.type === "income"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {expense.type === "income" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}

                  {expense.type}
                </div>
              </div>

              {/* AMOUNT */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Amount</p>

                  <h2
                    className={`mt-1 text-2xl font-bold ${
                      expense.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {expense.type === "income" ? "+" : "-"}₹{expense.amount}
                  </h2>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">Date</p>

                  <p className="mt-1 text-sm text-slate-300">{expense.date}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex items-center gap-3">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setEditingExpense(expense)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-cyan-500/10 py-3 font-medium text-cyan-400 transition hover:bg-cyan-500/20"
                >
                  <Pencil size={16} />
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setDeleteId(expense.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500/10 py-3 font-medium text-red-400 transition hover:bg-red-500/20"
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm uppercase tracking-wider text-slate-400">
              <th className="px-6 py-5">Title</th>

              <th className="px-6 py-5">Category</th>

              <th className="px-6 py-5">Type</th>

              <th className="px-6 py-5">Amount</th>

              <th className="px-6 py-5">Date</th>

              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-slate-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              expenses.map((expense, index) => (
                <motion.tr
                  key={expense.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className="border-b border-white/5 transition hover:bg-white/[0.03]"
                >
                  {/* TITLE */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-white">
                        {expense.title}
                      </p>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-5">
                    <span className="rounded-xl bg-white/5 px-3 py-1 text-sm text-slate-300">
                      {expense.category}
                    </span>
                  </td>

                  {/* TYPE */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold capitalize ${
                        expense.type === "income"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {expense.type === "income" ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}

                      {expense.type}
                    </span>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-5">
                    <span
                      className={`text-base font-bold ${
                        expense.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {expense.type === "income" ? "+" : "-"}₹{expense.amount}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5 text-slate-300">{expense.date}</td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <motion.button
                        whileHover={{
                          scale: 1.08,
                        }}
                        whileTap={{
                          scale: 0.92,
                        }}
                        onClick={() => setEditingExpense(expense)}
                        className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400 transition hover:bg-cyan-500/20"
                      >
                        <Pencil size={18} />
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.08,
                        }}
                        whileTap={{
                          scale: 0.92,
                        }}
                        onClick={() => setDeleteId(expense.id)}
                        className="rounded-2xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      <DeleteConfirmModal
        open={!!deleteId}
        loading={loading}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}
