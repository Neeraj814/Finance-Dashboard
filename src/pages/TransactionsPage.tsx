import { Filters } from "@/components/Filters";
import { TransactionsTable } from "@/components/TransactionsTable";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { ExportButton } from "@/components/ExportButton";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">Manage and review your transactions</p>
        </div>
        <div className="flex gap-2">
          <ExportButton />
          <AddTransactionDialog />
        </div>
      </div>
      <Filters />
      <TransactionsTable />
    </div>
  );
}
