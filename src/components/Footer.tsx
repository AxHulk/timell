import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-horizontal.png";

const columns = [
  { title: "О компании", links: [{ label: "О нас", href: "/about" }, { label: "Контакты", href: "/about#contacts" }] },
  { title: "Продукты", links: [{ label: "Для бизнеса", href: "#" }, { label: "Для исполнителей", href: "/freelancer-platform" }, { label: "API", href: "/api-docs" }, { label: "Калькулятор ФОТ", href: "/calculator" }] },
  { title: "Информация", links: [{ label: "Блог", href: "/blog" }, { label: "База знаний", href: "/freelancer-knowledge" }, { label: "FAQ", href: "/faq" }, { label: "Партнёрская программа", href: "/solutions/partner-program" }] },
  { title: "Контакты", links: [{ label: "support@timell.ru", href: "mailto:support@timell.ru" }, { label: "+7 (800) 000-00-00", href: "tel:+78000000000" }, { label: "Москва, Россия", href: "#" }] },
];

const Footer = () => (
  <footer className="border-t border-border bg-card py-16">
    <div className="container">
      <div className="grid md:grid-cols-5 gap-10 mb-12">
        <div className="md:col-span-1">
          <img src={logoImg} alt="Timell" className="h-8 mb-4" />
          <p className="text-sm text-muted-foreground">HRTech-платформа для работы с внештатным персоналом</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-4 text-foreground">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => {
                const isInternal = link.href.startsWith("/");
                return (
                  <li key={link.label}>
                    {isInternal ? (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2026 Timell. Все права защищены.</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link to="/documents/privacy-policy" className="hover:text-foreground">Политика конфиденциальности</Link>
          <Link to="/documents/user-agreement" className="hover:text-foreground">Пользовательское соглашение</Link>
          <Link to="/documents" className="hover:text-foreground">Юридические документы</Link>
        </div>
        <span className="text-xs">Официальный партнёр ФНС</span>
      </div>
    </div>
  </footer>
);

export default Footer;
