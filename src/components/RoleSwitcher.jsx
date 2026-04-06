"use client";

import { Shield, Eye, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { useFinance } from "@/store/FinanceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoleSwitcher() {
  const { role, setRole } = useFinance();
  const isAdmin = role === "admin";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-50 flex items-center"
    >
      <Select value={role} onValueChange={setRole}>
        
        <SelectTrigger
          className="w-[170px] h-9 px-3 
          flex items-center justify-between 
          rounded-xl backdrop-blur-xl 
          bg-white/60 dark:bg-slate-900/60 
          border border-white/20 shadow-sm
          [&>svg:last-child]:hidden" // ❌ remove default icon
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2">
            <motion.div
              key={role}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isAdmin ? (
                <Shield className="h-4 w-4 text-emerald-500" />
              ) : (
                <Eye className="h-4 w-4 text-slate-400" />
              )}
            </motion.div>

            <SelectValue placeholder="Role" />
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                isAdmin
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-slate-500/10 text-slate-500"
              }`}
            >
              {isAdmin ? "ADMIN" : "VIEW"}
            </span>

            {/* ✅ Custom Arrow */}
          
          </div>
        </SelectTrigger>

        {/* ✅ DROPDOWN */}
        <SelectContent
          align="end"
          sideOffset={6}
          className="z-[999] rounded-xl backdrop-blur-xl 
          bg-white dark:bg-slate-900 
          border border-slate-200 dark:border-slate-700 
          shadow-xl"
        >
          <SelectItem
            value="admin"
            className="flex items-center gap-2 focus:bg-emerald-500/10"
          >
            
            Admin
          </SelectItem>

          <SelectItem
            value="viewer"
            className="flex items-center gap-2 focus:bg-slate-500/10"
          >
           
            Viewer
          </SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}