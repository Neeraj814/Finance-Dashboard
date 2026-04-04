import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useFinance } from "@/store/FinanceContext";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function DashboardCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      iconBg: "bg-income-muted",
      iconColor: "text-income",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      iconBg: "bg-expense-muted",
      iconColor: "text-expense",
    },
    {
      title: "Savings Rate",
      value: totalIncome > 0 ? `${Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)}%` : "0%",
      icon: DollarSign,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={card.title} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{card.title}</p>
              <p className="text-2xl font-bold mt-1 tracking-tight">{card.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${card.iconBg}`}>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
