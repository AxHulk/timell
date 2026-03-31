import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { useState } from "react";
import {
  HardHat, ClipboardList, ShieldCheck, FileText, Users, Headphones,
  CheckCircle2, X, Check, Hammer, Wrench, Zap, Droplets, Building2,
  Shovel, Trash2, PaintBucket, Clock, TrendingDown, Shield,
  ArrowRight, AlertTriangle, Calculator, Globe, Timer
} from "lucide-react";

const features = [
  { icon: ClipboardList, title: "Задания", desc: "Помогаем выстроить работу с исполнителями от публикации заданий до расчёта по ним. Строитель видит задание, берёт его и выполняет работу." },
  { icon: FileText, title: "Работа с реестрами", desc: "Вы сами выбираете, как производить оплату — по отдельным поручениям или с помощью загрузочного реестра. Просто загрузите файл с данными." },
  { icon: ShieldCheck, title: "Проверка статуса СМЗ", desc: "Платформа автоматически проверяет налоговый статус исполнителя перед каждой выплатой за строительные работы." },
  { icon: FileText, title: "Документооборот", desc: "Автоматизируйте документооборот при выплатах строителям. Все закрывающие документы, договоры, чеки и акты доступны в Личном кабинете." },
  { icon: Users, title: "Онбординг исполнителей", desc: "Поможем исполнителям зарегистрироваться на платформе и получить статус плательщика НПД. Колл-центр всегда готов помочь." },
  { icon: Headphones, title: "Клиентская поддержка", desc: "Поможем с подключением сервиса под запросы вашего бизнеса. Расскажем, как настроить платёжные процессы для строительной отрасли." },
];

const steps = [
  { num: "01", title: "Регистрация", desc: "Строитель создаёт аккаунт, указывает реквизиты (карта или расчётный счёт) и налоговый статус (самозанятый, ИП, физлицо)." },
  { num: "02", title: "Проверка статуса", desc: "Timell автоматически проверяет статус строителя в ФНС. Если статус потерян — система уведомляет об этом." },
  { num: "03", title: "Задание на стройку", desc: "Вы публикуете задание на платформе (например, «Кровельные работы» или «Монтаж окон»), указываете объём работ, сроки и размер вознаграждения." },
  { num: "04", title: "Выполнение работы", desc: "Строитель берёт задание, выполняет строительные работы и отправляет подтверждение (фото, отчёт) на проверку." },
  { num: "05", title: "Выплата и документы", desc: "После принятия работы система автоматически рассчитывает налоги, проводит платёж на карту или счёт, генерирует чек и акт." },
];

const comparison = [
  { without: "Строитель отправляет счёт вручную", with: "Строитель отправляет результат через платформу" },
  { without: "Вы вручную проверяете статус в ФНС", with: "Система автоматически проверяет статус" },
  { without: "Вы вручную рассчитываете налоги", with: "Система автоматически рассчитывает налоги" },
  { without: "Вы вручную создаёте платёжное поручение", with: "Система автоматически создаёт платёж" },
  { without: "Вы вручную отправляете деньги через банк", with: "Система автоматически отправляет деньги" },
  { without: "Вы вручную создаёте акт и чек", with: "Система автоматически создаёт акт и чек" },
  { without: "Время на одного строителя: 45–90 минут", with: "Время на одного строителя: 3–5 минут" },
  { without: "Риск ошибок: высокий", with: "Риск ошибок: минимальный" },
  { without: "Строитель ждёт платёж 5–7 дней", with: "Строитель получает платёж за 1–2 часа" },
];

const specifics = [
  { icon: ShieldCheck, title: "Проверка статуса СМЗ", desc: "Сотрудничество с физлицами, утратившими статус самозанятого, влечёт доначисление налогов. Timell проверяет статус перед каждой выплатой." },
  { icon: FileText, title: "Работа через реестры", desc: "Удобная работа через загрузочные файлы (реестры) для оплаты самозанятым строителям, а также физлицам по ГПХ и ИП." },
  { icon: HardHat, title: "Субподрядчики и подрядчики", desc: "Платформа позволяет автоматизировать взаимодействие с самозанятыми при строительных работах — рассчитывайтесь с каждым субподрядчиком." },
  { icon: ArrowRight, title: "Выплаты на карту или счёт", desc: "Строитель сам выбирает, как получить платёж: на карту (быстро) или на расчётный счёт (для ИП). Timell поддерживает оба варианта." },
];

const taxStatuses = [
  { icon: CheckCircle2, title: "Самозанятые — плательщики НПД", desc: "Система автоматически проверяет статус, оплачивает НПД и генерирует чеки." },
  { icon: Building2, title: "Индивидуальные предприниматели", desc: "Поддержка всех режимов налогообложения (УСН, ОСН, ПСН, ЕНВД)." },
  { icon: Users, title: "Физические лица по договорам ГПХ", desc: "Расчёт НДФЛ (13%) и взносов, формирование всех документов." },
  { icon: Globe, title: "Иностранные граждане", desc: "Поддержка работы с иностранными строителями из стран ЕАЭС и СНГ." },
];

const workTypes = [
  { icon: HardHat, label: "Кровельные работы" },
  { icon: Building2, label: "Монтаж окон" },
  { icon: PaintBucket, label: "Отделочные работы" },
  { icon: Zap, label: "Электромонтаж" },
  { icon: Droplets, label: "Сантехнические работы" },
  { icon: Hammer, label: "Фасадные работы" },
  { icon: Shovel, label: "Земляные работы" },
  { icon: Trash2, label: "Демонтажные работы" },
  { icon: Wrench, label: "Ремонтные работы" },
];

const risks = [
  { icon: AlertTriangle, title: "Потеря статуса СМЗ", desc: "Автоматическая проверка налогового статуса обеспечит защиту от непредвиденных налоговых начислений." },
  { icon: Calculator, title: "Ошибки в расчётах", desc: "Система автоматически рассчитывает налоги и формирует документы. Это исключает ошибки и штрафы от ФНС." },
  { icon: Shield, title: "Нарушение законодательства", desc: "Все операции проводятся в соответствии с требованиями ФНС и законодательством РФ. Платформа — официальный партнёр ФНС." },
];

const ConstructionPayments = () => {
  const [executorCount, setExecutorCount] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-accent/30">
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display leading-tight text-foreground">
              Выплаты самозанятым за{" "}
              <span className="text-primary">строительные работы</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              С закрывающими документами, на карту или расчётный счёт
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-base px-8">Обсудить ваш кейс</Button>
              <Button size="lg" variant="outline" className="text-base px-8 border-secondary text-secondary hover:bg-secondary/10">
                Попробовать бесплатно
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-primary/10 flex items-center justify-center">
              <HardHat className="h-32 w-32 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Main offer */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <HardHat className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Timell — это платформа для выплат самозанятым строителям, субподрядчикам и другим специалистам в сфере строительства. Автоматизируем документооборот, проверяем статус в ФНС, формируем чеки и акты — всё в одном сервисе.
            </p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Возможности платформы Timell для строительных компаний
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-16">
            Как работает система выплат для строителей
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-6 items-start p-6 rounded-2xl border border-border bg-card">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Преимущества для строительной компании
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Надёжные транзакции", desc: "Обеспечиваем надёжные транзакции, быструю проверку статуса в ФНС и оформление документов при сотрудничестве с самозанятыми строителями." },
              { title: "Полная прозрачность", desc: "Вся история платежей, договоры, чеки и акты всегда доступны в Личном кабинете. Вы можете учитывать каждую статью расходов." },
              { title: "Качество сотрудничества", desc: "Повысьте качество сотрудничества с субподрядчиками за счёт автоматической проверки статуса, оформления документации и контроля расчётов." },
            ].map((a) => (
              <div key={a.title} className="p-6 rounded-2xl border border-border bg-card text-center">
                <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Как меняется работа строительной компании
          </h2>
          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-2 text-sm font-bold">
              <div className="p-4 bg-destructive/10 border-b border-border text-center">Без Timell</div>
              <div className="p-4 bg-primary/10 border-b border-border text-center">С Timell</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-2 text-sm border-b last:border-b-0 border-border">
                <div className="p-4 flex items-start gap-2 text-muted-foreground">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  {row.without}
                </div>
                <div className="p-4 flex items-start gap-2 text-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  {row.with}
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
            Особенности работы со строителями на платформе
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {specifics.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-border bg-card">
                <s.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax statuses */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Поддерживаем все налоговые статусы и гражданства
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {taxStatuses.map((t) => (
              <div key={t.title} className="p-6 rounded-2xl border border-border bg-card text-center">
                <t.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-base font-bold mb-2 text-foreground">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work types */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Платформа работает со всеми видами строительных работ
          </h2>
          <p className="text-muted-foreground mb-10">
            Независимо от типа работ, если вы работаете со строителями, Timell поможет с выплатами
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 max-w-5xl mx-auto">
            {workTypes.map((w) => (
              <div key={w.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                <w.icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium text-foreground">{w.label}</span>
              </div>
            ))}
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
              <div key={r.title} className="p-6 rounded-2xl border border-border bg-card text-center">
                <r.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-foreground">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-6">
            Интеграция с вашей системой управления
          </h2>
          <p className="text-muted-foreground mb-8">
            Timell интегрируется с популярными системами управления строительством (1С, Гарант, Консультант+, Smeta.ru) и системами управления проектами через открытый API. Все данные о выплатах и документах автоматически синхронизируются.
          </p>
          <Button size="lg" className="text-base">Узнать про интеграцию</Button>
        </div>
      </section>

      {/* Speed */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Выплаты за 1–2 часа
          </h2>
          <div className="p-8 rounded-2xl border border-border bg-card">
            <p className="text-muted-foreground text-center mb-8">
              Строитель завершает работу, вы одобряете результат, система автоматически рассчитывает налоги и проводит платёж. Всё за 1–2 часа вместо 5–7 дней.
            </p>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                { label: "Строитель завершает работу", time: "0 минут" },
                { label: "Вы одобряете результат", time: "10–30 минут" },
                { label: "Система рассчитывает налоги", time: "1 минута" },
                { label: "Система проводит платёж", time: "30–60 минут" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 rounded-lg bg-accent/50">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span className="text-sm font-bold text-primary">{item.time}</span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-sm font-bold text-foreground">Итого</span>
                <span className="text-sm font-bold text-primary">1–2 часа вместо 5–7 дней</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
            Сколько вы сэкономите
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Timer, metric: "80%", title: "Экономия времени", desc: "При работе с 50 строителями в месяц — это 30–60 сэкономленных часов." },
              { icon: TrendingDown, metric: "20–30%", title: "Снижение трудозатрат", desc: "Исключаются расходы на бумажный документооборот и ручную обработку платежей." },
              { icon: Shield, metric: "100%", title: "Защита от рисков", desc: "Полная защита от налоговых проверок благодаря корректному оформлению всех документов." },
            ].map((m) => (
              <div key={m.title} className="p-6 rounded-2xl border border-border bg-card text-center">
                <m.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-4xl font-extrabold text-primary mb-2">{m.metric}</div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
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
          <select
            value={executorCount}
            onChange={(e) => setExecutorCount(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-primary-foreground/10 border-primary-foreground/20 px-3 py-2 text-sm text-primary-foreground mb-4"
          >
            <option value="" className="text-foreground">Сколько у вас исполнителей?</option>
            <option value="10" className="text-foreground">До 10</option>
            <option value="50" className="text-foreground">От 11 до 50</option>
            <option value="200" className="text-foreground">От 51 до 200</option>
            <option value="200+" className="text-foreground">От 201 и более</option>
            <option value="self" className="text-foreground">Я сам исполнитель</option>
          </select>
          <Button size="lg" className="w-full sm:w-auto px-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-bold">
            Отправить
          </Button>
          <p className="text-xs text-primary-foreground/50 mt-4">
            Отправляя форму, вы соглашаетесь с{" "}
            <a href="/documents/privacy-policy" target="_blank" className="underline">Политикой конфиденциальности</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-display mb-4">
            Оставить заявку или запросить консультацию
          </h2>
          <p className="text-muted-foreground mb-8">
            Укажите ваши контакты, и мы свяжемся с вами в течение рабочего дня
          </p>
          <Button size="lg" className="text-base px-10">Оставить заявку</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConstructionPayments;
