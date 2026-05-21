"use client";

import { useExpenseStore } from "@/store/expenseStore";

import { Expense } from "@/types/expense";

import { Pencil, Trash2 } from "lucide-react";

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
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this transaction?");

    if (!confirmed) return;

    try {
      await deleteExpense(id);

      refreshExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Transactions</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-slate-400">
              <th className="pb-4">Title</th>

              <th className="pb-4">Category</th>

              <th className="pb-4">Type</th>

              <th className="pb-4">Amount</th>

              <th className="pb-4">Date</th>

              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-white/5">
                <td className="py-4">{expense.title}</td>

                <td className="py-4">{expense.category}</td>

                <td className="py-4 capitalize">{expense.type}</td>

                <td className="py-4 font-semibold">
                  <span
                    className={
                      expense.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {expense.type === "income" ? "+" : "-"}₹{expense.amount}
                  </span>
                </td>

                <td className="py-4">{expense.date}</td>

                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingExpense(expense)}
                      className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 transition hover:bg-cyan-500/30 cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500/30 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
