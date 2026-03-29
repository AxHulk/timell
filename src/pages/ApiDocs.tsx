import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Search, ExternalLink, Copy, Check, ChevronLeft } from "lucide-react";

import iconIntro from "@/assets/api-docs/icon_intro.png";
import iconAuth from "@/assets/api-docs/icon_auth.png";
import iconFaq from "@/assets/api-docs/icon_faq.png";
import iconExecutors from "@/assets/api-docs/icon_executors.png";
import iconTasks from "@/assets/api-docs/icon_tasks.png";
import iconPayments from "@/assets/api-docs/icon_payments.png";
import iconBalance from "@/assets/api-docs/icon_balance.png";
import iconDocuments from "@/assets/api-docs/icon_documents.png";
import heroApi from "@/assets/api-docs/hero_api.png";
import illusAuth from "@/assets/api-docs/illus_auth.png";
import illusExecutors from "@/assets/api-docs/illus_executors.png";
import illusTasks from "@/assets/api-docs/illus_tasks.png";
import illusPayments from "@/assets/api-docs/illus_payments.png";
import illusBalance from "@/assets/api-docs/illus_balance.png";
import illusDocuments from "@/assets/api-docs/illus_documents.png";

type SectionId =
  | "intro"
  | "auth"
  | "faq"
  | "executors"
  | "tasks"
  | "payments"
  | "balance"
  | "documents";

const sections: { id: SectionId; label: string; icon: string; illustration: string }[] = [
  { id: "intro", label: "Введение", icon: iconIntro, illustration: heroApi },
  { id: "auth", label: "Аутентификация", icon: iconAuth, illustration: illusAuth },
  { id: "faq", label: "FAQ", icon: iconFaq, illustration: "" },
  { id: "executors", label: "Исполнители", icon: iconExecutors, illustration: illusExecutors },
  { id: "tasks", label: "Задания", icon: iconTasks, illustration: illusTasks },
  { id: "payments", label: "Выплаты", icon: iconPayments, illustration: illusPayments },
  { id: "balance", label: "Баланс", icon: iconBalance, illustration: illusBalance },
  { id: "documents", label: "Документы", icon: iconDocuments, illustration: illusDocuments },
];

const codeLangs = ["cURL", "JavaScript", "Python", "PHP"] as const;
type Lang = (typeof codeLangs)[number];

function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`relative group ${className}`}>
      <pre className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl p-4 text-sm overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function JsonBlock({ json }: { json: string }) {
  return <CodeBlock code={json} />;
}

/* ─── Section content components ─── */

function IntroSection({ lang }: { lang: Lang }) {
  const codeExamples: Record<Lang, string> = {
    cURL: `curl -X GET https://api.timell.ru/v1/executors \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    JavaScript: `const response = await fetch('https://api.timell.ru/v1/executors', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log(data);`,
    Python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.timell.ru/v1/executors',
    headers=headers)
data = response.json()
print(data)`,
    PHP: `<?php
$ch = curl_init('https://api.timell.ru/v1/executors');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);`,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Описание и возможности API</h2>
        <p className="text-muted-foreground leading-relaxed">
          Документация упрощает API интеграции с платформой Timell и автоматизацию бизнес-процессов компании.
          Методы API разделены на категории: Исполнители, Задания, Выплаты, Баланс и Документы.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Ключевые понятия</h3>
        <div className="grid gap-3">
          {[
            { term: "Account (Заказчик)", desc: "Пользователь платформы, создающий задания и устанавливающий вознаграждение." },
            { term: "Executor (Исполнитель)", desc: "Внештатный сотрудник (самозанятый, ИП или физлицо), выполняющий задания." },
            { term: "Task (Задание)", desc: "Работа с параметрами: описание, срок выполнения, бюджет, статус." },
            { term: "Payroll Registry", desc: "Реестр выплат для массовых выплат через CSV или JSON." },
            { term: "Payment (Выплата)", desc: "Транзакция за выполненное задание через номинальный счёт (эскроу)." },
            { term: "Balance (Баланс)", desc: "Номинальный счёт заказчика для совершения выплат." },
          ].map((item) => (
            <div key={item.term} className="bg-muted/50 rounded-lg p-4 border border-border">
              <span className="font-semibold text-primary">{item.term}</span>
              <span className="text-muted-foreground"> — {item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Возможности API</h3>
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Приглашать исполнителей и запрашивать информацию",
            "Создавать задания для исполнителей",
            "Формировать реестры на выплаты, оплачивать задания",
            "Создавать акты и запрашивать документы",
            "Работать с номинальным счётом: выписки, история пополнений",
            "Проверять налоговый статус в реальном времени",
            "Автоматизировать документооборот (ЭДО, ЭЦП)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Ограничения и лимиты</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "Rate Limit", value: "1 000 запросов/сек" },
            { label: "Timeout", value: "30 секунд" },
            { label: "Payload", value: "10 МБ макс." },
            { label: "Реестр", value: "10 000 строк макс." },
          ].map((item) => (
            <div key={item.label} className="bg-muted/50 rounded-lg p-4 border border-border text-center">
              <div className="text-lg font-bold text-primary">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Данные и методы</h3>
        <p className="text-muted-foreground mb-4">
          API поддерживает методы GET и POST. Все запросы и ответы передаются в формате JSON.
        </p>
        <CodeBlock code={codeExamples[lang]} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Структура ошибок</h3>
        <p className="text-muted-foreground mb-2">API возвращает стандартные коды HTTP: 2xx — успех, 4xx — ошибка клиента, 5xx — ошибка сервера.</p>
        <JsonBlock json={`{
  "error": {
    "code": "INVALID_EXECUTOR_STATUS",
    "message": "Исполнитель потерял статус самозанятого",
    "details": {
      "executor_id": "12345",
      "status": "inactive"
    }
  }
}`} />
      </div>
    </div>
  );
}

function AuthSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Получение API ключа</h2>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
          <li>Войдите в личный кабинет Timell</li>
          <li>Перейдите в раздел «Настройки» → «API»</li>
          <li>Нажмите «Создать новый ключ»</li>
          <li>Скопируйте ключ и сохраните его в безопасном месте</li>
        </ol>
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
          ⚠️ Никогда не делитесь API ключом и не публикуйте его в открытом коде!
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Авторизация</h3>
        <p className="text-muted-foreground mb-3">Все запросы должны включать заголовок Authorization:</p>
        <CodeBlock code={`Authorization: Bearer YOUR_API_KEY`} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Безопасность</h3>
        <ul className="space-y-2 text-muted-foreground">
          {[
            "API использует HTTPS для всех запросов",
            "Ключи хранятся в зашифрованном виде",
            "Все операции логируются для аудита",
            "Вы можете отозвать ключ в любой момент",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">CORS</h3>
        <p className="text-muted-foreground">
          API поддерживает CORS для запросов с браузера. Убедитесь, что ваш домен добавлен в список разрешённых доменов в настройках API.
        </p>
      </div>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Как получить API ключ?", a: "Перейдите в личный кабинет Timell → Настройки → API → Создать новый ключ." },
    { q: "Какой лимит запросов?", a: "1000 запросов в секунду. Если нужно больше — свяжитесь с поддержкой." },
    { q: "Какие языки программирования поддерживаются?", a: "API работает с любым языком, поддерживающим HTTP: JavaScript, Python, PHP, Java, C#, Go и т.д." },
    { q: "Как обработать ошибки?", a: "Проверяйте HTTP статус код ответа и анализируйте тело ошибки для получения деталей." },
    { q: "Можно ли тестировать?", a: "Да, используйте sandbox: https://sandbox-api.timell.ru/v1/" },
    { q: "Как получить поддержку?", a: "Через форму обратной связи или email: support@timell.ru" },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-6">Часто задаваемые вопросы</h2>
      {faqs.map((f, i) => (
        <details key={i} className="group bg-muted/50 border border-border rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-foreground">
            {f.q}
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4 text-muted-foreground">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

function MethodBlock({ method, path, desc, params, body, response }: {
  method: "GET" | "POST";
  path: string;
  desc: string;
  params?: { name: string; type: string; desc: string }[];
  body?: string;
  response: string;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-4 bg-muted/50 border-b border-border">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold text-white ${method === "GET" ? "bg-emerald-500" : "bg-amber-500"}`}>
          {method}
        </span>
        <code className="text-sm font-mono text-foreground">{path}</code>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-muted-foreground">{desc}</p>
        {params && params.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Параметры:</h4>
            <div className="space-y-1">
              {params.map((p) => (
                <div key={p.name} className="flex gap-2 text-sm">
                  <code className="text-primary font-mono">{p.name}</code>
                  <span className="text-muted-foreground/60">({p.type})</span>
                  <span className="text-muted-foreground">— {p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {body && (
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Тело запроса:</h4>
            <JsonBlock json={body} />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-foreground mb-2 text-sm">Ответ:</h4>
          <JsonBlock json={response} />
        </div>
      </div>
    </div>
  );
}

function ExecutorsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">Исполнители</h2>
      <p className="text-muted-foreground mb-6">Методы для управления исполнителями: получение списка, приглашение новых, приглашение к заданиям.</p>

      <MethodBlock
        method="GET" path="/api/v1/executors" desc="Получение списка исполнителей, доступных заказчику."
        params={[
          { name: "limit", type: "integer", desc: "Количество результатов (макс. 100)" },
          { name: "offset", type: "integer", desc: "Смещение для пагинации" },
          { name: "status", type: "string", desc: "Фильтр: active, inactive, blocked" },
        ]}
        response={`{
  "data": [
    {
      "id": "12345",
      "name": "Иван Петров",
      "phone": "+7 999 123 45 67",
      "status": "active",
      "tax_status": "self_employed",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "total": 150,
  "limit": 20,
  "offset": 0
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/executors/invite" desc="Приглашение нового исполнителя в систему."
        body={`{
  "phone": "+7 999 123 45 67",
  "name": "Иван Петров",
  "email": "ivan@example.com"
}`}
        response={`{
  "id": "12345",
  "phone": "+7 999 123 45 67",
  "status": "invited",
  "invite_link": "https://timell.ru/join?token=abc123"
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/executors/invite-by-inn" desc="Приглашение исполнителя к заданию по ИНН."
        body={`{
  "inn": "123456789012",
  "task_id": "task_001"
}`}
        response={`{
  "executor_id": "12345",
  "task_id": "task_001",
  "status": "invited"
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/executors/invite-by-phone" desc="Приглашение исполнителя к заданию по телефону."
        body={`{
  "phone": "+7 999 123 45 67",
  "task_id": "task_001"
}`}
        response={`{
  "executor_id": "12345",
  "task_id": "task_001",
  "status": "invited"
}`}
      />
    </div>
  );
}

function TasksSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">Задания</h2>
      <p className="text-muted-foreground mb-6">Создание, получение и управление заданиями.</p>

      <MethodBlock
        method="GET" path="/api/v1/tasks" desc="Получение списка всех заданий."
        params={[
          { name: "limit", type: "integer", desc: "Количество результатов" },
          { name: "offset", type: "integer", desc: "Смещение" },
          { name: "status", type: "string", desc: "Фильтр: open, in_progress, completed, cancelled" },
        ]}
        response={`{
  "data": [
    {
      "id": "task_001",
      "title": "Курьерская доставка",
      "description": "Доставка посылки по адресу",
      "budget": 500,
      "status": "open",
      "deadline": "2026-04-01T18:00:00Z"
    }
  ],
  "total": 50,
  "limit": 20,
  "offset": 0
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/tasks" desc="Создание нового задания."
        body={`{
  "title": "Курьерская доставка",
  "description": "Доставка посылки по адресу",
  "budget": 500,
  "deadline": "2026-04-01T18:00:00Z",
  "executor_id": "12345"
}`}
        response={`{
  "id": "task_001",
  "title": "Курьерская доставка",
  "status": "open",
  "created_at": "2026-03-28T10:30:00Z"
}`}
      />
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">Выплаты</h2>
      <p className="text-muted-foreground mb-6">Формирование реестров выплат и проведение оплат.</p>

      <MethodBlock
        method="GET" path="/api/v1/payments/template" desc="Получение шаблона реестра для выплат."
        response={`{
  "template": {
    "columns": [
      "executor_phone",
      "executor_inn",
      "amount",
      "description",
      "task_id"
    ]
  }
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/payments/create" desc="Формирование реестра выплат с одним элементом."
        body={`{
  "executor_id": "12345",
  "amount": 500,
  "description": "Курьерская доставка",
  "task_id": "task_001"
}`}
        response={`{
  "payment_id": "pay_001",
  "status": "pending",
  "amount": 500
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/payments/process" desc="Оплата реестра по ID."
        body={`{
  "registry_id": "registry_001"
}`}
        response={`{
  "registry_id": "registry_001",
  "status": "processed",
  "total_amount": 5000,
  "processed_at": "2026-03-28T10:35:00Z"
}`}
      />
    </div>
  );
}

function BalanceSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">Баланс</h2>
      <p className="text-muted-foreground mb-6">Управление номинальным счётом заказчика.</p>

      <MethodBlock
        method="GET" path="/api/v1/balance" desc="Получение баланса заказчика."
        response={`{
  "balance": 50000,
  "currency": "RUB",
  "last_updated": "2026-03-28T10:30:00Z"
}`}
      />

      <MethodBlock
        method="POST" path="/api/v1/balance/deposit" desc="Начисление денежных средств на счет."
        body={`{
  "amount": 10000,
  "description": "Пополнение счета"
}`}
        response={`{
  "transaction_id": "txn_001",
  "amount": 10000,
  "status": "completed",
  "new_balance": 60000,
  "created_at": "2026-03-28T10:35:00Z"
}`}
      />
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">Документы</h2>
      <p className="text-muted-foreground mb-6">Получение актов, договоров, чеков и реестров.</p>

      <MethodBlock
        method="GET" path="/api/v1/documents/acts" desc="Получение закрывающих актов."
        params={[
          { name: "limit", type: "integer", desc: "Количество результатов" },
          { name: "offset", type: "integer", desc: "Смещение" },
        ]}
        response={`{
  "data": [
    {
      "id": "act_001",
      "number": "АКТ-001",
      "date": "2026-03-28",
      "amount": 5000,
      "status": "signed",
      "file_url": "https://timell.ru/documents/act_001.pdf"
    }
  ],
  "total": 10
}`}
      />

      <MethodBlock
        method="GET" path="/api/v1/documents/contracts" desc="Получение списка договоров."
        response={`{
  "data": [
    {
      "id": "contract_001",
      "number": "ДОГ-001",
      "date": "2026-01-01",
      "status": "active",
      "file_url": "https://timell.ru/documents/contract_001.pdf"
    }
  ],
  "total": 5
}`}
      />
    </div>
  );
}

/* ─── Main page ─── */

const ApiDocs = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [codeLang, setCodeLang] = useState<Lang>("cURL");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleSectionChange = useCallback((id: SectionId) => {
    setActiveSection(id);
    setSidebarOpen(false);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const currentIdx = sections.findIndex((s) => s.id === activeSection);
  const prevSection = currentIdx > 0 ? sections[currentIdx - 1] : null;
  const nextSection = currentIdx < sections.length - 1 ? sections[currentIdx + 1] : null;
  const currentSection = sections[currentIdx];

  const filteredSections = searchQuery
    ? sections.filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : sections;

  const renderContent = () => {
    switch (activeSection) {
      case "intro": return <IntroSection lang={codeLang} />;
      case "auth": return <AuthSection />;
      case "faq": return <FaqSection />;
      case "executors": return <ExecutorsSection />;
      case "tasks": return <TasksSection />;
      case "payments": return <PaymentsSection />;
      case "balance": return <BalanceSection />;
      case "documents": return <DocumentsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="container py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-sm text-primary font-medium mb-2">API Documentation</div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                API <span className="text-primary">Timell</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Интегрируйте платформу Timell в вашу систему и автоматизируйте работу с внештатным персоналом
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleSectionChange("intro")}>
                  Начать интеграцию
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://timell.ru" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Перейти на сайт <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={heroApi} alt="API Timell" className="w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Version bar + search */}
      <div className="border-b border-border bg-muted/30 sticky top-16 z-40">
        <div className="container flex items-center gap-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Версия:</span>
            <span className="bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-md text-xs">v1</span>
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по разделам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {/* Language tabs */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            {codeLangs.map((l) => (
              <button
                key={l}
                onClick={() => setCodeLang(l)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${codeLang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                {l}
              </button>
            ))}
          </div>
          {/* Mobile sidebar toggle */}
          <button className="lg:hidden ml-auto p-2 rounded-md hover:bg-muted" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <ChevronRight className={`h-5 w-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="container flex-1 flex gap-0 relative">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} fixed lg:sticky top-[8.5rem] left-0 z-30 h-[calc(100vh-8.5rem)] w-64 bg-background lg:bg-transparent border-r border-border lg:border-r-0 overflow-y-auto transition-transform lg:transition-none py-6 pr-4 pl-4 lg:pl-0 flex-shrink-0`}>
          <nav className="space-y-1">
            {filteredSections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSectionChange(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSection === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
              >
                <img src={s.icon} alt="" className="h-5 w-5 object-contain" />
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Content */}
        <main ref={contentRef} className="flex-1 py-8 lg:py-10 lg:pl-8 min-w-0">
          {/* Section illustration */}
          {currentSection.illustration && (
            <div className="mb-8 rounded-2xl overflow-hidden bg-muted/30 border border-border">
              <img src={currentSection.illustration} alt={currentSection.label} className="w-full max-h-64 object-contain p-4" />
            </div>
          )}

          {renderContent()}

          {/* Navigation between sections */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            {prevSection ? (
              <button onClick={() => handleSectionChange(prevSection.id)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="h-4 w-4" />
                {prevSection.label}
              </button>
            ) : <div />}
            {nextSection && (
              <button onClick={() => setActiveSection(nextSection.id)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                {nextSection.label}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Integrations & support */}
          {activeSection === "intro" && (
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Интеграция с системами</h3>
                <div className="flex flex-wrap gap-2">
                  {["1С Бухгалтерия", "1С УТ", "Битрикс24", "Asana", "Monday.com", "Jira", "Zapier"].map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-muted border border-border rounded-full text-sm text-muted-foreground">{s}</span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Готовы начать?</h3>
                <p className="text-muted-foreground mb-6">Получите API ключ и интегрируйте Timell за считанные минуты</p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>📧 api-support@timell.ru</span>
                  <span>📞 +7 (495) 123-45-67</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ApiDocs;
