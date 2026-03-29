import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import DocAutomation from "./pages/DocAutomation.tsx";
import Integration1C from "./pages/Integration1C.tsx";
import FreelancerOnboarding from "./pages/FreelancerOnboarding.tsx";
import TaxPayment from "./pages/TaxPayment.tsx";
import StatusCheck from "./pages/StatusCheck.tsx";
import PartnerProgram from "./pages/PartnerProgram.tsx";
import AccountantAutomation from "./pages/AccountantAutomation.tsx";
import HRPlatform from "./pages/HRPlatform.tsx";
import OutsourcingPayments from "./pages/OutsourcingPayments.tsx";
import FreelancerPayments from "./pages/FreelancerPayments.tsx";
import MarketerPayments from "./pages/MarketerPayments.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solutions/doc-automation" element={<DocAutomation />} />
          <Route path="/solutions/1c-integration" element={<Integration1C />} />
          <Route path="/solutions/freelancer-onboarding" element={<FreelancerOnboarding />} />
          <Route path="/solutions/tax-payment" element={<TaxPayment />} />
          <Route path="/solutions/status-check" element={<StatusCheck />} />
          <Route path="/solutions/partner-program" element={<PartnerProgram />} />
          <Route path="/services/accountant" element={<AccountantAutomation />} />
          <Route path="/services/hr-platform" element={<HRPlatform />} />
          <Route path="/services/outsourcing" element={<OutsourcingPayments />} />
          <Route path="/services/copywriters" element={<FreelancerPayments />} />
          <Route path="/services/marketers" element={<MarketerPayments />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
