import { Link2, ShieldCheck, Heart, Eye } from "lucide-react";

const benefits = [
  { icon: Link2, title: "Интеграция с вашими системами", desc: "API для подключения к 1С, SAP и другим ERP-системам. Бесшовная синхронизация данных." },
  { icon: ShieldCheck, title: "Эскроу-модель расчётов", desc: "Средства хранятся на защищённом счёте до подтверждения выполнения задания." },
  { icon: Heart, title: "Забота об исполнителях", desc: "Личный кабинет для исполнителей с историей заданий, выплат и документов." },
  { icon: Eye, title: "Полная прозрачность", desc: "Отчёты в реальном времени, контроль статусов и аналитика по каждому исполнителю." },
];

const BenefitsSection = () => (
  <section className="py-20">
    <div className="container">
      <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
        Что вы получаете
      </h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {benefits.map((b) => (
          <div key={b.title} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <b.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-foreground">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
