import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-horizontal.png";
import iconVk from "@/assets/footer/icon-vk.png";
import iconTg from "@/assets/footer/icon-tg.png";
import logoMir from "@/assets/footer/logo-mir.png";
import logoVisa from "@/assets/footer/logo-visa.png";
import logoMastercard from "@/assets/footer/logo-mastercard.png";
import logoSbp from "@/assets/footer/logo-sbp.png";
import logo3ds from "@/assets/footer/logo-3dsecure.png";

const navLinks = [
  { label: "О компании", href: "/about" },
  { label: "Для исполнителей", href: "/freelancer-platform" },
  { label: "Партнёрская программа", href: "/solutions/partner-program" },
  { label: "Вопросы и ответы", href: "/faq" },
  { label: "Калькулятор ФОТ", href: "/calculator" },
  { label: "API-документация", href: "/api-docs" },
];

const legalLinks = [
  { label: "Политика конфиденциальности", href: "/legal/privacy-policy" },
  { label: "Пользовательское соглашение", href: "/legal/user-agreement" },
  { label: "Юридические документы", href: "/legal" },
];

const paymentLogos = [
  { src: logoMir, alt: "МИР", h: "h-5" },
  { src: logoVisa, alt: "Visa", h: "h-5" },
  { src: logoMastercard, alt: "MasterCard", h: "h-6" },
  { src: logoSbp, alt: "СБП", h: "h-6" },
  { src: logo3ds, alt: "3D Secure", h: "h-5" },
];

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container">
      {/* Top row: logo + nav + socials */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Brand */}
        <div>
          <img src={logoImg} alt="Timell" className="h-8 mb-3" />
          <p className="text-sm text-muted-foreground mb-4">HRTech-платформа для работы с внештатным персоналом</p>
          <div className="flex items-center gap-3">
            <a href="https://vk.ru/vk_timell" target="_blank" rel="noopener noreferrer">
              <img src={iconVk} alt="VK" className="h-8 w-8 rounded-full hover:opacity-80 transition-opacity" />
            </a>
            <a href="https://t.me/TG_Timell" target="_blank" rel="noopener noreferrer">
              <img src={iconTg} alt="Telegram" className="h-8 w-8 rounded-full hover:opacity-80 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-foreground">Навигация</h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-foreground">Контакты</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:info@timell.ru" className="hover:text-foreground transition-colors">info@timell.ru</a></li>
            <li><a href="tel:84852974060" className="hover:text-foreground transition-colors">8 (485) 29-74-060</a></li>
          </ul>
        </div>
      </div>

      {/* Payment logos */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {paymentLogos.map((logo) => (
          <img key={logo.alt} src={logo.src} alt={logo.alt} className={`${logo.h} object-contain opacity-60`} />
        ))}
      </div>

      {/* Legal info */}
      <div className="border-t border-border pt-6 space-y-4 text-xs text-muted-foreground">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span>© 2026 Timell. Все права защищены.</span>
          <div className="flex items-center gap-4 flex-wrap">
            {legalLinks.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="leading-relaxed space-y-1">
          <p>Индивидуальный предприниматель Мосичев Фёдор Владимирович</p>
          <p>ИНН 761203433802 · ОГРНИП 326762700011227</p>
          <p>152612, Россия, Ярославская область, Угличский район, г. Углич, мкр Солнечный 26а</p>
          <p>Телефон: 8 485 29 74 060 · E-mail: info@timell.ru</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
