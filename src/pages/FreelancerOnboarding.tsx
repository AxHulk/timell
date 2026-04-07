import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { X, Check, Clock, Users, Shield, ChevronRight } from "lucide-react";

import heroImg from "@/assets/freelancer-onboarding/automation.webp";
import opt1 from "@/assets/freelancer-onboarding/optimization_1.webp";
import opt2 from "@/assets/freelancer-onboarding/optimization_2.webp";
import risk1 from "@/assets/freelancer-onboarding/reduceTheRisk_1.webp";
import risk2 from "@/assets/freelancer-onboarding/reduceTheRisk_2.webp";
import risk3 from "@/assets/freelancer-onboarding/reduceTheRisk_3.webp";
import risk4 from "@/assets/freelancer-onboarding/reduceTheRisk_4.webp";
import routine1 from "@/assets/freelancer-onboarding/weTakeOnTheRoutine_1.webp";
import routine2 from "@/assets/freelancer-onboarding/weTakeOnTheRoutine_2.webp";
import routine3 from "@/assets/freelancer-onboarding/weTakeOnTheRoutine_3.webp";

const routineCards = [
  { img: routine1, title: "Сбор и проверка документов", desc: "Автоматическое распознавание и валидация паспортов, ИНН, патентов и других документов исполнителей." },
  { img: routine2, title: "Оформление и подписание", desc: "Формирование договоров, актов, выпуск ПЭП — всё дистанционно, без визита в офис." },
  { img: routine3, title: "Консультации и поддержка", desc: "Исполнители получают помощь от Timell напрямую, разгружая ваших менеджеров." },
];

const withoutItems = [
  "Менеджер запрашивает документы у исполнителя",
  "Объясняет, что конкретно нужно и в каком формате",
  "Несколько раз напоминает о недостающих документах",
  "Вручную проверяет документы и вводит данные",
  "Передаёт по цепочке (бухгалтерия, юристы)",
  "Дожидается проверки и оформления",
  "Получает готового исполнителя",
];

const withTimellItems = [
  "Менеджер передаёт Timell данные исполнителя",
  "Система автоматически проверяет статус в ФНС",
  "Загружает все необходимые документы",
  "Формирует договор и акт",
  "Выпускает электронную подпись",
  "Генерирует чек",
  "Получает готового исполнителя",
];

const advantages = [
  { icon: Clock, img: opt1, title: "Сокращение трудозатрат до 80%", desc: "Менеджеры меньше перекладывают бумаги, больше работают с людьми и быстрее выводят их на объекты." },
  { icon: Users, img: opt2, title: "Рост без расширения штата", desc: "Один менеджер управляет в 5–10 раз большим количеством исполнителей — система берёт на себя рутину." },
  { icon: Shield, img: risk3, title: "Полная юридическая безопасность", desc: "Все документы по законодательству РФ. Проверка статуса перед каждым платежом защищает от штрафов." },
];

const detailItems = [
  { img: risk1, title: "Корректное оформление исполнителя", desc: "Система автоматически «прочитает» документы и патент, введёт корректные данные. Никаких опечаток." },
  { img: risk2, title: "Полная проверка исполнителя", desc: "Интеграция с базами ФНС и открытыми источниками. Автоматическая проверка перед каждым платежом." },
  { img: risk3, title: "Унификация документов", desc: "Одинаковые формулировки и даты в договоре, акте и чеке. Никаких расхождений." },
  { img: risk4, title: "Отсутствие проблем с реквизитами", desc: "Не нужно запрашивать и хранить реквизиты. Исполнитель получит деньги в Timell и сам разберётся с зачислением." },
];

const OnboardingLeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [message, setMessage] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [consentPd, setConsentPd] = useState(false);
  const { submitLead, submitting } = useLeadSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const ok = await submitLead({
      name, phone, email,
      team_size: teamSize,
      message: `${contactMethod ? `Способ связи: ${contactMethod}. ` : ""}${message}`,
      source: "freelancer-onboarding",
    });
    if (ok) {
      setName(""); setPhone(""); setEmail(""); setContactMethod("");
      setMessage(""); setTeamSize(""); setConsentPd(false);
    }
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-lg">
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-center mb-2">
            Получите точный расчёт экономии для вашего бизнеса
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Мы вникнем в особенности вашего бизнеса, разберёмся в процессах и дадим точную оценку.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input placeholder="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input placeholder="E-mail (необязательно)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Способ связи</p>
              <div className="flex gap-4">
                {["Телефонный звонок", "Email", "WhatsApp"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="radio" name="contact" className="accent-primary" checked={contactMethod === opt} onChange={() => setContactMethod(opt)} /> {opt}
                  </label>
                ))}
              </div>
            </div>
            <textarea placeholder="Опишите ваш запрос (необязательно)" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Сколько у вас исполнителей?</p>
              <div className="flex flex-wrap gap-4">
                {["До 50", "50–200", "200 и выше", "Я сам исполнитель"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="radio" name="count" className="accent-primary" checked={teamSize === opt} onChange={() => setTeamSize(opt)} /> {opt}
                  </label>
                ))}
              </div>
            </div>
            <ConsentCheckbox id="consent-onboarding" checked={consentPd} onCheckedChange={setConsentPd} className="mb-3" />
            <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={!consentPd || submitting}>
              {submitting ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const FreelancerOnboarding = () => {
  return (
  <div className="min-h-screen">
    <Header />

    {/* Block 1: Hero */}
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-accent/30">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight mb-6 text-foreground">
            Автоматизируйте оформление внештатников
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Меньше издержек на бюрократию — больше времени на рост проектов
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Рассчитать экономию
          </Button>
        </div>
        <div className="flex justify-center">
          <img src={heroImg} alt="Автоматизация оформления" className="w-full max-w-md" />
        </div>
      </div>
    </section>

    {/* Block 2: What We Take On */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Берём на себя 100% рутины оформления
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {routineCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all">
              <img src={c.img} alt={c.title} className="w-20 h-20 object-contain mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">{c.title}</h3>
              <p className="text-muted-foreground text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 3: Before/After Comparison */}
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Автоматизируйте и упростите работу
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-destructive/20 bg-card p-6">
            <h3 className="text-lg font-bold mb-1 text-foreground">Без автоматизации</h3>
            <p className="text-xs text-destructive font-medium mb-4">от 3 часов до 5 суток</p>
            <ul className="space-y-3">
              {withoutItems.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-card p-6">
            <h3 className="text-lg font-bold mb-1 text-foreground">С Timell</h3>
            <p className="text-xs text-primary font-medium mb-4">15 минут</p>
            <ul className="space-y-3">
              {withTimellItems.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Block 4: Business Advantages */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Оптимизируйте затраты и снизьте риски
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {advantages.map((a) => (
            <div key={a.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <img src={a.img} alt={a.title} className="w-16 h-16 object-contain mb-4" />
              <h3 className="text-base font-bold mb-2 text-foreground">{a.title}</h3>
              <p className="text-muted-foreground text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 5: Detailed Advantages (Zigzag) */}
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Снизьте риск ошибок и упростите процессы
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {detailItems.map((item, i) => (
            <div key={item.title} className={`flex gap-6 items-center rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <img src={item.img} alt={item.title} className="w-24 h-24 object-contain flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 6: Case Study */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">Кейс живого бизнеса</h2>
        <p className="text-muted-foreground text-center mb-10">4 менеджера управляют 400 исполнителями</p>
        <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
          <p className="text-muted-foreground text-sm mb-4">
            <strong className="text-foreground">ООО «MixBS»</strong> — компания-аутсорсер с развитым контакт-центром: поддержка техподдержки, логистика, онлайн-продажи, оформление пациентов в медцентрах.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground/80">
            «К нам могут обратиться с задачей «Нам нужно через 2 дня вывести 100 человек на линию» — и мы её выполняем. Всё это благодаря работе с внештатниками и оптимизации через Timell.»
          </blockquote>
          <p className="text-sm text-muted-foreground mb-6">— Нина Конюшева, соосновательница MixBS</p>
          <div className="flex flex-wrap gap-4 mb-6">
            {["Автоматическое формирование документов", "Автоматизация подписания актов и чеков", "Организованное хранилище документов"].map((r) => (
              <span key={r} className="flex items-center gap-2 text-sm text-primary">
                <Check className="h-4 w-4" /> {r}
              </span>
            ))}
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            Читать полный кейс <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>

    <FreelancerOnboardingForm />


    {/* Block 8: About & Stats */}
    <section className="py-16">
      <div className="container max-w-4xl">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-6">О компании Timell</h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-10 max-w-3xl mx-auto">
          Timell — онлайн-платформа для автоматизации работы с самозанятыми, физлицами по ГПХ и ИП. Официальный партнёр ФНС: автоматическая проверка статусов, генерация чеков, оплата НПД за исполнителя.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary">500 000+</p>
            <p className="text-muted-foreground mt-1 text-sm">документов в месяц</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border" />
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary">10 000+</p>
            <p className="text-muted-foreground mt-1 text-sm">компаний используют</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border" />
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary">99.9%</p>
            <p className="text-muted-foreground mt-1 text-sm">успешных платежей</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default FreelancerOnboarding;
