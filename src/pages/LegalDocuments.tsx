import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, ExternalLink } from "lucide-react";

const legalDocs = [
  { title: "Пользовательское соглашение Timell", date: "Действует с 30.03.2026", href: "/documents/user-agreement" },
  { title: "Соглашение Timell с Заказчиком", date: "Действует с 30.03.2026", href: "/documents/customer-agreement" },
  { title: "Шаблон договора Заказчик — Исполнитель", date: "Действует с 30.03.2026", href: "/documents/contract-template" },
  { title: "Политика конфиденциальности", date: "Действует с 30.03.2026", href: "/documents/privacy-policy" },
  { title: "Согласие на обработку персональных данных при регистрации на платформе", href: "/documents/consent-registration" },
  { title: "Согласие на обработку персональных данных при отправке заявки на сайте", href: "/documents/consent-website-form" },
  { title: "Согласие на обработку персональных данных при обращении в поддержку", href: "/documents/consent-support" },
  { title: "Уведомление о порядке обработки персональных данных", href: "/documents/data-processing-notice" },
  { title: "Политика использования файлов cookie", href: "/documents/cookie-policy" },
];

const licenses = [
  {
    title: "Аккредитация Минцифры России",
    description: "№22710 в реестре аккредитованных IT-компаний",
    href: "/documents/accreditation.pdf",
    external: true,
  },
  {
    title: "Свидетельство о регистрации Товарного знака Timell",
    description: "В Государственном реестре товарных знаков",
    href: "/documents/trademark.pdf",
    external: true,
  },
];

const LegalDocuments = () => (
  <>
    <Header />
    <main className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold font-display mb-10 text-foreground">Юридические документы</h1>

      <section className="mb-12">
        <ul className="space-y-5">
          {legalDocs.map((doc) => (
            <li key={doc.href}>
              <Link to={doc.href} className="group flex items-start gap-3 hover:opacity-80 transition-opacity">
                <FileText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <span className="text-primary font-medium group-hover:underline">{doc.title}</span>
                  {doc.date && <p className="text-sm text-muted-foreground mt-0.5">{doc.date}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-display mb-6 text-foreground">Лицензии</h2>
        <ul className="space-y-5">
          {licenses.map((lic) => (
            <li key={lic.href}>
              <a
                href={lic.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 hover:opacity-80 transition-opacity"
              >
                <ExternalLink className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <span className="text-primary font-medium group-hover:underline">{lic.title}</span>
                  <p className="text-sm text-muted-foreground mt-0.5">{lic.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
    <Footer />
  </>
);

export default LegalDocuments;
