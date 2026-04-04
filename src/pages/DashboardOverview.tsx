import { DashboardCards } from "@/components/DashboardCards";
import { BalanceChart, SpendingChart } from "@/components/Charts";
import { Insights } from "@/components/Insights";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your financial overview at a glance</p>
      </div>
      <DashboardCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <SpendingChart />
      </div>
      <Insights />
    </div>
  );
}
