import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { Shield, FileText, CreditCard, Calculator, Gift, ChevronRight, ChevronDown, Smartphone, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImg from "@/assets/freelancer-platform/intro_desktop.webp";

const steps = [
  { num: "01", title: "Быстрая регистрация", desc: "Зарегистрируйтесь на платформе Timell за 5 минут и заполните профиль." },
  { num: "02", title: "Интеграция с ФНС", desc: "Дайте разрешение в приложении «Мой налог» на подключение партнера Timell для автоматизации документов." },
  { num: "03", title: "Выполнение заданий", desc: "Получайте задачи от заказчиков, откликайтесь и отмечайте их выполнение прямо в личном кабинете." },
  { num: "04", title: "Гарантированная оплата", desc: "Как только заказчик подтверждает выполнение, деньги автоматически поступают на ваш счёт." },
];

const benefits = [
  { icon: Shield, title: "100% гарантия выплат", desc: "Деньги заказчика резервируются на номинальном счёте до начала работ. Вы точно получите оплату без задержек.", color: "text-primary" },
  { icon: FileText, title: "Никакой бюрократии", desc: "Платформа сама формирует чеки, акты выполненных работ и отправляет их заказчику автоматически.", color: "text-secondary" },
  { icon: CreditCard, title: "Удобный вывод средств", desc: "Получайте заработанные деньги на любую банковскую карту РФ в любое время 24/7.", color: "text-primary" },
  { icon: Calculator, title: "Автоматическая оплата налогов", desc: "Timell может автоматически рассчитывать и перечислять НПД в ФНС — вы никогда не пропустите платёж.", color: "text-secondary" },
  { icon: Gift, title: "Абсолютно бесплатно", desc: "Использование платформы для исполнителей полностью бесплатно — все комиссии оплачивает заказчик.", color: "text-primary" },
];

const faqs = [
  { q: "Кто может зарегистрироваться на платформе Timell?", a: "Самозанятые, ИП и физические лица по договорам ГПХ." },
  { q: "Нужно ли мне самому формировать чеки?", a: "Нет, если вы дали разрешение в приложении «Мой налог», Timell сформирует и отправит чек заказчику автоматически." },
  { q: "Сколько стоит использование платформы?", a: "Для исполнителей сервис полностью бесплатен." },
  { q: "Как быстро приходят деньги после выполнения задания?", a: "Деньги зачисляются на ваш баланс моментально после того, как заказчик примет работу. Вывести на карту можно в пару кликов." },
  { q: "Что делать, если заказчик не принимает работу?", a: "На платформе предусмотрен механизм арбитража для решения спорных ситуаций." },
];

const blogArticles = [
  { title: "Идёт ли трудовой стаж у самозанятого?", slug: "trudovoj-stazh-samozanyatogo" },
  { title: "Как самозанятому подтвердить свой доход для ипотеки", slug: "samozanyatyj-ipoteka-dokhod" },
  { title: "Можно ли совмещать работу по найму и статус НПД?", slug: "sovmeshchenie-najm-npd" },
];

const FreelancerPlatform = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6 leading-tight">
                Платформа для <span className="text-primary">самозанятых</span>, ИП и фрилансеров
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Работайте с проверенными компаниями легально и безопасно. Гарантированные выплаты, автоматические чеки и никакой бумажной волокиты — мы берём рутину на себя.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8">
                  Начать регистрацию
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Войти в кабинет
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img src={heroImg} alt="Исполнители Timell" className="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground text-center mb-4">
            4 простых шага к безопасной работе
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Начните получать заказы и гарантированные выплаты уже сегодня
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-background rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/20 mb-3 font-display">{step.num}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground text-center mb-12">
            Почему исполнители выбирают Timell
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-background rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 ${b.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-employed info */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                Ещё не самозанятый? Это просто!
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Самозанятость (НПД) — это официальный статус, который позволяет легально работать на себя с минимальными налогами (всего 6% при работе с компаниями). Подходит для граждан РФ и стран ЕАЭС. Официальный доход помогает получать кредиты и визы.
              </p>
              <h3 className="font-semibold text-foreground mb-3">Пошаговая инструкция:</h3>
              <ol className="space-y-3 mb-6">
                {[
                  "Скачайте официальное приложение ФНС «Мой налог»",
                  "Зарегистрируйтесь по паспорту или через портал Госуслуг",
                  "Подключите Timell в разделе «Партнёры»",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://npd.nalog.ru/" target="_blank" rel="noopener noreferrer">Подробнее на сайте ФНС</a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-[450px] bg-foreground/5 rounded-[2.5rem] border-4 border-foreground/10 p-3 shadow-xl">
                <div className="w-full h-full rounded-[2rem] bg-background flex flex-col items-center justify-center text-center p-6">
                  <Smartphone className="h-12 w-12 text-primary mb-4" />
                  <div className="text-lg font-bold text-foreground mb-1">Мой налог</div>
                  <div className="text-xs text-muted-foreground">Официальное приложение ФНС для самозанятых</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile section */}
      <section className="py-16 md:py-20">
        <div className="container text-center">
          <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-display text-foreground mb-4">Ваш офис в смартфоне</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Отслеживайте новые задания, проверяйте статус текущих работ, контролируйте баланс и выводите средства в удобном веб-интерфейсе, адаптированном под любые мобильные устройства.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Новые задания", desc: "Мгновенные уведомления" },
              { label: "Баланс", desc: "Контроль в реальном времени" },
              { label: "Вывод средств", desc: "На любую карту 24/7" },
            ].map((item) => (
              <div key={item.label} className="bg-muted/50 rounded-xl border border-border p-5">
                <div className="font-semibold text-foreground mb-1">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-display text-foreground flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Полезно знать
            </h2>
            <Button variant="outline" asChild>
              <Link to="/blog">Перейти в Базу знаний</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {blogArticles.map((a) => (
              <Link key={a.slug} to={`/blog/${a.slug}`} className="bg-background rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{a.title}</h3>
                <span className="text-sm text-primary flex items-center gap-1">
                  Читать <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold font-display text-foreground text-center mb-10">Часто задаваемые вопросы</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-background border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:text-primary transition-colors"
                >
                  {f.q}
                  <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground mb-4">
            Начните работать легально и безопасно уже сегодня
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Присоединяйтесь к тысячам исполнителей, которые уже доверяют Timell
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10">
            Зарегистрироваться бесплатно
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreelancerPlatform;
