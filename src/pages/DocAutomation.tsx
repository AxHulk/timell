import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Check, FileText, Shield, Globe, Users, Link2, Ban, ChevronRight } from "lucide-react";

import introImg from "@/assets/doc-automation/introBank-bg.webp";
import speedUp1 from "@/assets/doc-automation/speedUp_1.webp";
import speedUp2 from "@/assets/doc-automation/speedUp_2.webp";
import speedUp3 from "@/assets/doc-automation/speedUp_3.webp";
import speedUp4 from "@/assets/doc-automation/speedUp_4.webp";
import speedUp5 from "@/assets/doc-automation/speedUp_5.webp";
import easyConnect from "@/assets/doc-automation/easyToConnect_1.webp";
import benefit1 from "@/assets/doc-automation/benefits_1.webp";
import benefit2 from "@/assets/doc-automation/benefits_2.webp";
import benefit3 from "@/assets/doc-automation/benefits_3.webp";
import benefit4 from "@/assets/doc-automation/benefits_4.webp";
import benefit5 from "@/assets/doc-automation/benefits_5.webp";
import benefit6 from "@/assets/doc-automation/benefits_6.webp";
import benefit7 from "@/assets/doc-automation/benefits_7.webp";

const industries = [
  { title: "Ритейл и мерчендайзинг", desc: "Массовое подписание актов с сотнями исполнителей за пару минут." },
  { title: "Строительство и ремонт", desc: "Дистанционное оформление договоров с рабочими прямо на объекте без визита в офис." },
  { title: "Логистика и доставка", desc: "Автоматический сбор чеков от курьеров сразу после завершения смены." },
  { title: "IT и Digital", desc: "Безопасное подписание NDA и договоров об отчуждении авторских прав с фрилансерами по всему миру." },
];

const speedUpItems = [
  { img: speedUp1, title: "100% дистанционное оформление", desc: "Все документы подписываются удалённо с помощью простой электронной подписи (ПЭП), которая имеет полную юридическую силу." },
  { img: speedUp2, title: "Исключение человеческого фактора", desc: "Платформа автоматически подтягивает проверенные данные исполнителей в ваши шаблоны договоров и актов." },
  { img: speedUp4, title: "Массовая генерация документов", desc: "Загрузите один реестр, и система сгенерирует, отправит и подпишет сотни индивидуальных актов в несколько кликов." },
  { img: speedUp5, title: "Надёжный облачный архив", desc: "Все документы хранятся на защищённых серверах в РФ. Доступ 24/7, удобный поиск и выгрузка для налоговой." },
];

const steps = [
  { num: "01", title: "Приглашение", desc: "Вы отправляете исполнителю ссылку-приглашение в мессенджер или по SMS." },
  { num: "02", title: "Регистрация", desc: "Исполнитель проходит быструю регистрацию со смартфона, система проверяет данные в ФНС и МВД." },
  { num: "03", title: "Выпуск ПЭП", desc: "Мы бесплатно выпускаем для исполнителя электронную подпись. Вы готовы к легальному обмену документами!" },
];

const tools = [
  { icon: FileText, img: benefit1, title: "Автоматизация чеков", desc: "Timell сам формирует и сохраняет чеки от самозанятых в момент выплаты." },
  { icon: Shield, img: benefit2, title: "Ежедневный мониторинг статуса", desc: "Система проверяет актуальность статуса НПД перед каждым платежом." },
  { icon: Globe, img: benefit3, title: "Работа с нерезидентами", desc: "Полная поддержка документооборота с иностранными гражданами." },
  { icon: Users, img: benefit4, title: "Гибкая настройка доступов", desc: "Разные уровни прав для бухгалтеров, юристов и менеджеров проектов." },
  { icon: Link2, img: benefit7, title: "Бесшовная интеграция", desc: "Готовые модули для 1С и открытый API для связки с ERP-системами." },
  { icon: Ban, img: benefit5, title: "Управление рисками", desc: "Блокируйте ненадёжных исполнителей на уровне платформы." },
];

const DocAutomation = () => {
  const [consentPd, setConsentPd] = useState(false);

  return (
  <div className="min-h-screen">
    <Header />

    {/* Block 1: Hero */}
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-accent/30">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight mb-6 text-foreground">
            Электронный документооборот для работы с внештатным персоналом
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Забудьте о бумажной рутине и пересылке сканов в мессенджерах. Обменивайтесь договорами, актами и чеками в один клик с любым типом исполнителей.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["Самозанятые", "Физлица по ГПХ", "ИП", "Иностранные граждане"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">{tag}</span>
            ))}
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Рассчитать стоимость для вашего бизнеса
          </Button>
        </div>
        <div className="flex justify-center">
          <img src={introImg} alt="Электронный документооборот" className="w-full max-w-md lg:max-w-lg" />
        </div>
      </div>
    </section>

    {/* Block 2: Industries */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
          Один сервис — решения для любого бизнеса
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Как Timell решает задачи разных отраслей
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {industries.map((ind) => (
            <div key={ind.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <h3 className="text-lg font-bold mb-2 text-foreground">{ind.title}</h3>
              <p className="text-muted-foreground text-sm">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 3: Speed Up */}
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
          Избавьтесь от бюрократии и сфокусируйтесь на росте
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Преимущества ЭДО от Timell
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {speedUpItems.map((item) => (
            <div key={item.title} className="flex gap-5 items-start rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all">
              <img src={item.img} alt={item.title} className="w-20 h-20 object-contain flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 4: Onboarding Steps */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
          Начать работу проще, чем кажется
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Без сложных настроек, удостоверяющих центров и флешек с токенами
        </p>
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5 items-start">
                <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">{step.num}</span>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <img src={easyConnect} alt="Простое подключение" className="w-full max-w-sm rounded-2xl" />
          </div>
        </div>
      </div>
    </section>

    {/* Block 5: Smart Tools */}
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
          Умные инструменты для вашей юридической безопасности
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Функционал, созданный специально для работы с внештатниками
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <div key={tool.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all text-center">
              <img src={tool.img} alt={tool.title} className="w-16 h-16 object-contain mx-auto mb-4" />
              <h3 className="text-base font-bold mb-2 text-foreground">{tool.title}</h3>
              <p className="text-muted-foreground text-sm">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block 6: EDO + Payments */}
    <section className="py-20">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-display mb-6">
          Документы и деньги в едином окне
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
          В Timell ЭДО неразрывно связан с финансами. Вы пополняете специальный номинальный счёт, исполнитель подписывает акт выполненных работ, и платформа автоматически переводит ему вознаграждение, моментально генерируя закрывающие документы.
        </p>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
          Узнать больше о модуле выплат <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </section>

    {/* Block 7: Lead Form */}
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
          Наведите порядок в документах с внештатниками уже на этой неделе
        </h2>
        <p className="text-center opacity-90 mb-10">
          Оставьте заявку. Наш менеджер свяжется с вами, проведёт персональное демо и поможет с интеграцией.
        </p>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Ваше имя" className="rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/40" />
          <input placeholder="Номер телефона" className="rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/40" />
          <input placeholder="E-mail (необязательно)" className="rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/40" />
          <select className="rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white/40">
            <option value="" className="text-foreground">Кол-во исполнителей</option>
            <option value="50" className="text-foreground">До 50</option>
            <option value="200" className="text-foreground">От 50 до 200</option>
            <option value="200+" className="text-foreground">Более 200</option>
          </select>
          <div className="sm:col-span-2 text-center">
            <Button type="submit" size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto">
              Получить консультацию
            </Button>
            <p className="text-xs opacity-70 mt-3">
              Отправляя форму, вы соглашаетесь с Политикой конфиденциальности.
            </p>
          </div>
        </form>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default DocAutomation;
