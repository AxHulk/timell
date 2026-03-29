import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import articles from "@/data/articles.json";

const ARTICLES_PER_PAGE = 12;

// Build tag counts
const tagCounts: Record<string, number> = {};
articles.forEach((a: any) =>
  a.tags.forEach((t: string) => {
    tagCounts[t] = (tagCounts[t] || 0) + 1;
  })
);
const allTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

const Blog = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = articles as any[];
    if (activeTag) {
      result = result.filter((a) => a.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTag, search]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const currentPage = Math.min(page, totalPages || 1);
  const paged = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  // Pagination range
  const getPageRange = () => {
    const range: number[] = [];
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);
      if (currentPage <= 3) end = 5;
      if (currentPage >= totalPages - 2) start = totalPages - 4;
      if (start > 2) range.push(-1); // ellipsis
      for (let i = start; i <= end; i++) range.push(i);
      if (end < totalPages - 1) range.push(-2); // ellipsis
      range.push(totalPages);
    }
    return range;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-20">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              База знаний
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              {articles.length} статей о работе с самозанятыми, налогах,
              документообороте и автоматизации выплат
            </p>
            <div className="relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Поиск по статьям..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12 text-base bg-background border-border"
              />
            </div>
          </div>
        </section>

        {/* Tags */}
        <section className="border-b border-border bg-background">
          <div className="container py-6">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Все статьи
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTagClick(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTag === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                Все статьи
              </button>
              {allTags.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  #{tag}{" "}
                  <span className="opacity-70">({count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-12">
          <div className="container">
            {search && (
              <p className="text-sm text-muted-foreground mb-6">
                Найдено: {filtered.length} статей
                {activeTag && ` по тегу #${activeTag}`}
              </p>
            )}

            {paged.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  Ничего не найдено
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveTag(null);
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paged.map((article: any) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.slug}`}
                    className="group block bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {article.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3 text-base">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-12">
                <button
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {getPageRange().map((p, i) =>
                  p < 0 ? (
                    <span key={`e${i}`} className="px-2 text-muted-foreground">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
