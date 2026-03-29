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
import BloggerPayments from "./pages/BloggerPayments.tsx";
import CourierPayments from "./pages/CourierPayments.tsx";
import CleaningPayments from "./pages/CleaningPayments.tsx";
import TourismPayments from "./pages/TourismPayments.tsx";
import ConstructionPayments from "./pages/ConstructionPayments.tsx";
import FotCalculator from "./pages/FotCalculator.tsx";
import Blog from "./pages/Blog.tsx";
import BlogArticle from "./pages/BlogArticle.tsx";
import ApiDocs from "./pages/ApiDocs.tsx";
import FreelancerPlatform from "./pages/FreelancerPlatform.tsx";
import FreelancerKnowledge from "./pages/FreelancerKnowledge.tsx";
import FindTask from "./pages/FindTask.tsx";
import FAQ from "./pages/FAQ.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
          <Route path="/services/bloggers" element={<BloggerPayments />} />
          <Route path="/services/couriers" element={<CourierPayments />} />
          <Route path="/services/cleaning" element={<CleaningPayments />} />
          <Route path="/services/tourism" element={<TourismPayments />} />
          <Route path="/services/construction" element={<ConstructionPayments />} />
          <Route path="/calculator" element={<FotCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/freelancer-platform" element={<FreelancerPlatform />} />
          <Route path="/freelancer-knowledge" element={<FreelancerKnowledge />} />
          <Route path="/find-task" element={<FindTask />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
