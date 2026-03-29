import benefit1 from "@/assets/benefits_1.webp";
import benefit2 from "@/assets/benefits_2.webp";
import benefit3 from "@/assets/benefits_3.webp";

const cards = [
  { img: benefit1, title: "Проверим исполнителей", desc: "Автоматическая проверка статуса самозанятого в ФНС, верификация данных и оценка рисков" },
  { img: benefit2, title: "Проведём платежи", desc: "Массовые выплаты самозанятым, ИП и физлицам с автоматическим расчётом налогов" },
  { img: benefit3, title: "Соберём документы", desc: "Электронный документооборот: акты, договоры, чеки — всё в одном месте" },
];

const AutomationCards = () => (
  <section className="py-20">
    <div className="container">
      <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
        Автоматизируем работу с внештатным персоналом
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Три ключевых процесса, которые Timell выполняет за вас
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((c) => (
          <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <img src={c.img} alt={c.title} className="w-full h-48 object-contain mb-6" />
            <h3 className="text-xl font-bold mb-2 text-foreground">{c.title}</h3>
            <p className="text-muted-foreground text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AutomationCards;
