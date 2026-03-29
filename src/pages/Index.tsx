import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AutomationCards from "@/components/AutomationCards";
import ComparisonSection from "@/components/ComparisonSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import IndustriesSection from "@/components/IndustriesSection";
import TimelineSection from "@/components/TimelineSection";
import BlogPreview from "@/components/BlogPreview";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <HeroSection />
    <AutomationCards />
    <ComparisonSection />
    <BenefitsSection />
    <FeaturesSection />
    <IndustriesSection />
    <TimelineSection />
    <BlogPreview />
    <LeadForm />
    <Footer />
  </div>
);

export default Index;
