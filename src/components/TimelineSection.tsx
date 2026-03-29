import { Wallet, ClipboardList, CheckCircle2, FileCheck } from "lucide-react";

const steps = [
  { icon: Wallet, title: "Пополнение", desc: "Пополните баланс платформы любым удобным способом" },
  { icon: ClipboardList, title: "Задание", desc: "Создайте задание и назначьте исполнителей" },
  { icon: CheckCircle2, title: "Приёмка", desc: "Проверьте и примите выполненную работу" },
  { icon: FileCheck, title: "Выплата и документы", desc: "Автоматическая выплата и формирование закрывающих документов" },
];

const TimelineSection = () => (
  <section className="py-20 bg-muted/50">
    <div className="container">
      <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-16">Как это работает</h2>
      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
        {steps.map((s, i) => (
          <div key={s.title} className="relative flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 relative z-10 shadow-lg">
              <s.icon className="h-7 w-7" />
            </div>
            <span className="text-xs font-bold text-primary mb-2">Шаг {i + 1}</span>
            <h3 className="text-base font-bold mb-1 text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TimelineSection;
