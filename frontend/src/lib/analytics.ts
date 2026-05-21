import { Expense } from "@/types/expense";

export const calculateAnalytics = (expenses: Expense[]) => {
  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  const expensesTotal = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  const balance = income - expensesTotal;

  return {
    income,
    expensesTotal,
    balance,
  };
};
