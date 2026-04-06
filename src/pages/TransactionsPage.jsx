"use client";

import { motion } from "framer-motion"; 
import { useFinance } from "@/store/FinanceContext";
import { Filters } from "@/components/Filters";
import { TransactionsTable } from "@/components/TransactionsTable";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { ExportButton } from "@/components/ExportButton";
import Scene3D from "@/components/Scene3D"; 
import NeuralNetwork from "@/components/NeuralNetwork"; 

export default function TransactionsPage() {
  const { filteredTransactions, setFilters } = useFinance();

  return (
    // 🟢 BASE: Deep Midnight (Dark Mode)
    <div className="relative min-h-screen bg-[#020617] isolate overflow-x-hidden text-white transition-colors duration-500">
      
      {/* 🚀 THREE.JS BACKGROUND LAYERS */}
      <div className="fixed inset-0 -z-30 pointer-events-none select-none overflow-hidden opacity-30">
        <Scene3D />
      </div>
      
      {/* 🧠 NEURAL OVERLAY: Table ke piche connectivity feel dene ke liye */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-20">
        <NeuralNetwork />
      </div>

      {/* 📄 MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* 🚀 HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pt-16 pb-8"
        >
          <div className="space-y-1">
            <h1 className="text-6xl font-black tracking-tighter 
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent">
              Transactions<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg">
              Ji Babuji, monitoring your financial flow with precision.
            </p>
          </div>

          {/* 🎯 ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            <ExportButton />

            {/* Premium Gradient Action */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-[1.5px] rounded-2xl shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105 active:scale-95">
              <div className="bg-[#0f172a] rounded-[14px] overflow-hidden">
                <AddTransactionDialog />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 📊 FILTER SECTION (Sticky Dark Glass) */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-6 z-50 mt-6"
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-xl 
            border border-white/5 
            rounded-[28px] p-5 
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col gap-4">
              <Filters />
              
              <div className="flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-slate-300">
                    {filteredTransactions.length} logs found
                  </span>
                </div>

                <button
                  onClick={() => setFilters({ search: "", type: "all", category: "all", sortBy: "date", sortOrder: "desc" })}
                  className="text-indigo-400 hover:text-white transition-all duration-300 cursor-pointer font-bold"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 📄 TABLE SECTION (Stealth Card) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 pb-24 mt-10"
        >
          {/* 🟢 High-End Stealth Container */}
          <div className="rounded-[40px] overflow-hidden 
            bg-[#0f172a] border border-white/5 
            shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          >
            <div className="p-1"> 
               <TransactionsTable />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🌌 DECORATIVE ATMOSPHERE */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[150px] -z-10 rounded-full" />
      <div className="fixed bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-purple-900/10 blur-[140px] rounded-full -z-10" />
    </div>
  );
}