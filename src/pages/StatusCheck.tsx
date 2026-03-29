import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Check, Clock, FileText, AlertTriangle, TrendingDown, UserX, Ban, ChevronDown, Building2, User, MapPin, Loader2, Briefcase, Calendar, Hash } from "lucide-react";
import heroImg from "@/assets/status-check/hero.png";
import { supabase } from "@/integrations/supabase/client";

const scenarios = [
  { icon: TrendingDown, title: "Превышение годового дохода", desc: "Если доход самозанятого превышает 2,4 млн рублей в год, он автоматически теряет статус плательщика НПД и должен перейти на другой налоговый режим." },
  { icon: UserX, title: "Добровольный отказ", desc: "Самозанятый может самостоятельно отказаться от статуса плательщика НПД в приложении «Мой налог» или через ФНС." },
  { icon: Ban, title: "Нарушение условий", desc: "Если самозанятый нарушает условия применения НПД (например, работает по трудовому договору одновременно), ФНС может аннулировать его статус." },
  { icon: AlertTriangle, title: "Истечение срока регистрации", desc: "В некоторых случаях статус может быть аннулирован по инициативе ФНС из-за отсутствия активности или других причин." },
];

const activeVsLost = {
  active: [
    "Вы платите только вознаграждение исполнителю",
    "НПД (6%) платит сам исполнитель или платформа-партнёр ФНС",
    "Вы не являетесь налоговым агентом",
    "Минимальные налоговые риски",
    "Гибкое формирование ФОТ",
  ],
  lost: [
    "Вы становитесь налоговым агентом",
    "Вы обязаны удерживать НДФЛ (13%) и взносы (~30%)",
    "Вы должны сдавать отчёты в ФНС и ПФР",
    "Вы несёте ответственность за налоговые платежи",
    "Значительное увеличение издержек на исполнителя",
  ],
};

const advantages = [
  { icon: Shield, title: "Защита от налоговых рисков", desc: "Система автоматически проверяет статус перед каждой выплатой. Если статус потерян, выплата не будет осуществлена, и вы будете уведомлены." },
  { icon: Clock, title: "Экономия времени", desc: "Вам не нужно вручную проверять статус каждого исполнителя. Это происходит автоматически в фоне." },
  { icon: FileText, title: "Полная документация", desc: "Система ведёт полный журнал проверок статуса для каждого исполнителя. Это подтверждение вашей добросовестности перед ФНС." },
];

const processSteps = [
  { num: "01", title: "Вы инициируете выплату", desc: "Вы загружаете список исполнителей с суммами для выплаты в личный кабинет Timell." },
  { num: "02", title: "Система запрашивает данные у ФНС", desc: "Timell как официальный партнёр ФНС автоматически проверяет статус каждого исполнителя в реальном времени." },
  { num: "03", title: "Система анализирует результаты", desc: "Система определяет, активен ли статус каждого плательщика НПД на момент выплаты." },
  { num: "04", title: "Система принимает решение", desc: "Если статус активен — выплата проводится. Если статус потерян — выплата блокируется, и вы получаете уведомление." },
  { num: "05", title: "Вы получаете отчёт", desc: "Полный отчёт о проверке статуса и результатах выплат доступен в личном кабинете." },
];

const integrationItems = [
  "Проверяет статус самозанятого",
  "Рассчитывает НПД (если статус активен)",
  "Депонирует средства налога",
  "Формирует все необходимые документы",
  "Уплачивает налог в ФНС",
];

const faq = [
  { q: "В чём выгода работы с платформой Timell?", a: "Timell автоматизирует всю рутину работы с самозанятыми: выплаты, налоги, документы, проверку статуса. Это экономит время и защищает вас от налоговых рисков." },
  { q: "Сколько стоит сервис Timell?", a: "Стоимость зависит от объёма выплат и количества исполнителей. Мы предлагаем гибкие тарифы, начиная с небольших сумм. Точную цену вы узнаете после консультации с менеджером." },
  { q: "Есть ли комиссия для исполнителей?", a: "Нет. Исполнители получают полную сумму вознаграждения. НПД (6%) платит сам исполнитель или берёт на себя платформа (в зависимости от договорённости)." },
  { q: "Кому можно проводить выплаты через платформу?", a: "Через Timell можно проводить выплаты самозанятым, физлицам по договорам ГПХ и индивидуальным предпринимателям." },
  { q: "Нужно ли заказчику перед выплатой проверять налоговый статус самозанятого?", a: "Нет, если вы используете Timell. Система проверяет статус автоматически перед каждой выплатой. Это защищает вас от налоговых рисков." },
  { q: "Как часто проверяется статус?", a: "Статус проверяется перед каждой выплатой в реальном времени. Вы также можете проверить статус вручную в любой момент через форму на этой странице." },
  { q: "Может ли платформа отслеживать бывших сотрудников?", a: "Да. Система может проверить, был ли человек вашим сотрудником, и помочь оформить его как самозанятого или ИП (в зависимости от ситуации и законодательства)." },
];

const StatusCheck = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [inn, setInn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    found: boolean;
    company?: {
      inn?: string; kpp?: string; name?: string; director?: string; directorPost?: string;
      address?: string; ogrn?: string; registrationDate?: string; liquidationDate?: string;
      okved?: string; status?: string; opf?: string; type?: string; employeeCount?: string;
    };
    message?: string;
  } | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inn || !/^\d{10,12}$/.test(inn)) {
      setError("ИНН должен содержать 10 или 12 цифр");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('check-inn', {
        body: { inn },
      });

      if (fnError) throw new Error(fnError.message);
      if (!data?.success) throw new Error(data?.error || 'Ошибка проверки');

      setResult({ found: data.found, company: data.company, message: data.message });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при проверке');
    } finally {
      setLoading(false);
    }
  };

  const c = result?.company;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Block 1: Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-accent/30">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight mb-4 text-foreground">
              Проверить статус самозанятого
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Узнайте информацию о компании или ИП по ИНН
            </p>

            {/* Check Form */}
            <form onSubmit={handleCheck} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">ИНН</label>
                <Input placeholder="Введите ИНН (10 или 12 цифр)" value={inn} onChange={(e) => { setInn(e.target.value.replace(/\D/g, '')); setError(null); setResult(null); }} maxLength={12} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Проверяем...</> : "Проверить по ИНН"}
              </Button>

              {error && (
                <div className="rounded-xl p-4 text-sm font-medium bg-destructive/10 text-destructive border border-destructive/20">
                  ⚠️ {error}
                </div>
              )}

              {result && !result.found && (
                <div className="rounded-xl p-4 text-sm font-medium bg-muted text-muted-foreground border border-border">
                  {result.message || 'Данные по указанному ИНН не найдены'}
                </div>
              )}

              {result?.found && c && (
                <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
                  {c.name && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Наименование</p>
                        <p className="font-semibold text-foreground">{c.name}</p>
                      </div>
                    </div>
                  )}
                  {c.director && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Руководитель</p>
                        <p className="font-medium text-foreground">{c.director}</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {c.inn && (
                      <div className="flex items-start gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">ИНН</p>
                          <p className="font-mono text-sm font-medium text-foreground">{c.inn}</p>
                        </div>
                      </div>
                    )}
                    {c.kpp && (
                      <div className="flex items-start gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">КПП</p>
                          <p className="font-mono text-sm font-medium text-foreground">{c.kpp}</p>
                        </div>
                      </div>
                    )}
                    {c.ogrn && (
                      <div className="flex items-start gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">ОГРН</p>
                          <p className="font-mono text-sm font-medium text-foreground">{c.ogrn}</p>
                        </div>
                      </div>
                    )}
                    {c.registrationDate && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Дата регистрации</p>
                          <p className="text-sm font-medium text-foreground">{c.registrationDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {c.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Адрес</p>
                        <p className="text-sm text-foreground">{c.address}</p>
                      </div>
                    </div>
                  )}
                  {c.activity && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Основной вид деятельности</p>
                        <p className="text-sm text-foreground">{c.activity}</p>
                      </div>
                    </div>
                  )}
                  {c.status && (
                    <div className="pt-2 border-t border-border">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        c.status.toLowerCase().includes('действ') ? 'bg-green-100 text-green-700' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {c.status.toLowerCase().includes('действ') ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {c.status}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
          <div className="flex justify-center">
            <img src={heroImg} alt="Проверка статуса самозанятого" className="w-full max-w-xs" />
          </div>
        </div>
      </section>

      {/* Block 3: Context */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-display mb-6">
            Когда и почему важно проверять статус самозанятого?
          </h2>
          <p className="opacity-90 leading-relaxed mb-6">
            Самозанятые — выгодные для бизнеса партнёры, однако контрагент-плательщик НПД может в любой момент потерять свой статус или отказаться от него. В этом случае заказчик становится налоговым агентом самозанятого и по всем выплачиваемым ему суммам обязан начислять и уплачивать налоги и взносы.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-primary-foreground/10 p-5">
              <h3 className="font-bold mb-2">⚠️ Риск потери денег</h3>
              <p className="text-sm opacity-90">Организациям и ИП выгодно работать с самозанятыми, но если плательщик НПД утрачивает право на специальный налоговый статус, заказчики могут потерять деньги.</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/10 p-5">
              <h3 className="font-bold mb-2">✅ Как избежать рисков</h3>
              <p className="text-sm opacity-90">Проверяйте статус самозанятого перед выплатой. Это займёт несколько секунд, но защитит вас от налоговых рисков и неожиданных расходов.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Scenarios */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            При каких обстоятельствах самозанятый может потерять статус
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {scenarios.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: Comparison */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Что происходит, если статус потерян
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border-2 border-green-300 bg-card p-6">
              <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                <Check className="h-5 w-5" /> Статус АКТИВЕН
              </h3>
              <ul className="space-y-3">
                {activeVsLost.active.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-destructive/30 bg-card p-6">
              <h3 className="text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Статус ПОТЕРЯН
              </h3>
              <ul className="space-y-3">
                {activeVsLost.lost.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 6: Advantages */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Почему автоматическая проверка статуса важна
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {advantages.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <a.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 7: Process */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Процесс автоматической проверки статуса в Timell
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.num} className="rounded-2xl border border-border bg-card p-5 text-center hover:shadow-lg transition-all">
                <span className="inline-flex w-10 h-10 rounded-xl bg-primary text-primary-foreground items-center justify-center font-bold text-sm mb-3">{step.num}</span>
                <h3 className="text-sm font-bold mb-1.5 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 8: Integration */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="rounded-2xl border border-primary/20 bg-accent/50 p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold font-display mb-4 text-foreground">
              Проверка статуса интегрирована с системой выплат
            </h2>
            <p className="text-muted-foreground mb-6">
              Проверка статуса — это не отдельный инструмент, а встроенная функция системы выплат Timell. Когда вы проводите выплату, система автоматически:
            </p>
            <ul className="space-y-3">
              {integrationItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-6">Всё это происходит в один клик, без вашего участия.</p>
          </div>
        </div>
      </section>

      {/* Block 9: About & Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-4">
            Timell — платформа для безопасной работы с самозанятыми
          </h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-10 max-w-2xl mx-auto text-center">
            {[
              "Автоматически оплачиваем НПД от лица самозанятого",
              "Интеграция по API и ЭДО",
              "Проводим выплаты по реквизитам или номеру карты",
              "Автоматически проверяем статус самозанятого",
              "Официальный партнёр ФНС",
              "Формируем чеки и закрывающие документы",
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
              <p className="text-muted-foreground mt-1 text-sm">проверок статуса в месяц</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-border" />
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary">99.9%</p>
              <p className="text-muted-foreground mt-1 text-sm">точность проверок</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 10: Download */}
      <section className="py-12">
        <div className="container max-w-3xl text-center">
          <p className="text-muted-foreground mb-4">Хотите узнать больше о системе проверки статуса и других возможностях Timell?</p>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Скачать презентацию о платформе
          </Button>
        </div>
      </section>

      {/* Block 11: FAQ */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Вопросы и ответы
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
      </section>

      {/* Block 12: Lead Form */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-lg">
            <h2 className="text-2xl lg:text-3xl font-bold font-display text-center mb-2">
              Автоматизируйте документооборот, выплаты и проверку статуса самозанятых
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Оставьте заявку, мы свяжемся и подробно расскажем о всех возможностях нашей платформы.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" />
              <Input placeholder="Компания" />
              <Input placeholder="Номер телефона" />
              <Input placeholder="E-mail" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Сколько у вас исполнителей?</p>
                <div className="flex flex-wrap gap-3">
                  {["До 10", "11–50", "51–200", "201 и более", "Я сам исполнитель"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="radio" name="count" className="accent-primary" /> {opt}
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

export default StatusCheck;
