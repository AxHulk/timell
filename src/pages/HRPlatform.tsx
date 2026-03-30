import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users, FileText, PenTool, CreditCard, ClipboardList, FolderArchive,
  Clock, Zap, ShieldCheck, UserCheck, AlertTriangle, FileWarning,
  Timer, LayoutDashboard, ArrowRight, CheckCircle2, X,
  Sparkles, Briefcase, Truck, ShoppingBag, Utensils, GraduationCap, Code, Building2
} from "lucide-react";

const features = [
  { icon: ClipboardList, title: "HR-аудит", desc: "Бесплатно проведём HR-аудит процессов по работе с внештатными исполнителями. Расскажем, как безопасно взаимодействовать с самозанятыми и физлицами по ГПХ." },
  { icon: UserCheck, title: "Онбординг исполнителей", desc: "Поможем вашим исполнителям получить статус самозанятого и зарегистрироваться на платформе. Процесс занимает 15 минут вместо 3-5 дней." },
  { icon: FileText, title: "Задания", desc: "Обеспечиваем процесс работы с исполнителями: от публикации новых заданий до оплаты уже выполненных. Исполнители видят задания, берут их и выполняют." },
  { icon: CreditCard, title: "Выплаты", desc: "Проводите выплаты внештатному персоналу, самозанятым, физлицам по договорам ГПХ или ИП, удобно и быстро. Отслеживайте статус в реальном времени." },
  { icon: PenTool, title: "ЭДО и ЭЦП", desc: "Подписывайте все необходимые документы с самозанятыми онлайн. Каждый исполнитель при регистрации получает электронную подпись (ЭЦП) автоматически." },
  { icon: FolderArchive, title: "Документооборот", desc: "Все закрывающие документы генерируются платформой автоматически. Чеки и акты от самозанятых всегда доступны в Личном кабинете заказчика." },
];

const steps = [
  { num: 1, title: "Регистрация", desc: "Самозанятый, физлицо или ИП создают аккаунт на платформе. Система помогает получить статус самозанятого." },
  { num: 2, title: "Проверка", desc: "Timell автоматически проверяет корректность документов, статус в ФНС и готовность к работе." },
  { num: 3, title: "Задание", desc: "HR публикует задание на платформе, указывает требования, сроки и размер вознаграждения." },
  { num: 4, title: "Выполнение", desc: "Исполнитель берет задание, выполняет его и отправляет результат на проверку." },
  { num: 5, title: "Выплата", desc: "После принятия работы система автоматически проводит платеж и генерирует все закрывающие документы." },
];

const benefits = [
  { icon: Clock, title: "Экономия времени на 70%", desc: "HR-специалист тратит на одного исполнителя 2-3 часа. С Timell это занимает 15-20 минут." },
  { icon: Zap, title: "Полная автоматизация", desc: "Все рутинные операции — сбор документов, проверка статуса, расчеты, выплаты — происходят автоматически." },
  { icon: ShieldCheck, title: "Юридическая безопасность", desc: "Платформа гарантирует корректное оформление документов в соответствии с требованиями ФНС и трудового законодательства." },
];

const comparison = [
  { without: "Исполнитель приносит документы в офис", withTimell: "Исполнитель регистрируется онлайн" },
  { without: "HR вручную проверяет документы", withTimell: "Система автоматически проверяет документы" },
  { without: "HR помогает получить статус самозанятого", withTimell: "Система помогает получить статус" },
  { without: "HR вручную создает договор и акт", withTimell: "Система автоматически создает документы" },
  { without: "HR рассчитывает налоги вручную", withTimell: "Система рассчитывает налоги автоматически" },
  { without: "HR проводит выплату через банк", withTimell: "Система проводит выплату автоматически" },
  { without: "Документы хранятся в папках", withTimell: "Все документы в облаке, доступны 24/7" },
  { without: "Время: 2-3 часа на исполнителя", withTimell: "Время: 15-20 минут на исполнителя" },
  { without: "Риск ошибок: высокий", withTimell: "Риск ошибок: минимальный" },
];

const problems = [
  { icon: AlertTriangle, title: "Текучесть кадров", desc: "Исполнители часто теряют статус. Timell автоматически отслеживает статус и уведомляет HR о проблемах." },
  { icon: FileWarning, title: "Ошибки в документах", desc: "HR может ошибиться при оформлении, что приведет к штрафам. Timell исключает ошибки благодаря автоматизации." },
  { icon: Timer, title: "Долгий онбординг", desc: "Процесс онбординга занимает 3-5 дней. С Timell это 15 минут." },
  { icon: LayoutDashboard, title: "Сложность управления", desc: "Когда исполнителей 100+, управление хаотичное. Timell обеспечивает полный контроль через единый интерфейс." },
];

const industries = ["Клининг", "Аутсорсинг", "Логистика", "Мерчандайзинг", "Фудтех", "Образование", "IT-фриланс", "HoReCa"];
const industryIcons = [Sparkles, Briefcase, Truck, ShoppingBag, Utensils, GraduationCap, Code, Building2];

const taxStatuses = [
  { title: "Самозанятые — плательщики НПД", desc: "Система помогает получить статус, автоматически оплачивает НПД и проверяет статус в ФНС" },
  { title: "Индивидуальные предприниматели", desc: "Поддержка всех режимов налогообложения, автоматический расчет налогов" },
  { title: "Физические лица по договорам ГПХ", desc: "Расчет НДФЛ (13%) и взносов, формирование всех документов" },
  { title: "Иностранные граждане", desc: "Поддержка работы с иностранными исполнителями из стран ЕАЭС и СНГ" },
];

const metrics = [
  { value: "10 000+", label: "компаний используют Timell" },
  { value: "500 000+", label: "исполнителей на платформе" },
  { value: "99.9%", label: "успешных платежей" },
  { value: "24/7", label: "поддержка клиентов" },
];

const HRPlatform = () => {
  const [executorCount, setExecutorCount] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display leading-tight text-foreground">
              HR-платформа для работы с{" "}
              <span className="text-primary">самозанятыми</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Документооборот, выплаты, онбординг — всё в одном месте
            </p>
            <Button size="lg" className="text-base px-8">Попробовать бесплатно</Button>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-72 h-72 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-32 h-32 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Main offer */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <Card className="border-primary/20 bg-accent/20">
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                Timell — это HR-платформа, которая помогает специалистам по кадрам автоматизировать всю рутину при работе с самозанятыми, физлицами по договорам ГПХ и ИП.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Block 3: Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Возможности платформы Timell для HR
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

      {/* Block 4: Process timeline */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-16">
            Как работает HR-платформа Timell
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

      {/* Block 5: Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Почему это выгодно вашему HR-отделу
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

      {/* Block 6: Comparison */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Как меняется работа HR с Timell
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
                  {row.withTimell}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 7: Industries */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Проводим бесплатный HR-аудит для разных отраслей
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Процессы работы с внештатным персоналом для разных отраслей бизнеса — мы знаем специфику каждой
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

      {/* Block 8: Tax statuses */}
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

      {/* Block 9: HR Problems */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Какие проблемы решает Timell для HR-отдела
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((p) => (
              <Card key={p.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Block 10: Integration */}
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

      {/* Block 11: Savings */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Сколько вы сэкономите
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { value: "70%", label: "Время HR-специалиста", desc: "Экономия времени на работу с исполнителями. 100 исполнителей — это 100-150 часов в месяц." },
              { value: "15 мин", label: "Скорость онбординга", desc: "Онбординг занимает 15 минут вместо 3-5 дней. Быстро масштабируйте команду." },
              { value: "0", label: "Налоговые риски", desc: "Ноль ошибок в расчетах налогов. Это исключает штрафы от ФНС и переплаты." },
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
        </div>
      </section>

      {/* Block 12: Lead form */}
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
            <a href="/documents/privacy-policy" target="_blank" className="underline">Политикой конфиденциальности</a>
          </p>
        </div>
      </section>

      {/* CTA: HR Audit */}
      <section className="py-16">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold font-display">
            Получите бесплатный HR-аудит
          </h2>
          <p className="text-muted-foreground text-lg">
            Оставьте заявку на консультацию, и мы проанализируем ваши процессы работы с внештатным персоналом.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8">
            Оставить заявку на бесплатный HR-аудит
          </Button>
        </div>
      </section>

      {/* About + metrics */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-display">О компании Timell</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Timell — это онлайн-сервис, помогающий HR-ам в работе с самозанятыми. Платформа упрощает все рутинные операции, связанные с документооборотом и выплатами внештатному персоналу.
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

export default HRPlatform;
