import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useFinance } from "@/store/FinanceContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function TransactionsTable() {
  const { filteredTransactions, role, deleteTransaction } = useFinance();

  if (filteredTransactions.length === 0) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <p className="text-muted-foreground text-lg">No transactions found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
            {role === "admin" && <TableHead className="w-[50px]" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((tx) => (
            <TableRow key={tx.id} className="group">
              <TableCell className="font-medium">{tx.description}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-normal">{tx.category}</Badge>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                  {tx.type === "income" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {tx.type === "income" ? "Income" : "Expense"}
                </span>
              </TableCell>
              <TableCell className={`text-right font-semibold ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
              </TableCell>
              {role === "admin" && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-expense"
                    onClick={() => deleteTransaction(tx.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
