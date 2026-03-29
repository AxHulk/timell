import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const section1: FaqItem[] = [
  { q: "Кто такие самозанятые?", a: "Это граждане, которые работают на себя, не имеют наемных сотрудников и применяют специальный налоговый режим — Налог на профессиональный доход (НПД). Они платят 6% при работе с юридическими лицами." },
  { q: "Кому подходит специальный налоговый режим?", a: "Данный налоговый режим идеально подходит для фрилансеров, курьеров, строителей, IT-специалистов, маркетологов и других независимых специалистов, чей годовой доход не превышает 2,4 миллиона рублей." },
  { q: "Кто уплачивает налог за самозанятых?", a: "По закону самозанятый обязан платить налог самостоятельно. Однако платформа Timell, выступая официальным партнером ФНС, может полностью автоматизировать этот процесс. Мы автоматически удерживаем необходимую сумму и перечисляем её в налоговую службу при каждой выплате, при условии, что исполнитель дал на это соответствующее согласие." },
  { q: "Как учитывать расходы при работе с самозанятыми?", a: "Бухгалтерские расходы учитываются на основании чека, который формирует самозанятый исполнитель. На платформе Timell такие чеки генерируются абсолютно автоматически в момент проведения выплаты. Они сразу же становятся доступны в вашем личном кабинете и готовы для массовой выгрузки в систему 1С." },
  { q: "Могут ли нерезиденты находиться в статусе самозанятого?", a: "Да, законодательство позволяет это. Граждане стран ЕАЭС (Беларусь, Казахстан, Армения, Киргизия), а также граждане Украины имеют полное право стать самозанятыми на тех же условиях, что и граждане Российской Федерации." },
  { q: "Чем запрещено заниматься самозанятым?", a: "Самозанятым строго запрещено перепродавать чужие товары (разрешена только продажа товаров собственного производства), реализовывать подакцизные товары, заниматься добычей полезных ископаемых, а также работать на основании агентских договоров или договоров комиссии." },
  { q: "Можно ли работать по трудовому договору и быть самозанятым?", a: "Да, закон не запрещает совмещать работу по найму и статус самозанятого. Однако существует важное ограничение: компания не имеет права привлекать своего действующего или бывшего сотрудника (если с момента его увольнения прошло менее двух лет) в качестве самозанятого. Платформа Timell автоматически проверяет этот риск перед каждой транзакцией, защищая бизнес от штрафов." },
];

const section2: FaqItem[] = [
  { q: "Как работает финансовая модель Timell?", a: "Мы выстраиваем работу по надёжной модели эскроу через специальные номинальные счета. Заказчик переводит деньги на счёт, где они безопасно хранятся до момента фактического выполнения задания. Платформа выступает исключительно как технологический и платёжный агент, гарантируя полную прозрачность всех расчётов." },
  { q: "Сколько стоит сервис Timell? Есть ли дополнительные комиссии?", a: "Timell функционирует по современной модели «Платформа как услуга» (PaaS). Вы оплачиваете только комиссию за успешные транзакции, размер которой варьируется от 0,7% до 3% в зависимости от вашего оборота. Мы гарантируем отсутствие скрытых платежей, абонентской платы или платы за подключение." },
  { q: "Есть ли комиссия для исполнителей?", a: "Нет, для самих исполнителей (будь то самозанятые, индивидуальные предприниматели или физические лица) использование платформы Timell является абсолютно бесплатным. Они гарантированно получают ровно ту сумму, которая была изначально указана в задании." },
  { q: "Кому можно проводить выплаты через платформу?", a: "Платформа позволяет автоматизировать и проводить массовые выплаты вознаграждений самозанятым гражданам, индивидуальным предпринимателям (ИП), а также физическим лицам, работающим по договорам гражданско-правового характера (ГПХ)." },
  { q: "Как получить закрывающие документы от исполнителей?", a: "Вам больше не нужно вручную запрашивать документы у каждого исполнителя. Все необходимые бумаги (договоры, акты выполненных работ, чеки) формируются на платформе автоматически. Они надёжно хранятся в вашем личном кабинете, доступны 24/7 и в любой момент готовы к выгрузке." },
  { q: "Нужно ли заказчику перед выплатой проверять налоговый статус самозанятого?", a: "Нет, всю рутинную проверку Timell берёт на себя. Перед проведением каждой транзакции платформа автоматически связывается с актуальной базой ФНС и проверяет наличие действующего статуса плательщика НПД. Если статус утерян или аннулирован, выплата автоматически блокируется, чтобы надёжно защитить ваш бизнес от налоговых рисков и штрафов." },
  { q: "Как подписываются договоры и закрывающие документы?", a: "Весь документооборот на платформе полностью электронный (ЭДО). Документы подписываются с использованием простой электронной подписи (ПЭП) непосредственно в интерфейсе платформы. Такой формат подписания имеет полную юридическую силу и признаётся контролирующими органами." },
  { q: "Возможна ли оплата исполнителям по номеру карты?", a: "Да, платформа Timell обеспечивает максимальную гибкость и поддерживает моментальные выплаты на любые банковские карты, выпущенные в РФ, а также прямые переводы на расчётные счета исполнителей." },
];

const allFaqs = [...section1, ...section2];

const FaqAccordion = ({ items, openIndex, onToggle, offset = 0 }: { items: FaqItem[]; openIndex: number | null; onToggle: (i: number) => void; offset?: number }) => (
  <div className="space-y-3">
    {items.map((f, i) => {
      const idx = offset + i;
      const isOpen = openIndex === idx;
      return (
        <div key={idx} className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
          <button
            onClick={() => onToggle(idx)}
            className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:text-primary transition-colors"
          >
            <span className="pr-4">{f.q}</span>
            <ChevronDown className={`h-5 w-5 text-secondary flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
          {isOpen && (
            <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</div>
          )}
        </div>
      );
    })}
  </div>
);

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const isSearching = searchQuery.trim().length > 0;
  const filtered = isSearching
    ? allFaqs.filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/8 via-accent to-secondary/5 py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4">
            Вопросы и ответы
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Найдите ответы на вопросы о работе с самозанятыми, ИП и физлицами, а также о возможностях платформы Timell.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
            <Input
              placeholder="Введите ваш вопрос..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
              className="pl-12 h-13 text-base rounded-xl border-border shadow-sm bg-background"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container max-w-3xl">
          {isSearching ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Найдено: <strong className="text-foreground">{filtered.length}</strong> {filtered.length === 1 ? "результат" : "результатов"}
              </p>
              {filtered.length > 0 ? (
                <FaqAccordion items={filtered} openIndex={openIndex} onToggle={toggle} />
              ) : (
                <div className="text-center py-12">
                  <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-foreground font-medium mb-1">Ничего не найдено</p>
                  <p className="text-sm text-muted-foreground">Попробуйте изменить запрос или оставьте заявку ниже</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Section 1 */}
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6">
                Самозанятость и законодательство
              </h2>
              <FaqAccordion items={section1} openIndex={openIndex} onToggle={toggle} offset={0} />

              {/* Divider */}
              <div className="my-10 border-t border-border" />

              {/* Section 2 */}
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6">
                Работа на платформе Timell
              </h2>
              <FaqAccordion items={section2} openIndex={openIndex} onToggle={toggle} offset={section1.length} />
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-secondary to-secondary/85">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-secondary-foreground mb-4">
                Не нашли ответ на свой вопрос?
              </h2>
              <p className="text-secondary-foreground/80 leading-relaxed">
                Оставьте заявку, и наш менеджер оперативно свяжется с вами, чтобы провести индивидуальную презентацию платформы Timell и подробно ответить на все ваши вопросы.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
