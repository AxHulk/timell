import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  CheckSquare,
  FileText,
  Eye,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------- stats ---------- */
const stats = [
  { icon: Building2, value: "Более 50 000", label: "компаний-клиентов пользуются платформой" },
  { icon: Briefcase, value: "Более 200 000", label: "самозанятых, ИП и физлиц получают заказы через платформу" },
  { icon: TrendingUp, value: "Более 5 млрд ₽", label: "выплачено исполнителям за время работы платформы" },
  { icon: CheckSquare, value: "100 %", label: "документооборот и налоговые отчисления автоматизированы" },
];

/* ---------- industries ---------- */
const clientIndustries = [
  "Фудтех и доставка",
  "Логистика и грузоперевозки",
  "Мерчандайзинг и BTL",
  "Строительство и ремонт",
  "IT и фриланс",
  "Образование и репетиторство",
  "Аутсорсинг и call-центры",
  "Event-индустрия",
  "Складские услуги",
  "Маркетинг и реклама",
];

const executorTypes = [
  "Курьеры и водители",
  "Мерчандайзеры и промоутеры",
  "Строители и разнорабочие",
  "Грузчики и комплектовщики",
  "IT-специалисты и программисты",
  "Маркетологи и копирайтеры",
  "Репетиторы и тренеры",
  "Дизайнеры и креативщики",
  "Консультанты и аналитики",
  "Операторы и администраторы",
];

/* ---------- trust pillars ---------- */
const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Полная легальность",
    text: "Мы являемся официальным партнёром ФНС. Все операции соответствуют российскому законодательству. Автоматическая проверка статуса исполнителей перед каждой выплатой защищает вас от налоговых рисков и штрафов.",
  },
  {
    icon: FileText,
    title: "Полная автоматизация",
    text: "Договоры, акты, чеки, налоговые отчисления — всё генерируется автоматически. Вам не нужно вручную заполнять документы или рассчитывать налоги. Все данные хранятся в одном месте и готовы к выгрузке в 1С.",
  },
  {
    icon: Eye,
    title: "Полная прозрачность",
    text: "Модель эскроу гарантирует, что деньги безопасно хранятся на номинальных счетах до момента выполнения работы. Вы видите все операции в реальном времени и имеете полный контроль над расчётами.",
  },
];


/* ================================================================== */

const About = () => (
  <>
    <Header />

    {/* ---- Hero ---- */}
    <section className="relative overflow-hidden bg-primary/5 py-20 md:py-28">
      <div className="container flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight text-foreground">
            Timell — платформа для безопасной работы с&nbsp;внештатными исполнителями
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Мы автоматизируем расчёты, документооборот и налоговые отчисления для компаний, которые работают
            с самозанятыми, ИП и физическими лицами по договорам ГПХ.
          </p>
          <p className="text-muted-foreground max-w-2xl">
            Timell — это не агентство и не работодатель. Мы предоставляем программное обеспечение, которое
            берёт на себя всю бумажную и платёжную рутину. Наша платформа гарантирует полную легальность,
            безопасность и прозрачность всех расчётов через систему эскроу на номинальных счетах.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-20 h-20 md:w-28 md:h-28 text-primary" />
          </div>
        </div>
      </div>
    </section>

    {/* ---- History & Mission ---- */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="border-l-4 border-primary pl-8 max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">Наша история и миссия</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <p>
              Timell была создана в ответ на реальную проблему, с которой сталкиваются тысячи российских
              компаний: как легально и безопасно работать с большим количеством фрилансеров и временных
              работников, не рискуя переквалификацией в работодателей и не опасаясь блокировки расчётного
              счёта?
            </p>
            <div className="space-y-4">
              <p>
                Наша миссия — избавить бизнес от административной нагрузки и налоговых рисков. Мы верим,
                что компании должны сосредоточиться на развитии своего основного бизнеса, а не на
                заполнении документов и расчётах налогов.
              </p>
              <p>
                Timell работает по принципу полной прозрачности: все деньги хранятся на специальных
                номинальных счетах (эскроу), все документы генерируются автоматически, все налоги
                рассчитываются и перечисляются в соответствии с законом. Мы являемся официальным
                партнёром ФНС.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ---- Stats ---- */}
    <section className="py-16 bg-muted/40">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.value}
              className="bg-card border border-border rounded-2xl p-6 space-y-3"
            >
              <s.icon className="w-8 h-8 text-secondary" />
              <p className="text-2xl md:text-3xl font-bold font-display text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ---- Industries & Executors ---- */}
    <section className="py-16 md:py-24">
      <div className="container grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-bold font-display mb-2 text-foreground">Какие компании используют Timell?</h3>
          <p className="text-muted-foreground mb-6">
            Платформа подходит для любого бизнеса, который работает с большим числом внештатных исполнителей.
          </p>
          <div className="flex flex-wrap gap-2">
            {clientIndustries.map((i) => (
              <span key={i} className="rounded-full bg-primary/10 text-primary text-sm px-4 py-1.5 font-medium">{i}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold font-display mb-2 text-foreground">Кто работает через Timell?</h3>
          <p className="text-muted-foreground mb-6">
            На платформе зарегистрированы специалисты самых разных профессий:
          </p>
          <div className="flex flex-wrap gap-2">
            {executorTypes.map((e) => (
              <span key={e} className="rounded-full bg-secondary/10 text-secondary text-sm px-4 py-1.5 font-medium">{e}</span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ---- Trust Pillars ---- */}
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-12 text-foreground">
          Почему Timell — надёжный партнёр
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {trustPillars.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-2xl p-8 space-y-4">
              <p.icon className="w-10 h-10 text-primary" />
              <h3 className="text-lg font-bold font-display text-foreground">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ---- Contacts & Requisites ---- */}
    <section className="py-16 md:py-24">
      <div className="container grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">Свяжитесь с нами</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary flex-shrink-0" /> <span>Для бизнеса: <a href="mailto:info@timell.ru" className="text-primary hover:underline">info@timell.ru</a></span></li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary flex-shrink-0" /> <span>Для исполнителей: <a href="mailto:support@timell.ru" className="text-primary hover:underline">support@timell.ru</a></span></li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary flex-shrink-0" /> <span>Для партнёрства: <a href="mailto:partners@timell.ru" className="text-primary hover:underline">partners@timell.ru</a></span></li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary flex-shrink-0" /> <span>Для прессы: <a href="mailto:pr@timell.ru" className="text-primary hover:underline">pr@timell.ru</a></span></li>
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary flex-shrink-0" /> <a href="tel:+74852974060" className="text-primary hover:underline">8 (485) 29-74-060</a></li>
            <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary flex-shrink-0" /> <span>152612, Ярославская обл., г. Углич, мкр Солнечный 26а, кв. 4</span></li>
          </ul>
          <a
            href="https://t.me/timelltech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Телеграм-канал @timelltech <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">Реквизиты</h2>
          <div className="bg-muted/40 border border-border rounded-2xl p-6 text-sm text-muted-foreground space-y-2">
            <p><strong className="text-foreground">Полное наименование:</strong> Индивидуальный предприниматель Мосичев Фёдор Владимирович</p>
            <p><strong className="text-foreground">ИНН:</strong> 761203433802</p>
            <p><strong className="text-foreground">Р/с:</strong> 40802810916000001496</p>
            <p><strong className="text-foreground">Банк:</strong> АО «АЛЬФА-БАНК»</p>
            <p><strong className="text-foreground">БИК:</strong> 044525593</p>
            <p><strong className="text-foreground">К/с:</strong> 30101810200000000593</p>
            <p><strong className="text-foreground">Адрес:</strong> 152612, Россия, Ярославская область, Угличский район, г. Углич, мкр Солнечный 26а, кв. 4</p>
            <p><strong className="text-foreground">Сайт:</strong> <a href="https://timell.ru" className="text-primary hover:underline">https://timell.ru</a></p>
          </div>
        </div>
      </div>
    </section>

    {/* ---- Partners ---- */}
    <section className="py-16 bg-muted/40">
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-foreground">Наши партнёры и сертификаты</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Timell работает в тесном сотрудничестве с ведущими организациями и государственными структурами.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <span className="rounded-xl bg-card border border-border px-6 py-4 text-sm font-medium text-foreground">ФНС России</span>
          <span className="rounded-xl bg-card border border-border px-6 py-4 text-sm font-medium text-foreground">Минцифры России</span>
          <span className="rounded-xl bg-card border border-border px-6 py-4 text-sm font-medium text-foreground">АО «АЛЬФА-БАНК»</span>
        </div>
      </div>
    </section>

    {/* ---- Media ---- */}
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-10 text-foreground">Timell в СМИ</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {mediaArticles.map((a) => (
            <div key={a.title} className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-foreground">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.excerpt}</p>
              <span className="text-primary text-sm font-medium">Читать далее →</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ---- CTA ---- */}
    <section className="py-20 bg-primary/5">
      <div className="container text-center space-y-6">
        <h2 className="text-2xl md:text-4xl font-bold font-display text-foreground">Готовы избавиться от рутины?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Присоединитесь к тысячам компаний, которые уже автоматизировали работу с внештатными исполнителями через Timell.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/register">Начать бесплатно</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="mailto:info@timell.ru">Получить демо</a>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default About;
