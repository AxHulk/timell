import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";

interface IndustryLeadFormProps {
  consentId: string;
  source: string;
}

const executorOptions = ["До 10", "От 11 до 50", "От 51 до 200", "От 201 и более", "Я сам исполнитель"];

const IndustryLeadForm = ({ consentId, source }: IndustryLeadFormProps) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [executorCount, setExecutorCount] = useState("");
  const [consentPd, setConsentPd] = useState(false);
  const { submitLead, submitting } = useLeadSubmit();

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    const ok = await submitLead({
      name, company, phone, email, team_size: executorCount, source,
    });
    if (ok) {
      setName(""); setCompany(""); setPhone(""); setEmail("");
      setExecutorCount(""); setConsentPd(false);
    }
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Возникли вопросы?</h2>
        <p className="text-primary-foreground/80 mb-10 text-lg">
          Оставьте заявку, и мы свяжемся с вами в течение рабочего дня
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="Компания" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="Номер телефона" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
        </div>
        <div className="mb-6">
          <p className="text-sm text-primary-foreground/70 mb-3">Сколько у вас исполнителей?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {executorOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setExecutorCount(opt)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  executorCount === opt
                    ? "bg-secondary border-secondary text-secondary-foreground"
                    : "border-primary-foreground/30 text-primary-foreground/80 hover:border-primary-foreground/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <ConsentCheckbox id={consentId} checked={consentPd} onCheckedChange={setConsentPd} variant="dark" className="mt-4" />
        <Button
          size="lg"
          className="w-full sm:w-auto px-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-bold mt-4"
          disabled={!consentPd || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Отправка..." : "Отправить"}
        </Button>
      </div>
    </section>
  );
};

export default IndustryLeadForm;
