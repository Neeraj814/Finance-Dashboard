import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useFinance } from "@/store/FinanceContext";
import { CATEGORY_COLORS } from "@/types/finance";

export function BalanceChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let balance = 0;
    const points: { date: string; balance: number }[] = [];
    sorted.forEach((t) => {
      balance += t.type === "income" ? t.amount : -t.amount;
      const label = new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      points.push({ date: label, balance });
    });
    return points;
  }, [transactions]);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-base font-semibold mb-4">Balance Trend</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="hsl(222, 47%, 11%)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "hsl(222, 47%, 11%)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SpendingChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-base font-semibold mb-4">Spending by Category</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "hsl(220, 9%, 46%)"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`]}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
