import logoImg from "@/assets/logo-horizontal.png";

const columns = [
  { title: "О компании", links: ["О нас", "Команда", "Карьера", "Контакты"] },
  { title: "Продукты", links: ["Для бизнеса", "Для исполнителей", "API", "Калькулятор ФОТ"] },
  { title: "Информация", links: ["Блог", "База знаний", "Партнёрская программа", "Тарифы"] },
  { title: "Контакты", links: ["support@timell.ru", "+7 (800) 000-00-00", "Москва, Россия"] },
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
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2026 Timell. Все права защищены.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">Политика конфиденциальности</a>
          <a href="#" className="hover:text-foreground">Пользовательское соглашение</a>
        </div>
        <span className="text-xs">Официальный партнёр ФНС</span>
      </div>
    </div>
  </footer>
);

export default Footer;
