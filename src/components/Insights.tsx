import { useMemo } from "react";
import { TrendingUp, TrendingDown, AlertCircle, Zap } from "lucide-react";
import { useFinance } from "@/store/FinanceContext";

export function Insights() {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const result: { icon: any; text: string; color: string }[] = [];

    // Highest spending category
    const catMap: Record<string, number> = {};
    expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0) {
      result.push({
        icon: AlertCircle,
        text: `Highest spending: ${sorted[0][0]} ($${sorted[0][1].toLocaleString()})`,
        color: "text-expense",
      });
    }

    // Monthly comparison
    const now = new Date();
    const thisMonth = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.type === "expense";
    });
    const lastMonth = transactions.filter((t) => {
      const d = new Date(t.date);
      const lm = new Date(now.getFullYear(), now.getMonth() - 1);
      return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear() && t.type === "expense";
    });

    const thisTotal = thisMonth.reduce((s, t) => s + t.amount, 0);
    const lastTotal = lastMonth.reduce((s, t) => s + t.amount, 0);

    if (lastTotal > 0) {
      const pctChange = Math.round(((thisTotal - lastTotal) / lastTotal) * 100);
      if (pctChange > 0) {
        result.push({
          icon: TrendingUp,
          text: `Spending is up ${pctChange}% vs last month`,
          color: "text-expense",
        });
      } else {
        result.push({
          icon: TrendingDown,
          text: `Spending is down ${Math.abs(pctChange)}% vs last month`,
          color: "text-income",
        });
      }
    }

    // Food insight
    const foodThisMonth = thisMonth.filter((t) => t.category === "Food").reduce((s, t) => s + t.amount, 0);
    const foodLastMonth = lastMonth.filter((t) => t.category === "Food").reduce((s, t) => s + t.amount, 0);
    if (foodLastMonth > 0 && foodThisMonth > foodLastMonth) {
      const pct = Math.round(((foodThisMonth - foodLastMonth) / foodLastMonth) * 100);
      result.push({
        icon: Zap,
        text: `You spent ${pct}% more on Food this month`,
        color: "text-primary",
      });
    }

    if (result.length === 0) {
      result.push({ icon: Zap, text: "Add more transactions to unlock insights", color: "text-muted-foreground" });
    }

    return result;
  }, [transactions]);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-base font-semibold mb-4">Quick Insights</h3>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <insight.icon className={`h-5 w-5 mt-0.5 shrink-0 ${insight.color}`} />
            <p className="text-sm">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
