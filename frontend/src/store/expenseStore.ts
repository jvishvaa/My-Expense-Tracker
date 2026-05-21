import { create } from "zustand";

import API from "@/services/api";

import { Expense } from "@/types/expense";

interface ExpenseStore {
  expenses: Expense[];

  loading: boolean;

  fetchExpenses: () => Promise<void>;

  addExpense: (payload: Partial<Expense>) => Promise<void>;

  deleteExpense: (id: number) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],

  loading: false,

  fetchExpenses: async () => {
    try {
      set({ loading: true });

      const response = await API.get("/expenses");

      set({
        expenses: response.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  addExpense: async (payload) => {
    try {
      await API.post("/expenses", payload);

      const response = await API.get("/expenses");

      set({
        expenses: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteExpense: async (id) => {
    try {
      await API.delete(`/expenses/${id}`);

      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
