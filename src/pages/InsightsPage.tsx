import { Insights } from "@/components/Insights";
import { BalanceChart, SpendingChart } from "@/components/Charts";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground mt-1">Understand your spending patterns</p>
      </div>
      <Insights />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <SpendingChart />
      </div>
    </div>
  );
}
