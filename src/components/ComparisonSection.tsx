import { Check, X } from "lucide-react";

const rows = [
  { label: "Массовые выплаты исполнителям", without: "Вручную через банк, риск ошибок", with: "Автоматически, в один клик" },
  { label: "Документооборот", without: "Бумажные акты и договоры", with: "ЭДО с юридической силой" },
  { label: "Проверка статуса самозанятого", without: "Вручную через сайт ФНС", with: "Автоматически перед каждой выплатой" },
  { label: "Мониторинг чеков", without: "Запрашивать у каждого исполнителя", with: "Автоматический контроль чеков" },
];

const ComparisonSection = () => (
  <section className="py-20 bg-muted/50">
    <div className="container">
      <h2 className="text-3xl lg:text-4xl font-bold font-display text-center mb-12">
        Без Timell <span className="text-muted-foreground font-normal">vs</span> Через Timell
      </h2>
      <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border bg-card">
        {/* Header row */}
        <div className="grid grid-cols-[1fr,1fr,1fr] text-sm font-bold">
          <div className="p-4 bg-muted border-b border-border">Процесс</div>
          <div className="p-4 bg-destructive/10 border-b border-border text-center">Без Timell</div>
          <div className="p-4 bg-primary/10 border-b border-border text-center">Через Timell</div>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr,1fr,1fr] text-sm border-b last:border-b-0 border-border">
            <div className="p-4 font-medium text-foreground">{row.label}</div>
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
);

export default ComparisonSection;
