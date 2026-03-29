import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, Shield, FileText, CreditCard, ChevronRight, ChevronLeft, Building2, Clock, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Курьерские услуги",
  "Мерчендайзинг",
  "Складские работы",
  "IT и дизайн",
  "Строительство и ремонт",
  "Клининг",
];

const categoryColors: Record<string, string> = {
  "Курьерские услуги": "bg-secondary",
  "Мерчендайзинг": "bg-primary",
  "Складские работы": "bg-secondary",
  "IT и дизайн": "bg-primary",
  "Строительство и ремонт": "bg-secondary",
  "Клининг": "bg-primary",
};

const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Удалённая работа"];
const serviceCategories = ["Аутсорсинг", "Логистика", "IT", "Маркетинг", "Строительство", "Клининг"];

interface Task {
  id: number;
  category: string;
  title: string;
  company: string;
  verified: boolean;
  price: string;
  location: string;
  deadline: string;
  format: string;
}

const mockTasks: Task[] = [
  { id: 1, category: "Курьерские услуги", title: "Доставка продуктов по району Хамовники", company: "ООО «ФудЭкспресс»", verified: true, price: "3 500 ₽", location: "Москва", deadline: "до 2 апреля", format: "Несколько часов" },
  { id: 2, category: "IT и дизайн", title: "Дизайн лендинга для юридической фирмы", company: "ИП Смирнов А.В.", verified: true, price: "25 000 ₽", location: "Удалённо", deadline: "до 10 апреля", format: "Проектная работа" },
  { id: 3, category: "Клининг", title: "Уборка офисного помещения 200 м²", company: "ООО «Чистый Дом»", verified: true, price: "8 000 ₽", location: "Санкт-Петербург", deadline: "до 30 марта", format: "Полный день" },
  { id: 4, category: "Мерчендайзинг", title: "Выкладка товаров в сети «Магнит»", company: "ООО «ТрейдСервис»", verified: true, price: "4 200 ₽", location: "Казань", deadline: "до 5 апреля", format: "Несколько часов" },
  { id: 5, category: "Строительство и ремонт", title: "Укладка ламината в квартире 60 м²", company: "ООО «РемонтПлюс»", verified: false, price: "18 000 ₽", location: "Екатеринбург", deadline: "до 15 апреля", format: "Проектная работа" },
  { id: 6, category: "Складские работы", title: "Комплектация заказов на складе", company: "ООО «Вайлдберриз»", verified: true, price: "5 500 ₽", location: "Новосибирск", deadline: "до 1 апреля", format: "Полный день" },
  { id: 7, category: "IT и дизайн", title: "Вёрстка email-рассылки (3 шаблона)", company: "ООО «МейлПро»", verified: true, price: "12 000 ₽", location: "Удалённо", deadline: "до 8 апреля", format: "Проектная работа" },
  { id: 8, category: "Курьерские услуги", title: "Доставка документов по Санкт-Петербургу", company: "ИП Козлов Д.С.", verified: true, price: "2 800 ₽", location: "Санкт-Петербург", deadline: "до 31 марта", format: "Несколько часов" },
  { id: 9, category: "Клининг", title: "Генеральная уборка после ремонта", company: "ООО «КлинМастер»", verified: true, price: "15 000 ₽", location: "Москва", deadline: "до 3 апреля", format: "Полный день" },
  { id: 10, category: "Мерчендайзинг", title: "Аудит полок в торговой точке", company: "ООО «РитейлАналитикс»", verified: false, price: "3 000 ₽", location: "Казань", deadline: "до 29 марта", format: "Несколько часов" },
];

const trustPoints = [
  { icon: Shield, text: "Деньги резервируются на счёте до начала работы — заказчик не сможет не заплатить." },
  { icon: FileText, text: "Чеки формируются автоматически — не нужно заходить в приложение «Мой налог»." },
  { icon: CreditCard, text: "Бесплатный вывод средств на любую карту." },
];

const howToSteps = [
  { num: "01", title: "Регистрация", desc: "Пройдите быструю регистрацию и подтвердите статус самозанятого или ИП." },
  { num: "02", title: "Отклик", desc: "Выберите подходящее задание и нажмите «Откликнуться»." },
  { num: "03", title: "Выполнение и оплата", desc: "Выполните работу, заказчик примет её в системе, и деньги моментально поступят на вашу карту." },
];

const FindTask = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch = !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/8 via-accent to-secondary/5 py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-3 text-center">
            Найдите задание и начните зарабатывать{" "}
            <span className="text-primary">с гарантией оплаты</span>
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto text-lg">
            Тысячи актуальных задач для самозанятых, физлиц и ИП от проверенных компаний.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию или ключевому слову..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-13 text-base rounded-xl border-border shadow-sm bg-background"
              />
            </div>
          </div>

          {/* Quick categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedCategory === cat
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-background text-foreground/80 border-border hover:border-secondary hover:text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8 md:py-12 flex-1">
        <div className="container">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <span className="text-sm text-muted-foreground">Найдено: <strong className="text-foreground">{filteredTasks.length}</strong> заданий</span>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4 mr-1" /> Фильтры
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Filters sidebar */}
            <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-auto lg:static lg:p-0 lg:z-auto" : "hidden"} lg:block w-full lg:w-72 flex-shrink-0`}>
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Mobile close */}
                <div className="flex items-center justify-between lg:hidden">
                  <h3 className="font-semibold text-foreground">Фильтры</h3>
                  <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
                </div>

                <div className="bg-background lg:border lg:border-border lg:rounded-2xl lg:p-5 space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Город / Регион</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Выберите город" /></SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Категория услуг</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Все категории" /></SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Бюджет (₽)</label>
                    <div className="flex gap-2">
                      <Input placeholder="От" type="number" className="flex-1" />
                      <Input placeholder="До" type="number" className="flex-1" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Даты выполнения</label>
                    <div className="space-y-2">
                      {["Сегодня", "Завтра", "На выходных"].map((d) => (
                        <label key={d} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span className="text-sm text-foreground/80">{d}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Формат занятости</label>
                    <div className="space-y-2">
                      {["Несколько часов", "Полный день", "Проектная работа"].map((f) => (
                        <label key={f} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span className="text-sm text-foreground/80">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Применить</Button>
                    <Button variant="outline" className="flex-1">Сбросить</Button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Tasks list */}
            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  Найдено: <strong className="text-foreground">12 450</strong> заданий
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Сначала новые</SelectItem>
                    <SelectItem value="expensive">Сначала дорогие</SelectItem>
                    <SelectItem value="cheap">Сначала дешёвые</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Task cards */}
              <div className="space-y-4">
                {filteredTasks.map((task, index) => (
                  <>
                    {/* Trust banner after 5th card */}
                    {index === 5 && (
                      <div key="trust-banner" className="bg-gradient-to-r from-primary/10 via-accent to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold font-display text-foreground mb-4">
                          Гарантия выплат по модели эскроу
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-4 mb-5">
                          {trustPoints.map((tp, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                                <tp.icon className="h-4.5 w-4.5 text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{tp.text}</p>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                          <Link to="/freelancer-platform">Узнать больше о платформе</Link>
                        </Button>
                      </div>
                    )}

                    <div
                      key={task.id}
                      className="group bg-background border border-border rounded-2xl p-5 md:p-6 hover:shadow-lg hover:border-primary/30 transition-all relative overflow-hidden"
                    >
                      {/* Category color marker */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${categoryColors[task.category] || "bg-primary"} rounded-l-2xl`} />

                      <div className="pl-3">
                        {/* Top row */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground border-0">
                            {task.category}
                          </Badge>
                          <div className="text-right">
                            <span className="text-xl font-bold text-foreground">{task.price}</span>
                            <span className="text-xs text-muted-foreground ml-1">на руки</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {task.title}
                        </h3>

                        {/* Company */}
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{task.company}</span>
                          {task.verified && (
                            <Badge className="text-[10px] px-1.5 py-0 bg-accent text-accent-foreground border-0 hover:bg-accent">
                              ✓ Проверенный
                            </Badge>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" /> {task.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> {task.deadline}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {task.format}
                          </span>
                        </div>

                        {/* CTA on hover */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                            Откликнуться
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}

                {filteredTasks.length === 0 && (
                  <div className="text-center py-16">
                    <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-1">Заданий не найдено</p>
                    <p className="text-sm text-muted-foreground">Попробуйте изменить параметры поиска или фильтры</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredTasks.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2, 3].map((p) => (
                    <Button
                      key={p}
                      variant={p === currentPage ? "default" : "outline"}
                      size="sm"
                      className={p === currentPage ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <span className="text-muted-foreground px-1">...</span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(150)}>150</Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground text-center mb-12">
            Как откликнуться на задание?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {howToSteps.map((step, i) => (
              <div key={i} className="relative bg-background rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/20 mb-3 font-display">{step.num}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < howToSteps.length - 1 && (
                  <ChevronRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/30" />
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
            Начните зарабатывать уже сегодня
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Зарегистрируйтесь бесплатно и откликнитесь на первое задание прямо сейчас
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

export default FindTask;
