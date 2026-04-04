import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinance } from "@/store/FinanceContext";
import { CATEGORIES } from "@/types/finance";

export function Filters() {
  const { filters, setFilters } = useFinance();

  return (
    <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="pl-9"
        />
      </div>

      <Select value={filters.type} onValueChange={(v) => setFilters({ type: v as any })}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(v) => setFilters({ category: v as any })}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onValueChange={(v) => {
          const [sortBy, sortOrder] = v.split("-") as ["date" | "amount", "asc" | "desc"];
          setFilters({ sortBy, sortOrder });
        }}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Newest First</SelectItem>
          <SelectItem value="date-asc">Oldest First</SelectItem>
          <SelectItem value="amount-desc">Highest Amount</SelectItem>
          <SelectItem value="amount-asc">Lowest Amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
