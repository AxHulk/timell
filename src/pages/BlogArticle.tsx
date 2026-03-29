import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import articles from "@/data/articles.json";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = (articles as any[]).find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  // Find adjacent articles
  const idx = articles.indexOf(article);
  const prev = idx > 0 ? (articles as any[])[idx - 1] : null;
  const next = idx < articles.length - 1 ? (articles as any[])[idx + 1] : null;

  // Extract reading time and clean metadata from text
  const rawParagraphs = article.text
    .split("\n")
    .filter((p: string) => p.trim().length > 0);

  // Extract reading time from metadata lines
  const readingTimeLine = rawParagraphs.find((p: string) => /^~?\d+\s*минут/.test(p.trim()));
  const readingTime = readingTimeLine ? readingTimeLine.trim() : null;

  // Skip metadata lines at the top: title, date, reading time, view count, rating, (comments), "Содержание статьи"
  const metadataPatterns = [
    (p: string) => p.trim() === article.title,
    (p: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(p.trim()),
    (p: string) => /^~?\d+\s*минут/.test(p.trim()),
    (p: string) => /^\d[\d\s]*$/.test(p.trim()) && p.trim().length < 10,
    (p: string) => /^\d+\.\d+$/.test(p.trim()),
    (p: string) => /^\(\d+\)$/.test(p.trim()),
    (p: string) => p.trim() === "Содержание статьи",
  ];

  // Remove leading metadata lines
  let startIdx = 0;
  for (let i = 0; i < rawParagraphs.length && i < 10; i++) {
    if (metadataPatterns.some(fn => fn(rawParagraphs[i]))) {
      startIdx = i + 1;
    } else {
      break;
    }
  }
  const paragraphs = rawParagraphs.slice(startIdx);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article className="py-12 md:py-16">
          <div className="container max-w-3xl">
            {/* Breadcrumb */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад к статьям
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag: string) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
              <Calendar className="h-4 w-4" />
              {article.date}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground/90">
              {paragraphs.map((p: string, i: number) => {
                // Detect headings (short lines that don't end with period)
                const trimmed = p.trim();
                if (
                  trimmed.length < 100 &&
                  !trimmed.endsWith(".") &&
                  !trimmed.endsWith(":") &&
                  !trimmed.startsWith("~") &&
                  i > 0 &&
                  !/^\d/.test(trimmed)
                ) {
                  return (
                    <h2
                      key={i}
                      className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4"
                    >
                      {trimmed}
                    </h2>
                  );
                }
                // Numbered headings like "1. Title"
                if (/^\d+\\?\.\s/.test(trimmed) && trimmed.length < 120) {
                  return (
                    <h3
                      key={i}
                      className="text-lg font-semibold text-foreground mt-8 mb-3"
                    >
                      {trimmed.replace(/\\/g, "")}
                    </h3>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-muted-foreground mb-4"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="border-t border-border mt-12 pt-8 grid md:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <span className="text-xs text-muted-foreground">
                    ← Предыдущая
                  </span>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-2 mt-1">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-right"
                >
                  <span className="text-xs text-muted-foreground">
                    Следующая →
                  </span>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-2 mt-1">
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
