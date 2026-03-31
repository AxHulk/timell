import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, Handshake, DollarSign, HeartHandshake, Users, Briefcase, GraduationCap, BarChart3, Headphones, Gift, BookOpen, UserCheck } from "lucide-react";
import heroImg from "@/assets/partner/hero.png";
import faqImg from "@/assets/partner/faq.png";

const steps = [
  { num: "01", title: "Вы приводите нового клиента", desc: "Вы рекомендуете платформу Timell своему контакту, другу, коллеге или клиенту — компании, которой нужна автоматизация работы с внештатниками." },
  { num: "02", title: "Менеджеры проводят презентацию", desc: "Наша команда проводит персональную презентацию платформы, отвечает на вопросы и помогает клиенту разобраться." },
  { num: "03", title: "Клиент начинает работать", desc: "Клиент создаёт аккаунт на платформе Timell и начинает проводить выплаты внештатникам через нашу систему." },
  { num: "04", title: "Вы получаете вознаграждение", desc: "Вы получаете комиссию в зависимости от оборота приведённого клиента. Пока клиент активен — вы получаете деньги." },
];

const faq = [
  { q: "Как юридически оформлено сотрудничество?", a: "Между платформой Timell и партнёром заключается агентский договор, по которому Timell выступает Принципалом, а вы — Агентом. Это стандартная схема, защищающая обе стороны." },
  { q: "Как часто выплачивается вознаграждение?", a: "Вознаграждение выплачивается раз в квартал. Сумма рассчитывается на основе оборота привлечённых клиентов." },
  { q: "Сколько денег я заработаю?", a: "Размер вознаграждения зависит от оборота приведённого вами клиента. Чем больше выплат проводит клиент, тем больше вы зарабатываете. Пока клиент активен — вы получаете деньги." },
  { q: "Есть ли минимальный размер комиссии?", a: "Нет минимального размера. Даже при небольших объёмах вы получите вознаграждение. Но чем больше клиент растёт, тем больше вы зарабатываете." },
  { q: "Нужно ли мне поддерживать клиента после подключения?", a: "Нет. Вся поддержка и обслуживание клиента — ответственность команды Timell. Вы просто приводите клиента." },
  { q: "Могу ли я привлечь несколько клиентов?", a: "Да! Вы можете привлекать неограниченное количество клиентов. Чем больше — тем больше заработок." },
];

const benefits = [
  { icon: DollarSign, title: "Пассивный доход", desc: "Привлеките клиента один раз и получайте комиссию каждый квартал, пока клиент активен." },
  { icon: HeartHandshake, title: "Без ответственности за поддержку", desc: "Наша команда проводит презентацию, обучение и техническую поддержку. Ваша задача — только привести клиента." },
  { icon: BarChart3, title: "Неограниченный потенциал заработка", desc: "Нет ограничений на количество клиентов или размер комиссии. Доход зависит только от вашей активности." },
];

const partnerTypes = [
  { icon: Users, title: "HR-консультанты и кадровые агентства", desc: "Если вы помогаете компаниям с кадровыми вопросами, Timell — идеальное решение для ваших клиентов." },
  { icon: Briefcase, title: "Бизнес-консультанты и коучи", desc: "Если вы консультируете предпринимателей по оптимизации затрат, Timell поможет клиентам снизить издержки." },
  { icon: GraduationCap, title: "Аутсорсинговые компании и подрядчики", desc: "Работаете с внештатниками? Рекомендуйте Timell своим клиентам и партнёрам." },
];

const partnerPerks = [
  { icon: UserCheck, title: "Персональный менеджер", desc: "Вам будет назначен менеджер партнёрской программы для поддержки." },
  { icon: BookOpen, title: "Маркетинговые материалы", desc: "Презентации, кейсы, видео и другие материалы для продвижения платформы." },
  { icon: GraduationCap, title: "Обучение и вебинары", desc: "Регулярные вебинары помогут лучше понять функционал платформы." },
  { icon: BarChart3, title: "Прозрачная статистика", desc: "Личный кабинет с информацией о клиентах и заработанных комиссиях." },
  { icon: Headphones, title: "Приоритетная поддержка", desc: "Приоритетный доступ к технической поддержке и менеджерам Timell." },
  { icon: Gift, title: "Бонусные программы", desc: "Дополнительные бонусы за привлечение крупных клиентов и достижение целей." },
];

const joinSteps = [
  { num: "01", title: "Оставьте заявку", desc: "Заполните форму обратной связи и укажите, почему вы хотите стать партнёром." },
  { num: "02", title: "Обсудите условия", desc: "Наш менеджер свяжется с вами, расскажет о условиях и ответит на все вопросы." },
  { num: "03", title: "Подпишите договор", desc: "После согласования условий мы подпишем агентский договор, и вы сможете начать." },
];

const PartnerProgram = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [consentPd, setConsentPd] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight mb-6 text-foreground">
              Партнёрская программа Timell
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Станьте партнёром нашей платформы, приводите клиентов и зарабатывайте, не тратя время на дальнейшую поддержку клиентов
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Стать партнёром
            </Button>
          </div>
          <div className="flex justify-center">
            <img src={heroImg} alt="Партнёрская программа" className="w-full max-w-xs" />
          </div>
        </div>
      </section>

      {/* Main offer */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container max-w-4xl text-center">
          <Handshake className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <p className="text-lg opacity-90 leading-relaxed">
            Партнёрская программа Timell — это простой способ зарабатывать на привлечении новых клиентов. Вы приводите клиента, мы его обслуживаем, вы получаете комиссию. Никакой дополнительной работы, никакой ответственности за поддержку.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Как работает партнёрская программа
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

      {/* FAQ */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-8">
                Часто задаваемые вопросы
              </h2>
              <div className="space-y-3">
                {faq.map((item, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-foreground"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {item.q}
                      <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-2 justify-center pt-16">
              <img src={faqImg} alt="FAQ" className="w-full max-w-[240px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Почему стоит стать партнёром Timell
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((b) => (
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

      {/* Partner types */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Кто может стать партнёром Timell
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {partnerTypes.map((t) => (
              <div key={t.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <t.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">{t.title}</h3>
                <p className="text-muted-foreground text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What partners get */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Что вы получаете как партнёр
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partnerPerks.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
            Timell — платформа для безопасной работы с внештатниками
          </h2>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground mb-10 max-w-2xl mx-auto">
            {[
              "Автоматически оплачиваем НПД",
              "Интеграция по API и ЭДО",
              "Выплаты по реквизитам или карте",
              "Проверка статуса самозанятого",
              "Официальный партнёр ФНС",
              "Чеки и закрывающие документы",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs">
                <Check className="h-3 w-3 text-primary" /> {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary">10 000+</p>
              <p className="text-muted-foreground mt-1 text-sm">компаний используют Timell</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-border" />
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary">500 000+</p>
              <p className="text-muted-foreground mt-1 text-sm">документов в месяц</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-border" />
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary">99.9%</p>
              <p className="text-muted-foreground mt-1 text-sm">успешных платежей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section className="py-12">
        <div className="container max-w-3xl text-center">
          <p className="text-muted-foreground mb-4">Хотите узнать больше? Скачайте презентацию и покажите её вашим потенциальным клиентам.</p>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Скачать презентацию о платформе
          </Button>
        </div>
      </section>

      {/* Join steps */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Как присоединиться к партнёрской программе
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {joinSteps.map((s) => (
              <div key={s.num} className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg transition-all">
                <span className="inline-flex w-10 h-10 rounded-xl bg-primary text-primary-foreground items-center justify-center font-bold text-sm mb-3">{s.num}</span>
                <h3 className="text-sm font-bold mb-1.5 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-lg">
            <h2 className="text-2xl lg:text-3xl font-bold font-display text-center mb-2">
              Остались вопросы?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Оставьте заявку, и мы свяжемся с вами и подробно расскажем обо всех условиях партнёрской программы.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" />
              <Input placeholder="Номер телефона" />
              <Input placeholder="E-mail" />
              <Input placeholder="Ваша сфера деятельности" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Как вы узнали о партнёрской программе?</p>
                <div className="flex flex-wrap gap-3">
                  {["Интернет", "Друзья", "Реклама", "Другое"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="radio" name="source" className="accent-primary" /> {opt}
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Отправить
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Отправляя форму, вы соглашаетесь с Политикой конфиденциальности.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnerProgram;
