"use client";

import { useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useFinance } from "@/store/FinanceContext";
import { CATEGORY_COLORS } from "@/types/finance";

/* ===================== 📈 BALANCE CHART  ===================== */
export function BalanceChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    return sorted.map((t) => {
      balance += t.type === "income" ? t.amount : -t.amount;
      return {
        date: new Date(t.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        balance,
      };
    });
  }, [transactions]);

  return (
    <div className="w-full h-[400px] mt-4">
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full text-slate-400 italic">No data available...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.1)" strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{fontSize: 11, fontWeight: 600, fill: '#94a3b8'}} 
              axisLine={false} 
              tickLine={false} 
              dy={10} 
            />
            <YAxis 
              tick={{fontSize: 11, fontWeight: 600, fill: '#94a3b8'}} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(v) => `₹${v}`} 
            />
            <Tooltip 
              contentStyle={{ 
                background: '#0f172a', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                color: '#fff' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#6366f1" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#chartGlow)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/* ===================== 🍩 SPENDING CHART  ===================== */
export function SpendingChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="w-full h-[400px] mt-4">
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full text-slate-400 italic">No expenses recorded...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%" 
              innerRadius={80} // 
              outerRadius={110}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#6366f1"} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} 
            />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="circle"
              wrapperStyle={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                paddingTop: '30px',
                color: '#64748b' 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}