import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-horizontal.png";

const menuLinks: Record<string, string> = {
  "Автоматизация документооборота с самозанятыми": "/solutions/doc-automation",
  "Интеграция с 1С": "/solutions/1c-integration",
  "Автоматизация оформления внештатников": "/solutions/freelancer-onboarding",
  "Оплата налогов самозанятых": "/solutions/tax-payment",
  "Проверка статуса самозанятого": "/solutions/status-check",
  "Партнёрская программа": "/solutions/partner-program",
  "Для бухгалтеров": "/services/accountant",
  "HR-платформа": "/services/hr-platform",
  "Для аутсорсинга и аутстаффинга": "/services/outsourcing",
  "Выплаты копирайтерам": "/services/copywriters",
  "Выплаты маркетологам": "/services/marketers",
  "Выплаты блогерам": "/services/bloggers",
  "Для курьерских служб": "/services/couriers",
  "Для клининговых компаний": "/services/cleaning",
};

const navItems = [
  {
    label: "Решения для бизнеса",
    children: [
      "Автоматизация документооборота с самозанятыми",
      "Интеграция с 1С",
      "Автоматизация оформления внештатников",
      "Оплата налогов самозанятых",
      "Проверка статуса самозанятого",
      "Партнёрская программа",
    ],
  },
  {
    label: "Услуги",
    children: [
      "Для бухгалтеров",
      "HR-платформа",
      "Для аутсорсинга и аутстаффинга",
      "Для курьерских служб",
      "Выплаты копирайтерам",
      "Выплаты маркетологам",
      "Выплаты блогерам",
      "Для строительных компаний",
      "Для клининга",
      "Для турагенств",
    ],
  },
  { label: "Калькулятор ФОТ", children: null },
  {
    label: "База знаний",
    children: ["Блог", "API документация"],
  },
  {
    label: "Исполнителям",
    children: ["Платформа для внештатников", "Найти задание", "База знаний"],
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex-shrink-0">
          <img src={logoImg} alt="Timell" className="h-8" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleEnter(item.label)}
              onMouseLeave={handleLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors">
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="bg-popover border border-border rounded-lg shadow-lg p-2 min-w-[260px]">
                    {item.children.map((child) => {
                      const href = menuLinks[child];
                      return href ? (
                        <Link key={child} to={href} className="block px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors">
                          {child}
                        </Link>
                      ) : (
                        <a key={child} href="#" className="block px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors">
                          {child}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm">Вход</Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Регистрация</Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-4">
          {navItems.map((item) => (
            <div key={item.label} className="py-2">
              <button
                className="w-full flex items-center justify-between text-sm font-medium py-2"
                onClick={() => item.children && setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                {item.label}
                {item.children && <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />}
              </button>
              {item.children && openDropdown === item.label && (
                <div className="pl-4 space-y-1">
                  {item.children.map((child) => {
                    const href = menuLinks[child];
                    return href ? (
                      <Link key={child} to={href} className="block py-1.5 text-sm text-muted-foreground hover:text-foreground">{child}</Link>
                    ) : (
                      <a key={child} href="#" className="block py-1.5 text-sm text-muted-foreground hover:text-foreground">{child}</a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" className="flex-1">Вход</Button>
            <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">Регистрация</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
