import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Shield, Check, Calculator, FileText, Receipt, Search, Users, ChevronRight } from "lucide-react";

import warningImg from "@/assets/tax-payment/warning.webp";
import iconScale from "@/assets/tax-payment/icon-scale.svg";
import iconBoxDownload from "@/assets/tax-payment/icon-box-download.svg";
import iconCalendar from "@/assets/tax-payment/icon-calendar.svg";
import iconPackage from "@/assets/tax-payment/icon-package.svg";
import iconPlant from "@/assets/tax-payment/icon-plant.svg";
import iconGraduation from "@/assets/tax-payment/icon-graduation.svg";
import iconMonitor from "@/assets/tax-payment/icon-monitor.svg";
import iconBuilding from "@/assets/tax-payment/icon-building.svg";

const features = [
  { icon: iconScale, title: "Автоматическая оплата налога", desc: "Система самостоятельно производит оплату НПД с дохода самозанятого. Учитывается налоговый бонус, если он есть." },
  { icon: iconCalendar, title: "Налоговая отчётность", desc: "Все закрывающие документы формируются автоматически и доступны для скачивания. Передача через ЭДО." },
  { icon: iconPackage, title: "Формирование чеков", desc: "Система автоматически генерирует чек от лица самозанятого по каждой проведённой операции." },
  { icon: iconMonitor, title: "Расчёт налога", desc: "Рассчёт налога исходя из полученных выплат и автоматическое удержание суммы для дальнейшей оплаты." },
  { icon: iconPlant, title: "Проверка статуса", desc: "Автоматическая проверка актуальности статуса самозанятого. Если статус утрачен — выплата не пройдёт." },
  { icon: iconBoxDownload, title: "Массовые выплаты", desc: "Удобная оплата услуг самозанятых через загрузочные файлы Excel — расчёт сразу с большим количеством исполнителей." },
];

const steps = [
  { num: "01", title: "Исполнитель выполняет работу", desc: "Самозанятый оказывает услугу через Timell и получает вознаграждение." },
  { num: "02", title: "Система рассчитывает налог", desc: "Timell автоматически рассчитывает НПД — 6% от дохода (ФЗ № 422-ФЗ) и удерживает сумму." },
  { num: "03", title: "Депонирование средств", desc: "Удержанные средства депонируются на специальном счёте Timell как партнёра ФНС." },
  { num: "04", title: "Автоматическая уплата в ФНС", desc: "По налоговому уведомлению система уплачивает НПД. Излишек возвращается исполнителю." },
];

const businessBenefits = [
  { icon: Shield, title: "Полная юридическая защита", desc: "Timell берёт обязанность по уплате НПД на себя как официальный партнёр ФНС. Это исключает налоговые риски и штрафы." },
  { icon: Check, title: "Гарантия статуса исполнителя", desc: "Своевременная уплата НПД — исполнитель не потеряет статус самозанятого. Работа без перерывов." },
  { icon: Calculator, title: "Упрощение бухгалтерии", desc: "Все налоговые расчёты и отчётность формируются автоматически. Бухгалтерии не нужно ничего отслеживать." },
];

const industries = [
  { icon: iconBuilding, label: "Клининг" },
  { icon: iconGraduation, label: "Образование" },
  { icon: iconMonitor, label: "IT" },
  { icon: iconPackage, label: "Логистика" },
  { icon: iconCalendar, label: "Аутсорсинг" },
  { icon: iconPlant, label: "Фудтех" },
  { icon: iconBoxDownload, label: "Мерчандайзинг" },
  { icon: iconScale, label: "HoReCa" },
];

const TaxPayment = () => {
  const [consentPd, setConsentPd] = useState(false);

  return (
  <div className="min-h-screen">
    <Header />

    {/* Block 1: Hero */}
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-accent/30">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight mb-6 text-foreground">
            Автоматическая оплата налога за самозанятых
          </h1>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Депонируем и оплачиваем НПД
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8">
            <Shield className="h-4 w-4" /> Официальный партнёр ФНС
          </span>
          <div className="block">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Узнать больше
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={warningImg} alt="Налоги самозанятых" className="w-full max-w-xs" />
        </div>
      </div>
    </section>

    {/* Block 2: Context */}
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container max-w-4xl">
        <h2 className="text-2xl lg:text-3xl font-bold font-display mb-6">
          Оплата налога на профессиональный доход (НПД)
        </h2>
        <p className="opacity-90 leading-relaxed mb-6">
          Оплата НПД — прямая обязанность самозанятого. Он может делать это самостоятельно или делегировать право официальному партнёру ФНС. Второй вариант удобен для исполнителя и безопасен для бизнеса.
        </p>
        <div className="space-y-3">
          {[
            "Исполнитель не потеряет статус из-за неуплаты налогов",
            "Вы защищены от налоговых рисков и проверок",
            "Все документы формируются автоматически по требованиям ФНС",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm opacity-90">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 3: Platform Features Grid */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Возможности платформы Timell
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <img src={f.icon} alt={f.title} className="w-12 h-12 mb-4" />
              <h3 className="text-base font-bold mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 4: How It Works */}
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Процесс автоматической оплаты налогов
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.num} className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg transition-all">
              <span className="inline-flex w-12 h-12 rounded-2xl bg-primary text-primary-foreground items-center justify-center font-bold text-lg mb-4">{step.num}</span>
              <h3 className="text-base font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 5: Business Benefits */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
          Почему это выгодно вашему бизнесу
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {businessBenefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
                <b.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2 text-foreground">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 6: Industries */}
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
          Автоматизируем выплаты для разных отраслей
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Решение работает для всех видов бизнеса, независимо от отрасли
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {industries.map((ind) => (
            <span key={ind.label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:border-primary/30 hover:shadow transition-all">
              <img src={ind.icon} alt="" className="w-5 h-5" />
              {ind.label}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Block 7: Lead Form */}
    <section className="py-20">
      <div className="container max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-lg">
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-center mb-2">
            Получите консультацию по налоговым выплатам
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Укажите ваши контакты, и мы свяжемся в течение рабочего дня.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Ваше имя" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input placeholder="Компания" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input placeholder="Номер телефона" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input placeholder="E-mail" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Сколько у вас исполнителей?</p>
              <div className="flex flex-wrap gap-3">
                {["До 10", "11–50", "51–200", "201 и более", "Я сам исполнитель"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="radio" name="count" className="accent-primary" /> {opt}
                  </label>
                ))}
              </div>
            </div>
            <ConsentCheckbox id="consent-tax" checked={consentPd} onCheckedChange={setConsentPd} className="mb-3" />
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!consentPd}>
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </section>

    {/* Block 8: Quick Contact */}
    <section className="py-12 bg-muted/50">
      <div className="container max-w-3xl text-center">
        <h2 className="text-2xl font-bold font-display mb-2">Возникли вопросы?</h2>
        <p className="text-muted-foreground mb-6">Оставьте заявку, и мы свяжемся с вами в течение рабочего дня.</p>
        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          Оставить заявку
        </Button>
      </div>
    </section>

    {/* Block 9: About & Stats */}
    <section className="py-16">
      <div className="container max-w-4xl">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-6">О компании Timell</h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-4 max-w-3xl mx-auto">
          Timell включён в перечень операторов, осуществляющих информационный обмен с ФНС. Это позволяет проверять статус самозанятого, уплачивать НПД от его имени и автоматически генерировать чеки.
        </p>
        <p className="text-muted-foreground text-center text-sm mb-10 max-w-3xl mx-auto">
          Согласно ФЗ № 422-ФЗ, сумма НПД при работе с юрлицом составляет 6% от дохода. Timell автоматически удерживает и уплачивает эту сумму.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary">500 000+</p>
            <p className="text-muted-foreground mt-1 text-sm">налоговых платежей в месяц</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border" />
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary">10 000+</p>
            <p className="text-muted-foreground mt-1 text-sm">компаний используют Timell</p>
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

export default TaxPayment;
