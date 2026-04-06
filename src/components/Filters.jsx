"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFinance } from "@/store/FinanceContext";
import { CATEGORIES } from "@/types/finance";

export function Filters() {
  const { filters, setFilters } = useFinance();

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  const isActive =
    filters.search ||
    filters.type !== "all" ||
    filters.category !== "all";

  
  const itemStyles = "text-slate-900 cursor-pointer focus:bg-indigo-600 focus:text-white transition-colors rounded-md m-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl"
    >
      {/* 🔍 Search */}
      <div className="relative flex-1 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <Input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 rounded-xl focus:ring-indigo-500"
        />
      </div>

      {/* 📊 Type Select */}
      <Select value={filters.type} onValueChange={(v) => setFilters({ type: v })}>
        <SelectTrigger className="h-11 w-full sm:w-[150px] bg-white border-slate-200 text-slate-900 rounded-xl focus:ring-indigo-500/20">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-white border-slate-200 shadow-2xl z-[100] rounded-xl overflow-hidden">
          <SelectItem value="all" className={itemStyles}>All Types</SelectItem>
          <SelectItem value="income" className={itemStyles}>💰 Income</SelectItem>
          <SelectItem value="expense" className={itemStyles}>💸 Expense</SelectItem>
        </SelectContent>
      </Select>

      {/* 🗂 Category Select */}
      <Select value={filters.category} onValueChange={(v) => setFilters({ category: v })}>
        <SelectTrigger className="h-11 w-full sm:w-[180px] bg-white border-slate-200 text-slate-900 rounded-xl focus:ring-indigo-500/20">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white border-slate-200 shadow-2xl z-[100] max-h-[300px] rounded-xl overflow-hidden">
          <SelectItem value="all" className={`${itemStyles} font-bold`}>All Categories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c} className={itemStyles}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 🔃 Sort Select */}
      <Select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onValueChange={(v) => {
          const [sortBy, sortOrder] = v.split("-");
          setFilters({ sortBy, sortOrder });
        }}
      >
        <SelectTrigger className="h-11 w-full sm:w-[190px] bg-white border-slate-200 text-slate-900 rounded-xl focus:ring-indigo-500/20">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <SelectValue placeholder="Sort by" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border-slate-200 shadow-2xl z-[100] rounded-xl overflow-hidden">
          <SelectItem value="date-desc" className={itemStyles}>Newest First</SelectItem>
          <SelectItem value="date-asc" className={itemStyles}>Oldest First</SelectItem>
          <SelectItem value="amount-desc" className={itemStyles}>Highest Amount</SelectItem>
          <SelectItem value="amount-asc" className={itemStyles}>Lowest Amount</SelectItem>
        </SelectContent>
      </Select>

      
      {isActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 px-4 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition shadow-lg"
        >
          <X className="h-4 w-4" />
          Reset
        </motion.button>
      )}
    </motion.div>
  );
}