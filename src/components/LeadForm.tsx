import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";

const LeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [consentPd, setConsentPd] = useState(false);
  const { submitLead, submitting } = useLeadSubmit();

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      return;
    }
    const ok = await submitLead({
      name, phone, email, team_size: size, source: "demo-form",
    });
    if (ok) {
      setName(""); setPhone(""); setEmail(""); setSize(""); setConsentPd(false);
    }
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Запишитесь на демо</h2>
        <p className="text-primary-foreground/80 mb-10 text-lg">
          Покажем, как Timell решает задачи именно вашего бизнеса
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="Телефон" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-primary-foreground/10 border-primary-foreground/20 px-3 py-2 text-sm text-primary-foreground"
          >
            <option value="" className="text-foreground">Количество исполнителей</option>
            <option value="до 50" className="text-foreground">до 50</option>
            <option value="50–200" className="text-foreground">50–200</option>
            <option value="более 200" className="text-foreground">более 200</option>
          </select>
        </div>
        <ConsentCheckbox id="consent-lead" checked={consentPd} onCheckedChange={setConsentPd} variant="dark" className="mb-4 text-left" />
        <Button
          size="lg"
          className="w-full sm:w-auto px-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-bold"
          disabled={!consentPd || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Отправка..." : "Записаться на демо"}
        </Button>
      </div>
    </section>
  );
};

export default LeadForm;
