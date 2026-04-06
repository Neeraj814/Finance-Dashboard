"use client";

import { motion } from "framer-motion";
import { Insights } from "@/components/Insights";
import { BalanceChart, SpendingChart } from "@/components/Charts";
import Scene3D from "@/components/Scene3D"; 
import NeuralNetwork from "@/components/NeuralNetwork"; 
import { Sparkles, BarChart3, TrendingUp } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] isolate overflow-x-hidden text-slate-200"> 
      <div className="fixed inset-0 -z-30 pointer-events-none select-none overflow-hidden opacity-40">
         <Scene3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-12">
        
        {/* 🚀 Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-[0.3em]">
              <Sparkles size={14} className="animate-pulse" />
              AI Powered Analysis
            </div>
            <h1 className="text-6xl font-black tracking-tight text-white leading-tight">
              Financial <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Insights.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg max-w-lg">
              Detailed analysis to help you understand your spending patterns and optimize your wealth.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative h-[400px] w-full"
          >
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
            <NeuralNetwork />
          </motion.div>
        </div>

        {/* 🧠 AI Insights Card  */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-[40px] border border-white/5 bg-slate-900/50 backdrop-blur-md shadow-2xl p-1"
        >
          <div className="p-2 sm:p-4">
            <div className="rounded-[36px] bg-[#0f172a]/80 p-6 sm:p-10 border border-white/5">
                <Insights />
            </div>
          </div>
        </motion.section>

        {/* 📊 Charts Grid  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
          <motion.div 
            className="bg-[#0f172a] p-8 rounded-[32px] border border-white/5 shadow-2xl transition-all hover:border-indigo-500/30"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                <TrendingUp size={22} />
              </div>
              <h3 className="font-bold text-xl text-white tracking-tight">Balance History</h3>
            </div>
            <BalanceChart />
          </motion.div>

          <motion.div 
            className="bg-[#0f172a] p-8 rounded-[32px] border border-white/5 shadow-2xl transition-all hover:border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                <BarChart3 size={22} />
              </div>
              <h3 className="font-bold text-xl text-white tracking-tight">Spending Analysis</h3>
            </div>
            <SpendingChart />
          </motion.div>
        </div>

      </div>
      <div className="fixed bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}