import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText, ShieldCheck, ClipboardList, Receipt, CheckCircle2, Users,
  X, ArrowRight, Search, Globe, CreditCard, Scale, Eye, Award,
  Map, Compass, Footprints, Bus, Ship, Mountain, Landmark, UtensilsCrossed, Bike
} from "lucide-react";

const features = [
  { icon: FileText, title: "Документооборот", desc: "Все документы с исполнителями можно подписать удалённо через встроенный модуль ЭДО. Простое и быстрое подписание договоров и актов." },
  { icon: ShieldCheck, title: "Проверка статуса", desc: "Не нужно проверять статус самозанятого вручную — Timell сделает это автоматически перед каждой выплатой." },
  { icon: ClipboardList, title: "Задания", desc: "Полный цикл работы с заданиями: от публикации на платформе до оплаты. Гид видит задание, берет его и проводит экскурсию." },
  { icon: Receipt, title: "Оплата НПД", desc: "НПД удерживается из каждой выплаты и оплачивается автоматически раз в месяц от лица самозанятого исполнителя." },
  { icon: CheckCircle2, title: "Закрывающие документы", desc: "Все документы генерируются автоматически: оплата не уйдёт самозанятому без сформированного чека и подписанного акта." },
  { icon: Users, title: "Поддержка всех статусов", desc: "Работа не только с самозанятыми, но и с ИП, а также физлицами по договорам ГПХ." },
];

const steps = [
  { num: 1, title: "Регистрация", desc: "Гид создает аккаунт, указывает реквизиты и налоговый статус." },
  { num: 2, title: "Проверка статуса", desc: "Timell автоматически проверяет статус гида в ФНС." },
  { num: 3, title: "Задание на экскурсию", desc: "Вы публикуете задание с маршрутом, сроками и вознаграждением." },
  { num: 4, title: "Проведение экскурсии", desc: "Гид проводит экскурсию и отправляет подтверждение." },
  { num: 5, title: "Выплата и документы", desc: "Система рассчитывает налоги, проводит платеж, генерирует чек и акт." },
];

const benefits = [
  { icon: ShieldCheck, title: "Юридическая безопасность", desc: "Легальное взаимодействие с гидами, быстрая проверка статуса в ФНС и оформление документов." },
  { icon: Eye, title: "Полная прозрачность", desc: "Вся история платежей, договоры, чеки и акты доступны в Личном кабинете. Можно отследить каждую экскурсию." },
  { icon: Award, title: "Качество сотрудничества", desc: "Автоматическая проверка статуса, оформление документации и контроль за финансовыми расчётами." },
];

const comparison = [
  { without: "Гид отправляет счёт вручную", withT: "Гид отправляет результат через платформу" },
  { without: "Вы вручную проверяете статус в ФНС", withT: "Система автоматически проверяет статус" },
  { without: "Вы вручную рассчитываете налоги", withT: "Система автоматически рассчитывает налоги" },
  { without: "Вы вручную создаёте платёжное поручение", withT: "Система автоматически создаёт платёж" },
  { without: "Вы вручную отправляете деньги через банк", withT: "Система автоматически отправляет деньги" },
  { without: "Вы вручную создаёте акт и чек", withT: "Система автоматически создаёт акт и чек" },
  { without: "Время на одного гида: 45-90 минут", withT: "Время на одного гида: 2-3 минуты" },
  { without: "Гид ждёт платёж 5-7 дней", withT: "Гид получает платёж за 1-2 часа" },
  { without: "Риск ошибок: высокий", withT: "Риск ошибок: минимальный" },
  { without: "Нужна бумажная переписка", withT: "Всё в электронном виде" },
  { without: "Сложно отследить все расходы на туры", withT: "Полная прозрачность всех расходов на туры" },
];

const specifics = [
  { icon: Search, title: "Проверка статуса СМЗ", desc: "Утрата статуса самозанятого влечёт доначисление налогов. Timell проверяет статус перед каждой выплатой." },
  { icon: FileText, title: "Работа через реестры", desc: "Загрузочные файлы для оплаты самозанятым гидам, физлицам по ГПХ и ИП. Загрузите файл — система сделает остальное." },
  { icon: Globe, title: "Полный электронный документооборот", desc: "Договор, приложения, акты — всё оформляется через ЭДО и подписывается простой электронной подписью." },
  { icon: CreditCard, title: "Выплаты на карту или счёт", desc: "Гид выбирает способ получения: на карту (быстро) или на расчётный счёт (для ИП)." },
];

const tourTypes = ["Экскурсии по городу", "Туры в музеях", "Пешие прогулки", "Автобусные туры", "Речные круизы", "Приключенческие туры", "Культурные туры", "Гастрономические туры", "Спортивный туризм"];
const tourIcons = [Map, Landmark, Footprints, Bus, Ship, Mountain, Landmark, UtensilsCrossed, Bike];

const taxStatuses = [
  { title: "Самозанятые — плательщики НПД", desc: "Автоматическая проверка статуса, оплата НПД и генерация чеков" },
  { title: "Индивидуальные предприниматели", desc: "Поддержка всех режимов налогообложения (УСН, ОСН, ПСН, ЕНВД)" },
  { title: "Физические лица по договорам ГПХ", desc: "Расчет НДФЛ (13%) и взносов, формирование всех документов" },
  { title: "Иностранные граждане", desc: "Поддержка работы с иностранными гидами из стран ЕАЭС и СНГ" },
];

const risks = [
  { icon: ShieldCheck, title: "Потеря статуса СМЗ", desc: "Автоматическая проверка налогового статуса защитит от непредвиденных налоговых начислений." },
  { icon: Search, title: "Ошибки в расчетах", desc: "Система автоматически рассчитывает налоги и формирует документы. Исключает ошибки и штрафы от ФНС." },
  { icon: Scale, title: "Нарушение законодательства", desc: "Все операции проводятся в соответствии с требованиями ФНС и законодательством РФ." },
];

const speedSteps = [
  { label: "Гид завершает экскурсию", time: "0 минут" },
  { label: "Вы одобряете результат", time: "10-30 минут" },
  { label: "Система рассчитывает налоги", time: "1 минута" },
  { label: "Система проводит платеж", time: "30-60 минут" },
];

const metrics = [
  { value: "10 000+", label: "компаний используют Timell" },
  { value: "500 000+", label: "исполнителей на платформе" },
  { value: "3 000 000+", label: "выплат в месяц" },
  { value: "99.9%", label: "успешных платежей" },
];

const TourismPayments = () => {
  const [executorCount, setExecutorCount] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display leading-tight text-foreground">
              Выплаты самозанятым за{" "}
              <span className="text-primary">туристические услуги</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Гидам, экскурсоводам и другим исполнителям, со всеми закрывающими документами
            </p>
            <Button size="lg" className="text-base px-8">Попробовать бесплатно</Button>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-72 h-72 rounded-full bg-primary/10 flex items-center justify-center">
              <Compass className="w-32 h-32 text-primary/40" />
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
                Timell — это платформа для выплат самозанятым гидам, экскурсоводам, инструкторам и другим специалистам в сфере туризма. Автоматизируем документооборот, проверяем статусы, генерируем чеки и акты, проводим платежи на карту или расчётный счёт.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Возможности платформы для туристических компаний
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
            Как работает система выплат для гидов и экскурсоводов
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

      {/* Special conditions */}
      <section className="py-16 bg-accent/30">
        <div className="container max-w-4xl text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold font-display">
            Специальные условия для туристических компаний
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Timell позволяет проводить легальные и безопасные выплаты самозанятым гидам, экскурсоводам, инструкторам и другим исполнителям в сфере туризма. Встроенный модуль ЭДО обеспечивает простое подписание документов. Запишитесь на бесплатную консультацию.
          </p>
          <Button size="lg" className="text-base px-8">Записаться на консультацию</Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Почему это выгодно вашей туристической компании
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
            Как меняется работа туристической компании
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

      {/* Specifics */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Особенности работы с гидами на платформе
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {specifics.map((s) => (
              <Card key={s.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
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

      {/* Tour types */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Платформа работает со всеми видами туристических услуг
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Независимо от типа услуги, если вы работаете с гидами и экскурсоводами, Timell поможет с выплатами
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {tourTypes.map((type, i) => {
              const Icon = tourIcons[i];
              return (
                <span key={type} className="inline-flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Минимизация финансовых и налоговых рисков
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {risks.map((r) => (
              <Card key={r.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                    <r.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
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
            Timell интегрируется с 1С, Travelline, Ostrovok, Sletat, Asana, Monday.com и другими системами через открытый API. Все данные автоматически синхронизируются.
          </p>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Узнать про интеграцию <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Speed + Savings */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Сколько вы сэкономите
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: "85%", label: "Экономия времени", desc: "50 гидов — это 30-50 часов экономии в месяц." },
              { value: "25-35%", label: "Экономия трудозатрат", desc: "Исключаются расходы на бумажный документооборот и ручную обработку." },
              { value: "0", label: "Налоговые риски", desc: "Полная защита благодаря корректному оформлению документов." },
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

          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-6 text-foreground">Выплаты за 1-2 часа вместо 5-7 дней</h3>
            <div className="space-y-3">
              {speedSteps.map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                  <span className="text-sm font-bold text-primary">{s.time}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-sm font-bold text-foreground">Итого</span>
                <span className="text-sm font-extrabold text-primary">1-2 часа</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Возникли вопросы?</h2>
          <p className="text-primary-foreground/80 mb-10 text-lg">
            Оставьте заявку, и мы свяжемся с вами в течение рабочего дня
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Input placeholder="Ваше имя" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
            <Input placeholder="Компания" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
            <Input placeholder="Номер телефона" type="tel" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
            <Input placeholder="E-mail" type="email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          </div>
          <div className="mb-6">
            <p className="text-sm text-primary-foreground/70 mb-3">Сколько у вас исполнителей?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["До 10", "От 11 до 50", "От 51 до 200", "От 201 и более", "Я сам исполнитель"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setExecutorCount(opt)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    executorCount === opt
                      ? "bg-secondary border-secondary text-secondary-foreground"
                      : "border-primary-foreground/30 text-primary-foreground/80 hover:border-primary-foreground/60"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <Button size="lg" className="w-full sm:w-auto px-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-bold">
            Отправить
          </Button>
          <p className="text-xs text-primary-foreground/50 mt-4">
            Отправляя форму, вы соглашаетесь с{" "}
            <a href="#" className="underline">Политикой конфиденциальности</a>
          </p>
        </div>
      </section>

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
              Timell — платформа для автоматизации выплат и документооборота с самозанятыми в сфере туризма. Безопасные и быстрые выплаты гидам, экскурсоводам и инструкторам.
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

export default TourismPayments;
