

import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RoleSwitcher } from "@/components/RoleSwitcher";



export function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">

       
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full z-0" />

        {/* 📌 Sidebar */}
        <AppSidebar />

        {/* 📄 Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          
          {/* 🔝 Header */}
          <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
            
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <SidebarTrigger />

              <div className="h-4 w-[1px] bg-slate-300/50 mx-2 hidden sm:block" />

              {/* Breadcrumb / Title */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hidden sm:block"
              >
                Dashboard
              </motion.span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              
             

              {/* 👤 Role Switch */}
              <RoleSwitcher />
            </div>
          </header>

          {/* 📦 Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-auto p-4 md:p-6 lg:p-8"
          >
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}