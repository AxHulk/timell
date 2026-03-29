import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LeadForm = () => {
  const [size, setSize] = useState("");

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Запишитесь на демо</h2>
        <p className="text-primary-foreground/80 mb-10 text-lg">
          Покажем, как Timell решает задачи именно вашего бизнеса
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Input placeholder="Имя" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="Телефон" type="tel" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <Input placeholder="Email" type="email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-primary-foreground/10 border-primary-foreground/20 px-3 py-2 text-sm text-primary-foreground"
          >
            <option value="" className="text-foreground">Количество исполнителей</option>
            <option value="50" className="text-foreground">до 50</option>
            <option value="200" className="text-foreground">50–200</option>
            <option value="200+" className="text-foreground">более 200</option>
          </select>
        </div>
        <Button size="lg" className="w-full sm:w-auto px-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-bold">
          Записаться на демо
        </Button>
        <p className="text-xs text-primary-foreground/50 mt-4">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="#" className="underline">политикой конфиденциальности</a>
        </p>
      </div>
    </section>
  );
};

export default LeadForm;
