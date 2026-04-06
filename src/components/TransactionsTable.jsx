import { Trash2, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { useFinance } from "@/store/FinanceContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

// Helper for currency formatting
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { 
    style: "currency", 
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount || 0);
}

export function TransactionsTable() {
  const { filteredTransactions, role, deleteTransaction } = useFinance();

  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
          <Wallet className="h-8 w-8 text-slate-300" />
        </div>
        <p className="text-slate-900 text-xl font-bold">No transactions yet</p>
        <p className="text-sm text-slate-500 mt-2 max-w-[250px] mx-auto">
          Start tracking your finances by adding your first entry above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-slate-50/80 border-b border-slate-100">
            <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-widest pl-6">Description</TableHead>
            <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-widest">Date</TableHead>
            <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-widest">Category</TableHead>
            <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-widest">Status</TableHead>
            <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-widest text-right pr-6">Amount</TableHead>
            {role === "admin" && <TableHead className="w-[60px]" />}
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {filteredTransactions.map((tx) => (
            <TableRow key={tx.id} className="group border-b border-slate-50 transition-all hover:bg-slate-50/80">
              <TableCell className="py-4 pl-6">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {tx.description.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-900">{tx.description}</span>
                </div>
              </TableCell>

              <TableCell className="text-slate-500 font-medium">
                {new Date(tx.date).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </TableCell>

              <TableCell>
                <Badge variant="outline" className="font-semibold px-3 py-1 border-slate-200 text-slate-600 bg-white shadow-sm">
                  {tx.category}
                </Badge>
              </TableCell>

              <TableCell>
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold gap-1 ${
                  tx.type === "income" 
                    ? "bg-emerald-100/50 text-emerald-700" 
                    : "bg-rose-100/50 text-rose-700"
                }`}>
                  {tx.type === "income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {tx.type === "income" ? "Credit" : "Debit"}
                </div>
              </TableCell>

              <TableCell className={`text-right pr-6 font-bold text-base ${
                tx.type === "income" ? "text-emerald-600" : "text-slate-900"
              }`}>
                {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
              </TableCell>
              
              {role === "admin" && (
                <TableCell className="pr-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-all h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
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