"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import ExpenseTable from "@/components/dashboard/ExpenseTable";
import AddExpenseModal from "@/components/dashboard/AddExpenseModel";
import EditExpenseModel from "@/components/dashboard/EditExpenseModel";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import MonthlyChart from "@/components/dashboard/Monthlychart";
import FilterBar from "@/components/dashboard/FilterBar";
import BudgetForm from "@/components/dashboard/BudgetForm";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import Insights from "@/components/dashboard/Insights";

import useProtectedRoute from "@/hooks/useProtectedRoute";

import { useExpenseStore } from "@/store/expenseStore";

import { calculateAnalytics } from "@/lib/analytics";

import { Expense } from "@/types/expense";

import API from "@/services/api";

export default function DashboardPage() {
  // protect route
  const hydrated = useProtectedRoute();

  const { expenses, fetchExpenses } = useExpenseStore();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("");

  const [filterCategory, setFilterCategory] = useState("");

  const [budgets, setBudgets] = useState<any[]>([]);

  const [insights, setInsights] = useState<any[]>([]);

  // fetch budgets
  const fetchBudgets = async () => {
    try {
      const response = await API.get("/budgets");

      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch insights
  const fetchInsights = async () => {
    try {
      const response = await API.get("/analytics/insights");

      setInsights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh everything
  const refreshAllData = async () => {
    await fetchExpenses();

    await fetchBudgets();

    await fetchInsights();
  };

  // initial load
  useEffect(() => {
    refreshAllData();
  }, [fetchExpenses]);

  // analytics
  const { income, expensesTotal, balance } = calculateAnalytics(expenses);

  // unique categories
  const uniqueCategories = [
    ...new Set(expenses.map((expense) => expense.category)),
  ];

  // filtering
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = filterType === "" || expense.type === filterType;

    const matchesCategory =
      filterCategory === "" || expense.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  if (!hydrated) {
    return null;
  }

  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <section className="flex-1">
        <Topbar />

        <div className="p-6">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Overview</h1>

              <p className="text-slate-400">Track your financial activity</p>
            </div>

            <AddExpenseModal refreshExpenses={refreshAllData} />
          </div>

          {/* ANALYTICS */}
          <AnalyticsCards
            income={income}
            expenses={expensesTotal}
            balance={balance}
          />

          {/* INSIGHTS */}
          <Insights insights={insights} />

          {/* CHARTS */}
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <ExpensePieChart expenses={filteredExpenses} />

            <MonthlyChart expenses={filteredExpenses} />
          </div>

          {/* BUDGET FORM */}
          <div className="mt-8">
            <BudgetForm
              onCreated={refreshAllData}
              categories={uniqueCategories}
            />
          </div>

          {/* BUDGET PROGRESS */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {budgets.map((budget) => {
              const spent = expenses
                .filter(
                  (expense) =>
                    expense.category === budget.category &&
                    expense.type === "expense",
                )
                .reduce((acc, curr) => acc + curr.amount, 0);

              return (
                <BudgetProgress
                  key={budget.id}
                  id={budget.id}
                  category={budget.category}
                  spent={spent}
                  limit={budget.monthly_limit}
                  refreshBudgets={refreshAllData}
                />
              );
            })}
          </div>

          {/* FILTERS */}
          <FilterBar
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            categories={uniqueCategories}
          />

          {/* TABLE */}
          <ExpenseTable
            expenses={filteredExpenses}
            refreshExpenses={refreshAllData}
            setEditingExpense={setEditingExpense}
          />

          {/* EDIT MODAL */}
          <EditExpenseModel
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
            refreshExpenses={refreshAllData}
          />
        </div>
      </section>
    </main>
  );
}
