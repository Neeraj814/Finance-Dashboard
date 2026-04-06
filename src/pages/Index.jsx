"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardOverview from "@/components/DashboardOverview";
import { TransactionsTable } from "@/components/TransactionsTable";
import { Filters } from "@/components/Filters";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { ExportButton } from "@/components/ExportButton";


const Index = () => {
  return (
    <DashboardLayout>
      <div className="relative flex flex-col gap-12 pb-20 isolate">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DashboardOverview />
        </motion.div>

        {/* 📄 MIDDLE SECTION: Actions & Filtering  */}
        <div className="flex flex-col gap-6 px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Recent Activity<span className="text-indigo-600">.</span>
              </h2>
              <p className="text-base text-slate-500 font-medium">
                Detailed view of your incoming and outgoing funds.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <ExportButton />
              
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-[1.5px] rounded-xl shadow-lg shadow-indigo-100 transition-transform hover:scale-105 active:scale-95">
                <div className="bg-white rounded-[14px]">
                  <AddTransactionDialog />
                </div>
              </div>
            </div>
          </div>

          {/* 🔍 Search and Category Filters  */}
          <div className="relative z-20">
             <Filters />
          </div>
        </div>

        {/* 📊 BOTTOM SECTION: The Data Table */}
        <div className="px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-[32px] overflow-hidden bg-white border border-slate-100 shadow-[0_32px_64px_-12px_rgba(99,102,241,0.08)]"
          >
            <TransactionsTable />
          </motion.div>
        </div>

        <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-50/50 blur-[120px] rounded-full -z-10 pointer-events-none" />
      </div>
    </DashboardLayout>
  );
};

export default Index;