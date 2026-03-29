import { useState } from "react";
import { Banknote, FileText, Code2, LayoutDashboard } from "lucide-react";

const features = [
  { icon: Banknote, title: "Массовые выплаты", desc: "Загрузите реестр — и Timell автоматически выполнит выплаты тысячам исполнителей. Расчёт налогов, формирование платёжных поручений и контроль статусов — всё в одном окне." },
  { icon: FileText, title: "Электронный документооборот", desc: "Договоры, акты и закрывающие документы формируются автоматически и подписываются ПЭП. Юридически значимый ЭДО без бумаги." },
  { icon: Code2, title: "API-интеграция", desc: "Полноценное REST API для интеграции с вашими системами: 1С, SAP, Битрикс и любыми другими. Вебхуки для мгновенных уведомлений." },
  { icon: LayoutDashboard, title: "Личный кабинет", desc: "Удобный интерфейс для заказчиков и исполнителей. Прозрачные статусы, история операций и аналитика в реальном времени." },
];

const FeaturesSection = () => {
  const [active, setActive] = useState(0);
  const current = features[active];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Функционал платформы
        </h2>
        <div className="grid lg:grid-cols-[300px,1fr] gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col gap-2">
            {features.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                  i === active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <f.icon className="h-5 w-5 flex-shrink-0" />
                {f.title}
              </button>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col justify-center">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <current.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">{current.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
