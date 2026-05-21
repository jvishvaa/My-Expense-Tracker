import API from "@/services/api";

import { Trash2 } from "lucide-react";

interface Props {
  id: number;

  category: string;

  spent: number;

  limit: number;

  refreshBudgets: () => void;
}

export default function BudgetProgress({
  id,
  category,
  spent,
  limit,
  refreshBudgets,
}: Props) {
  const percent = Math.min((spent / limit) * 100, 100);

  const deleteBudget = async () => {
    try {
      await API.delete(`/budgets/${id}`);

      refreshBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{category}</h3>

          <p className="text-sm text-slate-400">
            ₹{spent} / ₹{limit}
          </p>
        </div>

        <button
          onClick={deleteBudget}
          className="rounded-xl p-2 text-red-400 transition hover:bg-red-500/10 cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          style={{
            width: `${percent}%`,
          }}
          className={`h-3 rounded-full transition-all duration-500 ${
            percent >= 100
              ? "bg-red-500"
              : percent >= 75
                ? "bg-yellow-500"
                : "bg-cyan-500"
          }`}
        />
      </div>

      {/* FOOTER */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-slate-400">{percent.toFixed(0)}% used</span>

        <span
          className={`font-medium ${
            limit - spent < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          ₹{(limit - spent).toFixed(0)} left
        </span>
      </div>
    </div>
  );
}
