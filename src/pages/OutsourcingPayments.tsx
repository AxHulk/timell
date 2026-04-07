import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import IndustryLeadForm from "@/components/IndustryLeadForm";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardList, FileText, Zap, UserCheck, CreditCard, Headphones,
  Clock, CheckCircle2, Eye, ShieldCheck, Search, Archive,
  ArrowRight, X, Briefcase, Truck, ShoppingBag, Utensils,
  GraduationCap, Code, Building2, HardHat
} from "lucide-react";

const features = [
  { icon: ClipboardList, title: "Работа через задания", desc: "Обеспечиваем работу с исполнителями на всех этапах: от публикации заданий до оплаты за результат." },
  { icon: FileText, title: "Документооборот", desc: "Получайте всю необходимую отчётность и закрывающие документы — договоры, чеки, акты — через Личный кабинет." },
  { icon: Zap, title: "Автоматизация", desc: "Платформа автоматически проверит статус исполнителя, сгенерирует чек и оплатит НПД. Ноль ручной работы." },
  { icon: UserCheck, title: "Онбординг исполнителей", desc: "Поможем исполнителям зарегистрироваться и получить статус плательщика НПД. Процесс занимает 15 минут." },
  { icon: CreditCard, title: "Выплаты исполнителям", desc: "Проводите выплаты в 2 клика через загрузочные реестры. Массовые выплаты за секунды." },
  { icon: Headphones, title: "Клиентская поддержка", desc: "Персональный менеджер поможет с подключением и настройкой. Организуем интеграцию по API." },
];

const steps = [
  { num: 1, title: "Загрузите реестр", desc: "Загружаете файл Excel или CSV с данными исполнителей и суммами выплат." },
  { num: 2, title: "Проверка статусов", desc: "Timell проверяет налоговый статус каждого исполнителя в ФНС." },
  { num: 3, title: "Расчёт налогов", desc: "Платформа автоматически рассчитывает НПД, НДФЛ и взносы." },
  { num: 4, title: "Проведение выплат", desc: "Timell переводит деньги исполнителям и оплачивает налоги в ФНС." },
  { num: 5, title: "Документы готовы", desc: "Чеки, акты и реестры автоматически генерируются для бухгалтерии." },
];

const benefits = [
  { icon: Clock, title: "Экономия времени на 90%", desc: "Вместо 2-3 часов на 100 исполнителей — 5 минут в 2 клика." },
  { icon: CheckCircle2, title: "Ноль ошибок", desc: "Все расчеты по актуальным ставкам налогов. Исключены ошибки и штрафы от ФНС." },
  { icon: Eye, title: "Полная прозрачность", desc: "Статус каждой выплаты, налога, документа в реальном времени через интерфейс." },
];

const comparison = [
  { without: "Вручную собираете реквизиты исполнителей", withT: "Загружаете Excel-файл с реквизитами" },
  { without: "Вручную проверяете статусы в ФНС", withT: "Система автоматически проверяет статусы" },
  { without: "Вручную рассчитываете налоги для каждого", withT: "Система автоматически рассчитывает налоги" },
  { without: "Вручную создаёте платежные поручения", withT: "Система автоматически создаёт платежи" },
  { without: "Вручную отправляете деньги через банк", withT: "Система автоматически отправляет деньги" },
  { without: "Вручную создаёте акты и чеки", withT: "Система автоматически создаёт документы" },
  { without: "Время на 100 исполнителей: 2-3 часа", withT: "Время на 100 исполнителей: 5 минут" },
  { without: "Риск ошибок: высокий", withT: "Риск ошибок: минимальный" },
];

const security = [
  { icon: ShieldCheck, title: "Эскроу-модель", desc: "Деньги на номинальном счете до выполнения работы. Гарантия для обеих сторон." },
  { icon: Search, title: "Проверка статусов", desc: "Перед выплатой проверяем статус в ФНС. Если статус потерян, выплата не проводится." },
  { icon: Archive, title: "Аудит-готовность", desc: "Все документы соответствуют требованиям ФНС и трудового законодательства." },
];

const industries = ["Аутсорсинг", "Логистика", "Мерчандайзинг", "Фудтех", "Строительство", "Образование", "IT-фриланс", "HoReCa"];
const industryIcons = [Briefcase, Truck, ShoppingBag, Utensils, HardHat, GraduationCap, Code, Building2];

const taxStatuses = [
  { title: "Самозанятые — плательщики НПД", desc: "Автоматическая проверка статуса, оплата НПД и генерация чеков" },
  { title: "Индивидуальные предприниматели", desc: "Поддержка всех режимов налогообложения (УСН, ОСН, ПСН, ЕНВД)" },
  { title: "Физические лица по договорам ГПХ", desc: "Расчет НДФЛ (13%) и взносов, формирование всех документов" },
  { title: "Иностранные граждане", desc: "Поддержка работы с исполнителями из стран ЕАЭС и СНГ" },
];

const speedSteps = [
  { label: "Загрузка файла", time: "1 минута" },
  { label: "Проверка данных", time: "1 минута" },
  { label: "Расчет налогов", time: "1 минута" },
  { label: "Проведение платежей", time: "2 минуты" },
];

const metrics = [
  { value: "10 000+", label: "компаний используют Timell" },
  { value: "500 000+", label: "исполнителей на платформе" },
  { value: "5 000 000+", label: "выплат в месяц" },
  { value: "99.9%", label: "успешных платежей" },
];

const OutsourcingPayments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display leading-tight text-foreground">
              Выплаты за{" "}
              <span className="text-primary">аутсорсинг</span> услуг
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Самозанятым и физлицам по договорам ГПХ
            </p>
            <Button size="lg" className="text-base px-8">Попробовать бесплатно</Button>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-72 h-72 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-32 h-32 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Main offer */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <Card className="border-primary/20 bg-accent/20">
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                Timell — это сервис для проведения массовых выплат внештатному персоналу. Платформа автоматически рассчитывает налоги, проверяет статусы исполнителей и генерирует все закрывающие документы.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Возможности платформы Timell для выплат
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-16">
            Как работает система выплат Timell
          </h2>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-border" />
            {steps.map((s) => (
              <div key={s.num} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 relative z-10 shadow-lg text-xl font-bold">
                  {s.num}
                </div>
                <h3 className="text-sm font-bold mb-1 text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Преимущества для компании
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <Card key={b.title} className="text-center hover:shadow-lg transition-shadow border-primary/10">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Как меняется работа с выплатами
          </h2>
          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-2">
              <div className="bg-destructive/5 p-4 text-center font-bold text-foreground border-b border-border">Без Timell</div>
              <div className="bg-primary/5 p-4 text-center font-bold text-foreground border-b border-border">С Timell</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b border-border last:border-b-0">
                <div className="p-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  {row.without}
                </div>
                <div className="p-4 flex items-start gap-2 text-sm text-foreground border-l border-border">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {row.withT}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Решение работает для всех видов бизнеса
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Независимо от отрасли, если у вас есть внештатный персонал, Timell поможет с выплатами
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {industries.map((ind, i) => {
              const Icon = industryIcons[i];
              return (
                <span key={ind} className="inline-flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                  {ind}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tax statuses */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Поддерживаем все налоговые статусы
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {taxStatuses.map((ts) => (
              <Card key={ts.title} className="border-border/50">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-bold text-foreground">{ts.title}</h3>
                  <p className="text-sm text-muted-foreground">{ts.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Безопасность и надежность платежей
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {security.map((s) => (
              <Card key={s.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                    <s.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 bg-accent/30">
        <div className="container max-w-4xl text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold font-display">
            Интеграция с вашей системой управления
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Timell интегрируется с популярными системами управления (1С, HRIS, системы управления проектами) через открытый API. Все данные автоматически синхронизируются.
          </p>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Узнать про интеграцию <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Savings */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Сколько вы сэкономите
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: "90%", label: "Экономия времени", desc: "500 исполнителей — это 20-30 часов экономии в месяц." },
              { value: "0", label: "Ошибки в расчётах", desc: "Автоматические расчёты по актуальным ставкам. Нет штрафов." },
              { value: "∞", label: "Масштабируемость", desc: "10 или 10 000 исполнителей — система справится одинаково." },
            ].map((m) => (
              <Card key={m.label} className="text-center border-primary/10">
                <CardContent className="p-8 space-y-3">
                  <div className="text-4xl font-extrabold text-primary">{m.value}</div>
                  <h3 className="font-bold text-foreground">{m.label}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Speed breakdown */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-6 text-foreground">Скорость выплат: 5 минут вместо 2-3 часов</h3>
            <div className="space-y-3">
              {speedSteps.map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                  <span className="text-sm font-bold text-primary">{s.time}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-sm font-bold text-foreground">Итого</span>
                <span className="text-sm font-extrabold text-primary">5 минут</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <IndustryLeadForm consentId="consent-outsourcing" source="outsourcing-payments" />

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold font-display">
            Оставить заявку или запросить консультацию
          </h2>
          <p className="text-muted-foreground text-lg">
            Укажите ваши контакты, и мы свяжемся с вами в течение рабочего дня.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8">
            Оставить заявку
          </Button>
        </div>
      </section>

      {/* About + metrics */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-display">О компании Timell</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Timell — это онлайн-сервис, помогающий компаниям проводить массовые выплаты внештатному персоналу. Платформа упрощает расчет налогов, проведение платежей и формирование документов.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="text-center space-y-1">
                <div className="text-3xl font-extrabold text-primary">{m.value}</div>
                <p className="text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OutsourcingPayments;
