import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { mockTransactions } from "@/data/mockData";

/**
 * The FinanceContext serves as the central state management for the app.
 * It handles:
 * 1. Persistent Storage (LocalStorage)
 * 2. Real-time Filtering & Sorting
 * 3. Role-based Access (Admin vs Viewer)
 * 4. Financial Calculations
 */
const FinanceContext = createContext(null);

const STORAGE_KEY = "finance-dashboard-data";

export function FinanceProvider({ children }) {
  // Initialize state from LocalStorage or fallback to Mock Data
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockTransactions;
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      return mockTransactions;
    }
  });

  const [role, setRole] = useState("admin");
  
  const [filters, setFiltersState] = useState({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  // Sync transactions to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Update filters partially without overwriting the whole object
  const setFilters = useCallback((partial) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  // Compute filtered and sorted transactions based on UI state
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by search query (Description or Category)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Filter by Type (Income/Expense)
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    // Filter by Category
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Sort the final result
    result.sort((a, b) => {
      const multiplier = filters.sortOrder === "asc" ? 1 : -1;
      
      if (filters.sortBy === "date") {
        return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      
      return multiplier * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  // Financial Summaries
  const totalIncome = useMemo(() => 
    transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0), 
  [transactions]);

  const totalExpenses = useMemo(() => 
    transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0), 
  [transactions]);

  const totalBalance = totalIncome - totalExpenses;

  // Actions
  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filters,
        role,
        setRole,
        setFilters,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        totalIncome,
        totalExpenses,
        totalBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

/**
 * Hook to consume the Finance context
 */
export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}