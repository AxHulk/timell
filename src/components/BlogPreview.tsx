import { ArrowRight } from "lucide-react";

const articles = [
  { title: "Как правильно оформить самозанятого в 2026 году", tag: "Гайд", date: "25 марта 2026" },
  { title: "Сравнение: ГПХ, самозанятость и ИП — что выбрать бизнесу", tag: "Аналитика", date: "20 марта 2026" },
  { title: "API Timell: полное руководство для разработчиков", tag: "Разработка", date: "15 марта 2026" },
];

const BlogPreview = () => (
  <section className="py-20">
    <div className="container">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-display">База знаний и Блог</h2>
        <a href="#" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
          Перейти в Базу знаний <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <article key={a.title} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
            <div className="h-32 bg-accent rounded-xl mb-4 flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground/60">{a.tag}</span>
            </div>
            <span className="text-xs text-muted-foreground">{a.date}</span>
            <h3 className="text-base font-bold mt-2 text-foreground group-hover:text-primary transition-colors">{a.title}</h3>
          </article>
        ))}
      </div>
      <a href="#" className="md:hidden flex items-center gap-2 text-primary font-medium mt-6 hover:underline">
        Перейти в Базу знаний <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
);

export default BlogPreview;
