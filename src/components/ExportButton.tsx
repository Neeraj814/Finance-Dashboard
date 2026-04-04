import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFinance } from "@/store/FinanceContext";

export function ExportButton() {
  const { transactions } = useFinance();

  const exportCSV = () => {
    const header = "Date,Description,Category,Type,Amount\n";
    const rows = transactions.map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join("\n");
    download(header + rows, "transactions.csv", "text/csv");
  };

  const exportJSON = () => {
    download(JSON.stringify(transactions, null, 2), "transactions.json", "application/json");
  };

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportCSV}>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={exportJSON}>Export as JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
