import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "timell_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            Уважаемый посетитель, наш сайт использует файлы cookie и схожие технологии (метрические системы) для персонализации контента, анализа трафика и обеспечения технической работоспособности интерфейса. Продолжая использовать сайт, вы даёте своё согласие на обработку данных файлов в строгом соответствии с нашей{" "}
            <a href="/legal/privacy-policy" target="_blank" className="text-primary underline">Политикой конфиденциальности</a>.
            {" "}Вы имеете право отключить использование cookie в настройках вашего веб-браузера.
          </p>
          <Button onClick={accept} className="shrink-0 whitespace-nowrap">
            Принимаю
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
