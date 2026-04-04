import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FinanceProvider } from "@/store/FinanceContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardOverview from "@/pages/DashboardOverview";
import TransactionsPage from "@/pages/TransactionsPage";
import InsightsPage from "@/pages/InsightsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FinanceProvider>
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </FinanceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
