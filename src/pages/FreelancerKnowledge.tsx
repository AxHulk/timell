import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Search, ChevronDown, UserPlus, CreditCard, Receipt, FileText, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularQuestions = [
  { q: "Как изменить реквизиты для выплат?", categoryIdx: 0, articleIdx: 4 },
  { q: "Почему деньги ещё не пришли?", categoryIdx: 1, articleIdx: 2 },
  { q: "Оплачивает ли Timell налог за меня?", categoryIdx: 2, articleIdx: 0 },
  { q: "Как подключить платформу в «Мой налог»?", categoryIdx: 0, articleIdx: 2 },
];

const categories = [
  {
    title: "Регистрация и настройка личного кабинета",
    desc: "Инструкции по созданию профиля и заполнению данных",
    icon: UserPlus,
    articles: [
      { q: "Регистрация для граждан РФ", a: "Пошаговая инструкция по регистрации по номеру телефона и заполнению паспортных данных." },
      { q: "Регистрация для граждан ЕАЭС и иностранцев", a: "Особенности регистрации нерезидентов: необходимые документы и порядок верификации." },
      { q: "Подключение Timell в партнёры в приложении «Мой налог»", a: "Обязательный шаг для автоматизации чеков. Откройте приложение «Мой налог» → раздел «Партнёры» → найдите Timell → нажмите «Подключить»." },
      { q: "Что означает статус «Ожидание проверки»?", a: "Это значит, что вы ещё не подтвердили подключение Timell в приложении «Мой налог». Зайдите в приложение ФНС, раздел «Партнёры», и дайте разрешение." },
      { q: "Как изменить номер телефона или ИНН?", a: "Смена данных происходит через службу поддержки для обеспечения безопасности аккаунта. Напишите в чат или создайте тикет." },
      { q: "Как исправить реквизиты банковской карты/счёта?", a: "В личном кабинете в разделе «Мои реквизиты». Важно: счёт должен принадлежать именно вам." },
    ],
  },
  {
    title: "Задания и получение выплат",
    desc: "Всё о том, как брать задачи в работу и получать деньги",
    icon: CreditCard,
    articles: [
      { q: "Как принять задание в работу?", a: "В разделе «Мои задания» нажмите кнопку «Откликнуться» или «Принять», если заказчик назначил вас напрямую." },
      { q: "Как получить выплату после выполнения?", a: "В Timell работает эскроу-модель. Как только заказчик нажимает «Принять работу», деньги с резервного счёта автоматически отправляются на ваши реквизиты." },
      { q: "Почему заказчик принял работу, а деньги не пришли?", a: "Обычно банковский перевод занимает от 1 до 15 минут. В редких случаях (в выходные или ночью) банк может обрабатывать платёж до 3 рабочих дней." },
      { q: "Что делать, если пришёл возврат по выплате?", a: "Проверьте правильность заполнения реквизитов (БИК, номер счёта) в профиле. Если карта заблокирована, укажите новые реквизиты." },
      { q: "Берёт ли Timell комиссию с исполнителей?", a: "Нет, использование платформы для исполнителей абсолютно бесплатно. Все комиссии оплачивает заказчик." },
    ],
  },
  {
    title: "Налоги и статус самозанятого (НПД)",
    desc: "Вопросы о налогах, чеках и статусе",
    icon: Receipt,
    articles: [
      { q: "Оплачивает ли Timell налог за меня?", a: "По умолчанию вы оплачиваете налог самостоятельно в приложении «Мой налог». Но вы можете включить функцию «Автоматическая оплата налогов» в настройках профиля Timell, и мы будем удерживать нужную сумму и переводить её в ФНС." },
      { q: "Почему сумма выплаты меньше, чем в задании?", a: "Если у вас включена автооплата налога, платформа автоматически удерживает 6% (или 4%) для перечисления в ФНС. На карту вы получаете чистый доход." },
    ],
  },
  {
    title: "Документооборот (ЭДО)",
    desc: "Как подписывать договоры и акты",
    icon: FileText,
    articles: [
      { q: "Как подписать договор с заказчиком?", a: "Договор подписывается в электронном виде с помощью простой электронной подписи (ПЭП) прямо в личном кабинете Timell. Вам придёт СМС-код для подтверждения." },
      { q: "Где найти подписанные акты выполненных работ?", a: "Все акты автоматически формируются после завершения задания и хранятся в разделе «Документы» в вашем профиле. Вы можете скачать их в любой момент." },
      { q: "Нужно ли отправлять бумажные оригиналы?", a: "Нет, электронные документы в Timell имеют полную юридическую силу." },
    ],
  },
];

const FreelancerKnowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  const lowerSearch = searchQuery.toLowerCase();
  const filteredCategories = searchQuery
    ? categories.map((cat) => ({
        ...cat,
        articles: cat.articles.filter(
          (a) => a.q.toLowerCase().includes(lowerSearch) || a.a.toLowerCase().includes(lowerSearch)
        ),
      })).filter((cat) => cat.articles.length > 0)
    : categories;

  const handlePopularClick = (pq: typeof popularQuestions[0]) => {
    setOpenCategory(pq.categoryIdx);
    setOpenArticle(categories[pq.categoryIdx].articles[pq.articleIdx].q);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-secondary rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-primary rotate-45" />
        </div>
        <div className="container relative text-center">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            База знаний для исполнителей
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Найдите ответы на все вопросы о работе с платформой Timell
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по базе знаний..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base bg-background border border-border rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </section>

      {/* Popular questions */}
      {!searchQuery && (
        <section className="py-10 -mt-8 relative z-10">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularQuestions.map((pq, i) => (
                <button
                  key={i}
                  onClick={() => handlePopularClick(pq)}
                  className="bg-background rounded-xl border border-border p-5 text-left hover:shadow-lg hover:border-primary/30 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-primary font-bold text-sm">{i + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{pq.q}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-10 md:py-16">
        <div className="container max-w-4xl">
          {!searchQuery && (
            <h2 className="text-2xl font-bold font-display text-foreground mb-8 text-center">Разделы базы знаний</h2>
          )}
          <div className="space-y-4">
            {filteredCategories.map((cat, catIdx) => {
              const realIdx = categories.indexOf(cat) !== -1 ? categories.findIndex((c) => c.title === cat.title) : catIdx;
              const isOpen = openCategory === realIdx || !!searchQuery;

              return (
                <div key={cat.title} className="bg-background border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenCategory(isOpen && !searchQuery ? null : realIdx)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <cat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">{cat.title}</div>
                      <div className="text-sm text-muted-foreground">{cat.desc}</div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex-shrink-0">
                      {cat.articles.length}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border">
                      {cat.articles.map((article) => (
                        <div key={article.q} className="border-b border-border last:border-b-0">
                          <button
                            onClick={() => setOpenArticle(openArticle === article.q ? null : article.q)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:text-primary hover:bg-muted/20 transition-colors"
                          >
                            <span className="pr-4">{article.q}</span>
                            <ChevronDown className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${openArticle === article.q ? "rotate-180" : ""}`} />
                          </button>
                          {openArticle === article.q && (
                            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed bg-muted/10">
                              {article.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container text-center max-w-2xl">
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-display text-foreground mb-3">Не нашли ответ на свой вопрос?</h2>
          <p className="text-muted-foreground mb-8">Наша служба поддержки готова помочь вам в любой день недели</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Написать в Telegram
            </Button>
            <Button variant="outline">
              Написать в WhatsApp
            </Button>
            <Button variant="outline">
              Создать тикет на сайте
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreelancerKnowledge;
