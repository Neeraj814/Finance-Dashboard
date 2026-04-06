

import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useFinance } from "@/store/FinanceContext";


function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount || 0);
}

export function DashboardCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const savings =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      trend: totalBalance >= 0 ? "up" : "down",
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      trend: "up",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: "from-rose-500 to-pink-500",
      bg: "bg-rose-500/10",
      text: "text-rose-500",
      trend: "down",
    },
    {
      title: "Savings Rate",
      value: `${savings}%`,
      icon: DollarSign,
      color: "from-amber-500 to-yellow-500",
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      trend: savings >= 50 ? "up" : "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.04 }}
          className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/20 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
        >   
          <div
            className={`absolute inset-0 opacity-0 hover:opacity-10 transition bg-gradient-to-r ${card.color}`}
          />

          <div className="flex items-center justify-between relative z-10">
            {/* Left */}
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {card.title}
              </p>

              <p className="text-2xl font-bold mt-1 tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </p>

              <p
                className={`text-xs mt-1 flex items-center gap-1 ${
                  card.trend === "up"
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}
              >
                {card.trend === "up" ? "▲ Positive" : "▼ Negative"}
              </p>
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 10, scale: 1.15 }}
              className={`p-3 rounded-xl ${card.bg}`}
            >
              <card.icon className={`h-5 w-5 ${card.text}`} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}