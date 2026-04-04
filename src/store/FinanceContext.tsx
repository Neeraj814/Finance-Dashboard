import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { Transaction, Role, TransactionType, Category } from "@/types/finance";
import { mockTransactions } from "@/data/mockData";

interface Filters {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

interface FinanceContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: Filters;
  role: Role;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
  updateTransaction: (id: number, tx: Partial<Transaction>) => void;
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

const STORAGE_KEY = "finance-dashboard-data";

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockTransactions;
    } catch {
      return mockTransactions;
    }
  });

  const [role, setRole] = useState<Role>("admin");
  const [filters, setFiltersState] = useState<Filters>({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    result.sort((a, b) => {
      const mul = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(() => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBalance = totalIncome - totalExpenses;

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [...prev, { ...tx, id: Date.now() }]);
  }, []);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTransaction = useCallback((id: number, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions, filteredTransactions, filters, role, setRole, setFilters,
        addTransaction, deleteTransaction, updateTransaction,
        totalIncome, totalExpenses, totalBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
