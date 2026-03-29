import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calculator, TrendingDown, ChevronDown, ChevronUp,
  Shield, Headphones, FileText, LayoutList, Zap, Banknote,
  Users, Building2, UserCheck, Globe,
  ClipboardCheck, BarChart3, Settings, LineChart, Award,
  Scale, ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── helpers ── */
const fmt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";

const fmtSaving = (n: number) => {
  if (n >= 0) return "";
  return (
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      .replace("-", "-") + " ₽"
  );
};

/* ── calculation engine (base: 10 people / 1 000 000 ₽ FOT) ── */
function calc(people: number, fot: number) {
  const pK = people / 10;
  const fK = fot / 1_000_000;

  // Затраты на выплату
  const zp_all = fot;
  const tax_staff = fot * 0.496552;
  const tax_smz = fot * 0.06383;
  const vacation_staff = fot * 0.119724;

  const pay_staff = zp_all + tax_staff + vacation_staff;
  const pay_smz = zp_all + tax_smz;

  // Документооборот (per person)
  const print_staff = 250 * pK;
  const print_smz = 1250 * pK;
  const send_staff = 833 * pK;
  const send_smz = 16250 * pK;
  const archive_staff = 83 * pK;
  const archive_smz = 333 * pK;

  const doc_staff = print_staff + send_staff + archive_staff;
  const doc_smz = print_smz + send_smz + archive_smz;
  const doc_timell = 0;

  // Обслуживание
  const salary_staff = 8543 * pK;
  const salary_smz = 17086 * pK;
  const salary_timell = 2563 * pK;
  const bank_staff = fot * 0.019395;
  const bank_smz = fot * 0.012766;
  const bank_timell = 0;
  const commission_timell = fot * 0.037234;

  const serv_staff = salary_staff + bank_staff;
  const serv_smz = salary_smz + bank_smz;
  const serv_timell = salary_timell + bank_timell + commission_timell;

  const total_staff = pay_staff + doc_staff + serv_staff;
  const total_smz = pay_smz + doc_smz + serv_smz;
  const total_timell = pay_smz + doc_timell + serv_timell;

  return {
    pay: {
      staff: pay_staff,
      smz: pay_smz,
      timell: pay_smz,
      details: [
        { label: "Затраты на всех", staff: zp_all, smz: zp_all, timell: zp_all },
        { label: "Налоги", staff: tax_staff, smz: tax_smz, timell: tax_smz },
        { label: "Отпуска и б/л", staff: vacation_staff, smz: 0, timell: 0 },
      ],
    },
    doc: {
      staff: doc_staff,
      smz: doc_smz,
      timell: doc_timell,
      details: [
        { label: "Печать документов", staff: print_staff, smz: print_smz, timell: 0 },
        { label: "Пересылка", staff: send_staff, smz: send_smz, timell: 0 },
        { label: "Архивирование", staff: archive_staff, smz: archive_smz, timell: 0 },
      ],
    },
    serv: {
      staff: serv_staff,
      smz: serv_smz,
      timell: serv_timell,
      details: [
        { label: "Зарплата работника кадров и бухгалтера", staff: salary_staff, smz: salary_smz, timell: salary_timell },
        { label: "Банковская комиссия", staff: bank_staff, smz: bank_smz, timell: bank_timell },
        { label: "Комиссия сервиса", staff: 0, smz: 0, timell: commission_timell },
      ],
    },
    total: { staff: total_staff, smz: total_smz, timell: total_timell },
  };
}

/* ── collapsible group ── */
const GroupRow = ({
  label,
  staff,
  smz,
  timell,
  details,
}: {
  label: string;
  staff: number;
  smz: number;
  timell: number;
  details: { label: string; staff: number; smz: number; timell: number }[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-border cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="p-4 font-semibold text-foreground flex items-center gap-2">
          {label}
          {open ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
        </div>
        <div className="p-4 text-right font-semibold">{fmt(staff)}</div>
        <div className="p-4 text-right font-semibold">{fmt(smz)}</div>
        <div className="p-4 text-right font-semibold">{fmt(timell)}</div>
      </div>
      {open &&
        details.map((d, i) => (
          <div
            key={i}
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-border bg-muted/20"
          >
            <div className="p-4 pl-8 text-sm text-muted-foreground">{d.label}</div>
            <div className="p-4 text-right text-sm">{fmt(d.staff)}</div>
            <div className="p-4 text-right text-sm">{fmt(d.smz)}</div>
            <div className="p-4 text-right text-sm">{fmt(d.timell)}</div>
          </div>
        ))}
    </>
  );
};

/* ── page ── */
const FotCalculator = () => {
  const [people, setPeople] = useState(10);
  const [fot, setFot] = useState(1000000);
  const [executorCount, setExecutorCount] = useState("");

  const r = calc(Math.max(people, 1), Math.max(fot, 1));

  const formatInput = (n: number) =>
    n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";

  const parseInput = (v: string) => parseInt(v.replace(/\D/g, "")) || 0;

  const savingSmz = r.total.smz - r.total.staff;
  const savingTimell = r.total.timell - r.total.staff;

  const features = [
    { icon: Shield, title: "Безопасность", desc: "Проводите выплаты физлицам, самозанятым и ИП легально и просто." },
    { icon: Headphones, title: "Клиентская поддержка", desc: "Персональный менеджер поможет с регистрацией и настройкой вашего Личного кабинета." },
    { icon: FileText, title: "Документооборот", desc: "Получайте все закрывающие документы в ЛК клиента или через ЭДО." },
    { icon: LayoutList, title: "Работа с реестрами", desc: "Проводите выплаты единым реестром или отдельными поручениями." },
    { icon: Zap, title: "Автоматизация", desc: "Автоматическая проверка налогового статуса перед каждой выплатой." },
    { icon: Banknote, title: "Массовые выплаты", desc: "Моментальные выплаты на карту или расчётный счёт любого банка РФ." },
  ];

  const statuses = [
    { icon: Users, title: "Самозанятые (НПД)", desc: "Автоматическая проверка статуса, оплата НПД и генерация чеков" },
    { icon: Building2, title: "Индивидуальные предприниматели", desc: "Поддержка всех режимов налогообложения (УСН, ОСН, ПСН)" },
    { icon: UserCheck, title: "Физлица по ГПХ", desc: "Расчет НДФЛ (13%) и взносов, формирование всех документов" },
    { icon: Globe, title: "Иностранные граждане", desc: "Поддержка исполнителей из стран ЕАЭС и СНГ" },
  ];

  const faqItems = [
    { q: "Как рассчитывается комиссия Timell?", a: "Комиссия рассчитывается индивидуально в зависимости от количества исполнителей, среднего размера выплат, частоты выплат, типа налогового статуса и выбранного пакета услуг." },
    { q: "Какие расходы включены в расчёт?", a: "В расчёт включены: затраты на выплату (зарплата, налоги, взносы), документооборот (оформление договоров, актов, чеков) и обслуживание (работа с платформой, поддержка, интеграция)." },
    { q: "Почему выплаты через Timell дешевле?", a: "Timell автоматизирует все процессы: снижает трудозатраты на 80%, исключает ошибки в расчётах, оптимизирует налоговые расходы и позволяет масштабировать бизнес без увеличения штата." },
    { q: "Какой минимальный размер ФОТ?", a: "Нет минимального размера ФОТ. Timell работает с компаниями любого размера, от стартапов до крупных корпораций." },
    { q: "Как часто обновляется калькулятор?", a: "Калькулятор обновляется ежемесячно в соответствии с изменениями налоговых ставок и комиссий. Все расчёты актуальны на текущую дату." },
    { q: "Можно ли получить детальный расчёт?", a: "Да, после заполнения формы вы получите детальный расчёт с разбивкой по всем статьям расходов и рекомендациями по оптимизации." },
  ];

  const steps = [
    { num: "01", title: "Введите данные", desc: "Укажите количество исполнителей и средний размер ФОТ в месяц." },
    { num: "02", title: "Просмотрите результаты", desc: "Система рассчитает расходы для трёх вариантов: штат, СМЗ без Timell, СМЗ через Timell." },
    { num: "03", title: "Оцените экономию", desc: "Сравните расходы и увидьте, сколько вы сэкономите, используя Timell." },
    { num: "04", title: "Получите консультацию", desc: "Заполните форму, и наши менеджеры свяжутся с вами для подробного обсуждения." },
  ];

  const metrics = [
    { value: "5 000+", label: "компаний" },
    { value: "500 000+", label: "исполнителей" },
    { value: "10 млн+", label: "выплат в месяц" },
    { value: "99.9%", label: "успешных платежей" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ── */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              Калькулятор затрат на <span className="text-primary">ФОТ</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Рассчитайте расходы на выплаты сотрудникам в штате и самозанятым исполнителям
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>
              Рассчитать экономию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative w-72 h-72 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
              <Calculator className="h-32 w-32 text-primary relative z-10" />
              <TrendingDown className="absolute top-8 right-4 h-12 w-12 text-secondary" />
              <BarChart3 className="absolute bottom-8 left-4 h-12 w-12 text-primary/60" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section id="calculator" className="py-20">
        <div className="container max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">Интерактивный калькулятор</h2>

          {/* Inputs */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Количество человек</label>
              <Input
                value={formatInput(people)}
                onChange={(e) => setPeople(parseInput(e.target.value))}
                className="text-lg h-12"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">ФОТ*</label>
              <Input
                value={formatInput(fot)}
                onChange={(e) => setFot(parseInput(e.target.value))}
                className="text-lg h-12"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-muted/50 border-b border-border text-sm font-bold">
              <div className="p-4">Ежемесячные расходы</div>
              <div className="p-4 text-right">Штат или ГПХ</div>
              <div className="p-4 text-right">СМЗ без Timell</div>
              <div className="p-4 text-right text-primary">СМЗ через Timell</div>
            </div>

            <GroupRow label="Затраты на выплату" staff={r.pay.staff} smz={r.pay.smz} timell={r.pay.timell} details={r.pay.details} />
            <GroupRow label="Документооборот" staff={r.doc.staff} smz={r.doc.smz} timell={r.doc.timell} details={r.doc.details} />
            <GroupRow label="Обслуживание" staff={r.serv.staff} smz={r.serv.smz} timell={r.serv.timell} details={r.serv.details} />

            {/* ИТОГО */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-muted/30">
              <div className="p-4 font-bold text-lg">ИТОГО</div>
              <div className="p-4 text-right font-bold text-lg">{fmt(r.total.staff)}</div>
              <div className="p-4 text-right">
                <div className="font-bold text-lg">{fmt(r.total.smz)}</div>
                {savingSmz < 0 && <div className="text-sm text-green-600">{fmtSaving(savingSmz)}</div>}
              </div>
              <div className="p-4 text-right">
                <div className="font-bold text-lg text-primary">{fmt(r.total.timell)}</div>
                {savingTimell < 0 && <div className="text-sm text-secondary font-semibold">{fmtSaving(savingTimell)}</div>}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            * Реальный размер расходов может отличаться. Размер комиссии Timell рассчитывается индивидуально.
          </p>
        </div>
      </section>

      {/* ── Lead form ── */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold font-display text-center mb-2">Рассчитать размер комиссии Timell</h2>
            <p className="text-muted-foreground text-center mb-8">Заполните форму, чтобы получить индивидуальный расчёт</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Input placeholder="Ваше имя" />
              <Input placeholder="Компания" />
              <Input placeholder="Номер телефона" type="tel" />
              <Input placeholder="E-mail" type="email" />
            </div>
            <p className="text-sm font-medium mb-3">Сколько у вас исполнителей?</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["До 10", "11–50", "51–200", "201+", "Я сам исполнитель"].map((opt) => (
                <button
                  key={opt}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${executorCount === opt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
                  onClick={() => setExecutorCount(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">
              Рассчитать
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Отправляя форму, вы соглашаетесь с <a href="#" className="underline">Политикой конфиденциальности</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">Возможности платформы Timell</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                <f.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tax statuses ── */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Поддерживаем все налоговые статусы
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {statuses.map((s, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HR Audit ── */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">Проводим бесплатный HR-аудит</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Анализируем ваши процессы работы с внештатным персоналом и предлагаем оптимальные решения
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {["Анализ текущих расходов", "Выявление скрытых издержек", "Рекомендации по оптимизации", "Расчёт потенциальной экономии", "Подбор оптимального тарифа"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <ClipboardCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Клининг", "Аутсорсинг", "Логистика", "Мерчандайзинг", "Фудтех", "Образование", "IT-фриланс", "Хорека"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full text-sm bg-primary/10 text-primary font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to use ── */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">Как использовать калькулятор ФОТ</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4">
                <span className="text-4xl font-bold text-primary/20 font-display">{s.num}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison cards ── */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">Сравнение вариантов работы с персоналом</h2>
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Штат", subtitle: "Традиционный подход", cost: "≈ 16.5 млн ₽/мес*", color: "border-destructive/40", items: ["Полная ответственность за сотрудников", "Высокие расходы на зарплату и взносы", "Сложный процесс увольнения"] },
              { title: "СМЗ без Timell", subtitle: "Ручной процесс", cost: "≈ 11.5 млн ₽/мес*", color: "border-border", items: ["Ручная проверка статуса", "Ручной расчёт налогов", "Высокий риск ошибок"] },
              { title: "СМЗ через Timell", subtitle: "Автоматизация", cost: "≈ 10.9 млн ₽/мес*", color: "border-primary", items: ["Автоматическая проверка статуса", "Автоматический расчёт налогов", "Минимальный риск ошибок", "Полная прозрачность"] },
            ].map((v, i) => (
              <div key={i} className={`bg-card rounded-2xl border-2 ${v.color} p-6 ${i === 2 ? "shadow-lg ring-1 ring-primary/20" : ""}`}>
                <h3 className="font-bold text-xl mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{v.subtitle}</p>
                <div className={`text-2xl font-bold mb-4 ${i === 2 ? "text-primary" : ""}`}>{v.cost}</div>
                <ul className="space-y-2">
                  {v.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${i === 2 ? "bg-primary" : "bg-muted-foreground"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">* При 200 исполнителях и ФОТ 10 000 000 ₽</p>
        </div>
      </section>

      {/* ── Advantages ── */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">Почему компании выбирают Timell</h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: LineChart, title: "Экономия на ФОТ", desc: "До 35% экономии благодаря автоматизации и оптимизации налоговых расходов." },
              { icon: Settings, title: "Масштабируемость", desc: "Работайте с 10 или 10 000 исполнителей — система справляется с любым объёмом." },
              { icon: Scale, title: "Юридическая безопасность", desc: "Все операции в соответствии с требованиями ФНС. Timell — официальный партнёр ФНС." },
            ].map((a, i) => (
              <div key={i} className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">{a.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case study ── */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Как компания сэкономила 2 млн ₽ в месяц
          </h2>
          <div className="bg-card rounded-2xl border border-border p-8 lg:p-12">
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div><p className="text-sm text-muted-foreground">Компания</p><p className="font-bold">LogisticPro</p></div>
              <div><p className="text-sm text-muted-foreground">Исполнители</p><p className="font-bold">500 курьеров</p></div>
              <div><p className="text-sm text-muted-foreground">ФОТ</p><p className="font-bold">15 000 000 ₽/мес</p></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: "2.1 млн ₽", label: "экономия в месяц" },
                { value: "40 → 2 ч", label: "документооборот в неделю" },
                { value: "0 ошибок", label: "вместо 15-20" },
                { value: "1–2 часа", label: "вместо 5-7 дней" },
              ].map((m, i) => (
                <div key={i} className="bg-primary/5 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-primary">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">О компании Timell</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Онлайн-платформа для управления расходами на ФОТ при работе с внештатным персоналом. Официальный партнёр ФНС.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">{m.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Возникли вопросы?</h2>
          <p className="text-primary-foreground/80 mb-8">Оставьте заявку, и мы свяжемся с вами в течение рабочего дня</p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-12">
            Оставить заявку
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FotCalculator;
