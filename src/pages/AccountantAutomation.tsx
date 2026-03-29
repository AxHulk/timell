import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck, FileText, PenTool, CreditCard, Monitor, Headphones,
  ClipboardList, UserCheck, Calculator, FolderArchive,
  Clock, CheckCircle2, Archive, ArrowRight, Building2, Truck,
  ShoppingBag, GraduationCap, Utensils, Code, Sparkles, Briefcase
} from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Безопасность", desc: "Расскажем, как организовать все бизнес-процессы легально, в полном соответствии с законодательством РФ. Осуществляйте выплаты безопасно и просто, без налоговых рисков." },
  { icon: FileText, title: "ЭДО", desc: "Полная автоматизация электронного документооборота с самозанятыми для простой и комфортной работы бухгалтера. Чеки, акты, договоры в вашем личном кабинете." },
  { icon: PenTool, title: "ЭЦП", desc: "У каждого исполнителя на платформе есть электронная цифровая подпись, что позволяет подписывать все документы онлайн без необходимости печати и сканирования." },
  { icon: CreditCard, title: "Выплаты", desc: "Помогаем автоматизировать работу с исполнителями от приема работ на платформе до выплаты гонораров. Все происходит в один клик." },
  { icon: Monitor, title: "Удобный интерфейс", desc: "Вся информация по заданиям и платежам, а также закрывающие документы находятся в вашем Личном кабинете на платформе и доступны онлайн 24/7." },
  { icon: Headphones, title: "Клиентская поддержка", desc: "Проконсультируем по всем возникающим вопросам относительно закрывающих документов и оплаты. Поможем с API-интеграцией при необходимости." },
];

const tasks = [
  { icon: ClipboardList, title: "Сбор документов", before: "Бухгалтер просил у каждого исполнителя копии паспорта, ИНН, реквизитов, договора.", after: "Все документы собираются автоматически при регистрации исполнителя на платформе." },
  { icon: UserCheck, title: "Проверка статуса", before: "Бухгалтер вручную проверял статус каждого самозанятого перед выплатой.", after: "Система автоматически проверяет статус в ФНС перед каждой выплатой." },
  { icon: Calculator, title: "Расчет налогов", before: "Бухгалтер вручную рассчитывал НПД (6%), НДФЛ (13%) и другие налоги.", after: "Система автоматически рассчитывает и удерживает все налоги." },
  { icon: FolderArchive, title: "Формирование документов", before: "Бухгалтер вручную создавал акты, счета, чеки для каждого исполнителя.", after: "Система автоматически генерирует все документы и хранит их в архиве." },
];

const steps = [
  { num: 1, title: "Регистрация", desc: "Исполнитель регистрируется на платформе. Самозанятый, физлицо или ИП создают аккаунт и загружают необходимые документы." },
  { num: 2, title: "Проверка", desc: "Система проверяет документы и статус. Timell автоматически проверяет корректность документов и актуальность налогового статуса в ФНС." },
  { num: 3, title: "Выполнение", desc: "Исполнитель выполняет работу. Самозанятый оказывает услугу через платформу." },
  { num: 4, title: "Выплата", desc: "Система рассчитывает и проводит выплату. Timell автоматически рассчитывает сумму, удерживает налоги и проводит платеж." },
  { num: 5, title: "Документы", desc: "Все закрывающие документы автоматически формируются и доступны для скачивания в личном кабинете." },
];

const benefits = [
  { icon: Clock, title: "Экономия времени на 80%", desc: "Бухгалтер тратит на работу с одним исполнителем 30-40 минут. С Timell это занимает 2-3 минуты." },
  { icon: CheckCircle2, title: "Ноль ошибок", desc: "Система автоматически рассчитывает налоги, проверяет статус и формирует документы. Человеческие ошибки исключены." },
  { icon: Archive, title: "Полная аудит-готовность", desc: "Все документы хранятся в едином архиве, подписаны ЭЦП и соответствуют требованиям ФНС." },
];

const industries = ["Клининг", "Аутсорсинг", "Логистика", "Мерчандайзинг", "Фудтех", "Образование", "IT-фриланс", "HoReCa"];
const industryIcons = [Sparkles, Briefcase, Truck, ShoppingBag, Utensils, GraduationCap, Code, Building2];

const taxStatuses = [
  { title: "Самозанятые — плательщики НПД", desc: "Система автоматически оплачивает НПД (6%) и проверяет статус в ФНС" },
  { title: "Индивидуальные предприниматели", desc: "Поддержка всех режимов налогообложения (УСН, ОСНО, ПСН)" },
  { title: "Физические лица по договорам ГПХ", desc: "Расчет НДФЛ (13%) и взносов, формирование всех документов" },
  { title: "Иностранные граждане", desc: "Поддержка работы с иностранными исполнителями и их налоговыми обязательствами" },
];

const metrics = [
  { value: "10 000+", label: "компаний используют Timell" },
  { value: "500 000+", label: "документов обработано в месяц" },
  { value: "99.9%", label: "успешных платежей" },
  { value: "24/7", label: "поддержка клиентов" },
];

const AccountantAutomation = () => {
  const [executorCount, setExecutorCount] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display leading-tight text-foreground">
              Сервис помощи бухгалтеру при работе с{" "}
              <span className="text-primary">самозанятыми</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Автоматизация выплат, ЭДО и документооборота с внештатниками
            </p>
            <Button size="lg" className="text-base px-8">Попробовать бесплатно</Button>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-72 h-72 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="w-32 h-32 text-primary/40" />
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
                Timell — это платформа, которая берет на себя всю бумажную и платежную рутину при работе с самозанятыми, физлицами по договорам ГПХ и ИП.
              </p>
              <p className="text-lg font-semibold text-primary">
                Вашему бухгалтеру больше не нужно вручную собирать документы, рассчитывать налоги и проводить выплаты. Все это происходит автоматически.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Block 3: Features grid */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Возможности сервиса Timell для бухгалтера
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

      {/* Block 4: Tasks */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
            Что бухгалтер больше не должен делать вручную
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Задачи, которые решает Timell для бухгалтера
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {tasks.map((t) => (
              <Card key={t.title} className="overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <t.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="text-destructive font-bold text-sm mt-0.5 shrink-0">Раньше:</span>
                      <p className="text-sm text-muted-foreground">{t.before}</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-primary font-bold text-sm mt-0.5 shrink-0">Теперь:</span>
                      <p className="text-sm text-foreground font-medium">{t.after}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: Process timeline */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-16">
            Как работает автоматизация в Timell
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

      {/* Block 6: Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Почему это выгодно вашему бухгалтеру
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

      {/* Block 7: Industries */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Проводим выплаты для разных отраслей
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Решение работает для всех видов бизнеса, независимо от отрасли
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

      {/* Block 9: 1C Integration */}
      <section className="py-16 bg-accent/30">
        <div className="container max-w-4xl text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold font-display">
            Интеграция с вашей бухгалтерской системой
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Timell интегрируется с 1С (Бухгалтерия, УНФ, УТ, Комплексная автоматизация), а также с другими популярными системами управления через открытый API.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            {[
              "Нет необходимости вручную вводить данные в 1С",
              "Все документы автоматически попадают в вашу систему",
              "Полная синхронизация выплат и налогов",
              "Упрощение сверки и закрытия периода",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Узнать про интеграцию <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Block 10: Savings */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Сколько вы сэкономите
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { value: "80%", label: "Время бухгалтера", desc: "Экономия времени на работу с внештатниками. Если у вас 100 исполнителей, это 30-40 часов в месяц." },
              { value: "0", label: "Налоговые риски", desc: "Ноль ошибок в расчетах налогов. Это исключает штрафы от ФНС и переплаты." },
              { value: "0,7%", label: "Стоимость обслуживания", desc: "Комиссия от 0,7% — это дешевле, чем содержать отдельного специалиста." },
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

      {/* Block 11: Lead form */}
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

      {/* Block 12: Consultation CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold font-display">
            Получите бесплатную консультацию
          </h2>
          <p className="text-muted-foreground text-lg">
            Оставьте заявку, и мы подробно расскажем о всех возможностях платформы для вашего бухгалтера.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8">
            Бесплатная консультация
          </Button>
        </div>
      </section>

      {/* About + metrics */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-display">О компании Timell</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Timell — это онлайн-платформа для автоматизации работы с самозанятыми, физлицами по договорам ГПХ и другим внештатным персоналом. Сервис позволяет оптимизировать бизнес-процессы компании: упростить документооборот и автоматизировать выплаты исполнителям.
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

export default AccountantAutomation;
