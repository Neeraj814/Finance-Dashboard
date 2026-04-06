"use client";

import {
  LayoutDashboard,
  ArrowRightLeft,
  BarChart3,
  ChevronRight,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: ArrowRightLeft },
  { title: "Insights", url: "/insights", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="z-50 border-r border-slate-800 bg-[#020617] text-slate-400 transition-all duration-300 shadow-none"
    >
      {/* 🚀 Header */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.05 }}
            className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
          >
            <span className="text-white font-bold text-lg">F</span>
          </motion.div>

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-xl tracking-tight text-white"
              >
                FinDash<span className="text-indigo-500">.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>

      {/* 📂 Menu */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Main Navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                      activeClassName="bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-bold"
                    >
                      {/* 🔥 Active Indicator */}
                      <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white opacity-0 group-[.active]:opacity-100 transition-all" />

                      <item.icon className="h-5 w-5 group-hover:text-white group-[.active]:text-white transition-colors" />

                      {!collapsed && (
                        <span className="text-[14px] flex-1">
                          {item.title}
                        </span>
                      )}

                      {!collapsed && (
                        <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-slate-500" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* (Light Contrast on Dark) */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto p-4"
          >
            <div className="group relative rounded-2xl p-4 bg-indigo-600 overflow-hidden cursor-pointer shadow-xl shadow-indigo-600/10">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all" />
              
              <div className="relative z-10 space-y-3">
                <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Zap size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Go Pro</p>
                  <p className="text-[11px] text-indigo-100">Unlock AI Insights</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sidebar>
  );
}