import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import articlesData from "@/data/articles.json";

const latestArticles = articlesData.slice(0, 3);

const BlogPreview = () => (
  <section className="py-20">
    <div className="container">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-display">База знаний и Блог</h2>
        <Link to="/blog" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
          Перейти в Базу знаний <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {latestArticles.map((a) => (
          <Link to={`/blog/${a.slug}`} key={a.id}>
            <article className="group rounded-2xl border border-border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
              <div className="h-32 bg-accent rounded-xl mb-4 flex items-center justify-center gap-2 flex-wrap px-3">
                {a.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-wider text-accent-foreground/60 bg-background/50 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{a.date}</span>
              <h3 className="text-base font-bold mt-2 text-foreground group-hover:text-primary transition-colors">{a.title}</h3>
            </article>
          </Link>
        ))}
      </div>
      <Link to="/blog" className="md:hidden flex items-center gap-2 text-primary font-medium mt-6 hover:underline">
        Перейти в Базу знаний <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default BlogPreview;
