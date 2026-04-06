

import { Download, FileText, FileJson } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useFinance } from "@/store/FinanceContext";

export function ExportButton() {
  const { transactions } = useFinance();


  const getFileName = (ext) => {
    const date = new Date().toISOString().split("T")[0];
    return `transactions-${date}.${ext}`;
  };

  // 📄 CSV Export
  const exportCSV = () => {
    if (!transactions.length) return;

    const header = "Date,Description,Category,Type,Amount\n";

    const rows = transactions
      .map(
        (t) =>
          `${t.date},"${t.description.replace(/"/g, '""')}",${t.category},${t.type},${t.amount}`
      )
      .join("\n");

    download(header + rows, getFileName("csv"), "text/csv");
  };

  // 🧾 JSON Export
  const exportJSON = () => {
    if (!transactions.length) return;

    download(
      JSON.stringify(transactions, null, 2),
      getFileName("json"),
      "application/json"
    );
  };

  // ⬇️ Download helper
  const download = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const disabled = transactions.length === 0;

  return (
    <DropdownMenu>
      
      {/* 🚀 Trigger Button */}
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            disabled={disabled}
            className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      {/* 💎 Dropdown */}
      <DropdownMenuContent
        align="end"
        className="w-[180px] rounded-xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/20 shadow-xl"
      >
        {/* CSV */}
        <DropdownMenuItem
          onClick={exportCSV}
          disabled={disabled}
          className="cursor-pointer flex items-center gap-2 hover:bg-indigo-500/10 focus:bg-indigo-500/10 transition"
        >
          <FileText className="h-4 w-4 text-indigo-500" />
          Export as CSV
        </DropdownMenuItem>

        {/* JSON */}
        <DropdownMenuItem
          onClick={exportJSON}
          disabled={disabled}
          className="cursor-pointer flex items-center gap-2 hover:bg-purple-500/10 focus:bg-purple-500/10 transition"
        >
          <FileJson className="h-4 w-4 text-purple-500" />
          Export as JSON
        </DropdownMenuItem>

        
        {disabled && (
          <div className="text-xs text-slate-400 px-2 py-2 text-center">
            No data to export
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}