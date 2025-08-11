
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import UsageAnalytics from "./pages/UsageAnalytics";
import GoalsChallenges from "./pages/GoalsChallenges";
import BillPayment from "./pages/BillPayment";
import Settings from "./pages/Settings";
import BottomNavigation from "./components/BottomNavigation";
import { EnergyProvider } from "./contexts/EnergyContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EnergyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background relative">
              {/* iPhone Pro Max optimized container */}
              <div className="w-full mx-auto bg-white min-h-screen relative safe-area-bottom" style={{ maxWidth: '430px' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<UsageAnalytics />} />
                  <Route path="/goals" element={<GoalsChallenges />} />
                  <Route path="/bill" element={<BillPayment />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
                <BottomNavigation />
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </EnergyProvider>
    </QueryClientProvider>
  );
};

export default App;
