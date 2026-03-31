import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Check, ChevronRight, Settings, Zap, FileText, Users, Receipt, BarChart3, Shield, Clock, Code2 } from "lucide-react";

import heroImg from "@/assets/1c-integration/1C_cloud.webp";
import img1cBuh from "@/assets/1c-integration/1c_buh.webp";
import img1cUnf from "@/assets/1c-integration/1c_unf.webp";
import img1cTrade from "@/assets/1c-integration/1c_trade.webp";
import img1cComplex from "@/assets/1c-integration/1c_complex.webp";
import img1cErp from "@/assets/1c-integration/1c_erp.webp";
import img1cFresh from "@/assets/1c-integration/1c_fresh.webp";
import imgDoc from "@/assets/1c-integration/1c_doc.png";
import imgCheck from "@/assets/1c-integration/check.webp";
import imgFolder from "@/assets/1c-integration/folder_download.webp";

const tabs = [
  { title: "Простая установка", desc: "Не требуется привлечение IT-специалистов. Модуль интеграции загружается в 1С через стандартные настройки расширений. Пошаговая инструкция доступна в личном кабинете Timell.", icon: Settings },
  { title: "Гибкие настройки", desc: "Настройка занимает несколько минут. Вы сами выбираете, какие аналитики использовать: номенклатуру услуг, статьи затрат, счета учёта. Все параметры адаптируются под вашу учётную политику.", icon: Zap },
  { title: "Полная автоматизация", desc: "После подключения модуля все документы формируются автоматически: поступление услуг, выплаты исполнителям, операции, введённые вручную — для корректировок и доп. расходов.", icon: FileText },
];

const steps = [
  { num: "01", title: "Регистрация на Timell", desc: "Создайте аккаунт компании на платформе и пройдите модерацию (1–2 рабочих дня)." },
  { num: "02", title: "Загрузка модуля в 1С", desc: "Скачайте расширение из личного кабинета и загрузите через «Администрирование → Расширения»." },
  { num: "03", title: "Настройка параметров", desc: "Укажите реквизиты, счета учёта, аналитики. Система предложит готовые шаблоны." },
  { num: "04", title: "Начало работы", desc: "Проводите выплаты на Timell — модуль автоматически создаёт все документы в 1С." },
];

const versions = [
  { name: "1С:Бухгалтерия 3.0", img: img1cBuh },
  { name: "1С:Управление нашей фирмой", img: img1cUnf },
  { name: "1С:Управление торговлей", img: img1cTrade },
  { name: "1С:Комплексная автоматизация", img: img1cComplex },
  { name: "1С:ERP Управление предприятием 2.0", img: img1cErp },
  { name: "1С:Fresh", img: img1cFresh },
];

const automationItems = [
  { icon: Users, title: "Загрузка контрагентов", desc: "Все исполнители автоматически добавляются в справочник контрагентов 1С с реквизитами и налоговым статусом." },
  { icon: Receipt, title: "Синхронизация чеков", desc: "Чеки от самозанятых автоматически загружаются в 1С как подтверждающие документы к актам." },
  { icon: FileText, title: "Формирование актов", desc: "Система автоматически создаёт акты об оказании услуг с корректными реквизитами и подписями." },
  { icon: BarChart3, title: "Учёт выплат", desc: "Каждый платёж исполнителю автоматически отражается в 1С с соответствующими проводками." },
  { icon: Shield, title: "Налоговый учёт", desc: "Автоматический расчёт и учёт налогов (НДФЛ, НПД) в соответствии со статусом исполнителя." },
];

const benefits = [
  { icon: Clock, title: "Минус 80% ручной работы", desc: "Бухгалтеры больше не вводят данные вручную. Всё происходит автоматически." },
  { icon: Shield, title: "Ноль ошибок в реквизитах", desc: "Система подтягивает проверенные данные, исключая опечатки и несоответствия." },
  { icon: FileText, title: "Полная аудит-готовность", desc: "Все документы хранятся в защищённом архиве с выгрузкой для налоговой." },
];

const Integration1C = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [consentPd, setConsentPd] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Block 1: Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight mb-6 text-foreground">
              Интеграция Timell с 1С и системами управления
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ваша бухгалтерия продолжает работать в привычных программах, а все документы и выплаты автоматически синхронизируются с Timell. Никаких ручных загрузок, никаких ошибок.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Подключить интеграцию
            </Button>
          </div>
          <div className="flex justify-center">
            <img src={heroImg} alt="Интеграция с 1С" className="w-full max-w-sm" />
          </div>
        </div>
      </section>

      {/* Block 2: Main Advantage Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr,auto] gap-10 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold font-display mb-4">Модуль Timell для 1С</h2>
              <p className="opacity-90 leading-relaxed">
                Платформа Timell автоматически синхронизирует все данные с вашей системой 1С, обеспечивая бесшовный документооборот и учёт выплат внештатным исполнителям.
              </p>
            </div>
            <div className="flex gap-6">
              {[
                { img: imgFolder, label: "Контрагенты" },
                { img: imgCheck, label: "Чеки" },
                { img: imgDoc, label: "Акты" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <img src={item.img} alt={item.label} className="w-16 h-16 object-contain mx-auto mb-2" />
                  <span className="text-sm font-medium opacity-90">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Tabs - Key Advantages */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
            Почему Timell + 1С — это идеальное решение
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Ключевые преимущества интеграции</p>
          <div className="grid lg:grid-cols-[280px,1fr] gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
              {tabs.map((tab, i) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                    i === activeTab ? "bg-primary text-primary-foreground shadow-md" : "text-foreground hover:bg-accent"
                  }`}
                >
                  <tab.icon className="h-5 w-5 flex-shrink-0" />
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                {(() => { const Icon = tabs[activeTab].icon; return <Icon className="h-7 w-7 text-primary" />; })()}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{tabs[activeTab].title}</h3>
              <p className="text-muted-foreground leading-relaxed">{tabs[activeTab].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Steps */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Четыре простых шага к автоматизации
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

      {/* Block 5: 1C Versions Compatibility */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
            Работает со всеми популярными версиями 1С
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Поддерживаются как облачные версии (1С:Облако), так и локальные установки
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto items-stretch">
            {versions.map((v) => (
              <div key={v.name} className="rounded-2xl border border-border bg-card p-4 flex flex-col items-center hover:shadow-lg hover:border-primary/30 transition-all">
                <img src={v.img} alt={v.name} className="w-16 h-20 object-contain mb-3" />
                <p className="text-xs font-medium text-foreground leading-tight text-center flex-1">{v.name}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-xs text-primary">
                  <Check className="h-3 w-3" /> Поддержка
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 6: What Gets Automated */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Полная автоматизация бухгалтерского учёта
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {automationItems.map((item, i) => (
              <div key={item.title} className={`flex gap-6 items-start rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 7: Benefits for Accounting */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Экономия времени и снижение ошибок
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 8: Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Доверие от крупнейших компаний
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary">150 000+</p>
              <p className="text-muted-foreground mt-2">Документов обработано через интеграцию в месяц</p>
            </div>
            <div className="hidden md:block w-px h-20 bg-border" />
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary">5 000+</p>
              <p className="text-muted-foreground mt-2">Компаний используют Timell + 1С</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 9: Lead Form */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-lg">
            <h2 className="text-2xl lg:text-3xl font-bold font-display text-center mb-2">
              Подключите интеграцию за 15 минут
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Наш специалист поможет с установкой модуля и настройкой параметров.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Ваше имя" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <input placeholder="Номер телефона" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <input placeholder="E-mail (необязательно)" className="w-full rounded-xl px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <select className="w-full rounded-xl px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Версия 1С</option>
                {versions.map((v) => <option key={v.name} value={v.name}>{v.name}</option>)}
              </select>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Количество исполнителей</p>
                <div className="flex gap-4">
                  {["До 50", "50–200", "Более 200"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="radio" name="count" className="accent-primary" /> {opt}
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Получить помощь с интеграцией
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Отправляя форму, вы соглашаетесь с Политикой конфиденциальности.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Block 10: Additional - REST API */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Code2 className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display mb-4">
            Кроме 1С, интегрируемся с другими системами
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Timell имеет открытый REST API, что позволяет подключать платформу к любым системам управления: ERP, CRM, системам учёта рабочего времени и другим бизнес-приложениям.
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            Документация API <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integration1C;
