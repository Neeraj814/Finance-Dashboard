"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import { DashboardCards } from "@/components/DashboardCards";
import { BalanceChart, SpendingChart } from "@/components/Charts";
import { Insights } from "@/components/Insights";
import { FloatingCoins } from "@/components/FloatingCoins";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import Scene3D from "@/components/Scene3D"; 

export default function DashboardOverview() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning ☀️" :
    hour < 18 ? "Good afternoon 🌤️" :
    "Good evening 🌙";

  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "a") {
        document.getElementById("add-transaction-btn")?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    // 🟢 Base: Responsive Background (Light/Dark Support)
    <div className="relative min-h-screen isolate bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden">
      
      {/* 🚀 3D BACKGROUND LAYER (Sharp & Subtle) */}
      <div className="fixed inset-0 -z-30 pointer-events-none select-none opacity-20 dark:opacity-30">
         <Scene3D />
      </div>

      {/* 📄 MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-12">
        
       
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Dashboard<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            {greeting}, Sir. Here's your financial pulse today.
          </p>
        </motion.div>

        {/* Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardCards />
        </motion.section>

        {/* 📊 Charts: Solid Cards  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-6 rounded-[32px] shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-slate-800 dark:text-slate-200">Balance Trend</h3>
               <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Monthly</span>
            </div>
            <BalanceChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-6 rounded-[32px] shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all hover:scale-[1.01]"
          >
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-slate-800 dark:text-slate-200">Spending Analysis</h3>
               <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Categories</span>
            </div>
            <SpendingChart />
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pb-24"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-[40px] p-1 shadow-2xl">
             <div className="bg-white dark:bg-[#0f172a] rounded-[39px] p-8">
                <Insights />
             </div>
          </div>
        </motion.section>
      </div>

      <div id="add-transaction-btn" className="fixed bottom-8 right-8 z-50">
        <AddTransactionDialog />
      </div>

      {/* Subtle Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[150px] -z-10 rounded-full pointer-events-none" />
    </div>
  );
}