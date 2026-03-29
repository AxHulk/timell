import { Button } from "@/components/ui/button";
import { Truck, Paintbrush, HardHat, Headphones, PenTool, Megaphone, Plane, ShoppingBag } from "lucide-react";

const industries = [
  { icon: Truck, label: "Курьерские службы" },
  { icon: Paintbrush, label: "Клининг" },
  { icon: HardHat, label: "Строительство" },
  { icon: Headphones, label: "Колл-центры" },
  { icon: PenTool, label: "Копирайтинг" },
  { icon: Megaphone, label: "Маркетинг" },
  { icon: Plane, label: "Турагентства" },
  { icon: ShoppingBag, label: "Мерчендайзинг" },
];

const IndustriesSection = () => (
  <section className="py-20">
    <div className="container text-center">
      <h2 className="text-3xl lg:text-4xl font-bold font-display mb-12">Отраслевые решения</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
        {industries.map((ind) => (
          <div key={ind.label} className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <ind.icon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{ind.label}</span>
          </div>
        ))}
      </div>
      <Button size="lg" className="text-base">Получить консультацию по вашей отрасли</Button>
    </div>
  </section>
);

export default IndustriesSection;
