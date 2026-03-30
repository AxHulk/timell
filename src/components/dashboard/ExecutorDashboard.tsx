import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, FolderOpen, Plus } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  opf: string | null;
  tax_status: string | null;
  inn: string | null;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  patronymic: string | null;
  company_name: string | null;
  balance: number;
  commission_rate: number;
  status: string;
  created_at: string;
  bank_account?: string | null;
  bik?: string | null;
}

const TAX_LABELS: Record<string, string> = {
  self_employed: "Самозанятый",
  individual: "Физическое лицо",
  ip: "Индивидуальный предприниматель",
  ooo: "ООО",
  pao: "ПАО",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  moderation: { label: "Модерация", color: "bg-amber-100 text-amber-700" },
  active: { label: "Активен", color: "bg-green-100 text-green-700" },
  blocked: { label: "Заблокирован", color: "bg-red-100 text-red-700" },
};

interface Props {
  profile: Profile;
  userEmail: string;
}

const TASK_STATUSES = [
  { label: "Все задания", color: "bg-muted-foreground", count: 0 },
  { label: "В работе", color: "bg-green-500", count: 0 },
  { label: "Ожидает приёмки", color: "bg-amber-500", count: 0 },
  { label: "Отправлено в арбитраж", color: "bg-red-500", count: 0 },
  { label: "Ожидает подписания акта", color: "bg-foreground", count: 0 },
  { label: "Завершено", color: "bg-green-500", count: 0 },
];

const ExecutorDashboard = ({ profile, userEmail }: Props) => {
  const fullName = [profile.last_name, profile.first_name, profile.patronymic].filter(Boolean).join(" ") || "Исполнитель";
  const taxLabel = profile.tax_status ? TAX_LABELS[profile.tax_status] || profile.tax_status : "";
  const statusInfo = STATUS_LABELS[profile.status] || STATUS_LABELS.moderation;

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-4 p-0 h-auto">
        {["summary", "finances", "invitations", "documents"].map((val) => (
          <TabsTrigger
            key={val}
            value={val}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-2"
          >
            {{ summary: "Сводка", finances: "Мои финансы", invitations: "Приглашения", documents: "Документы" }[val]}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Сводка */}
      <TabsContent value="summary" className="pt-6">
        <div className="flex gap-6">
          {/* Left summary cards */}
          <div className="w-72 space-y-3 shrink-0">
            <div className="border border-border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Документы</p>
                  <p className="text-xs text-muted-foreground">Всё подписано</p>
                </div>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
            <div className="border border-border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Приглашения</p>
                  <p className="text-xs text-muted-foreground">Приглашений нет</p>
                </div>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
            <div className="border border-border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Мои финансы</p>
                  <p className="text-xs text-muted-foreground">Получено 0 ₽</p>
                </div>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
          </div>

          {/* Tasks */}
          <div className="flex-1">
            <h3 className="font-bold mb-4">Мои задания</h3>
            <div className="space-y-0">
              {TASK_STATUSES.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 px-2 rounded">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                    <span className="text-sm">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">{s.count}</span>
                    <span>›</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Мои финансы */}
      <TabsContent value="finances" className="pt-6">
        <h3 className="text-lg font-bold mb-4">Мои финансы</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Баланс</p>
            <p className="text-2xl font-bold mt-1">{profile.balance || 0} ₽</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Получено за месяц</p>
            <p className="text-2xl font-bold mt-1">0 ₽</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Получено за всё время</p>
            <p className="text-2xl font-bold mt-1">0 ₽</p>
          </div>
        </div>

        <h4 className="font-semibold mb-3">Реквизиты для оплаты</h4>
        <div className="border border-border rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Расчётный счёт</span>
            <span className="text-sm font-medium">{(profile as any).bank_account || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">БИК банка</span>
            <span className="text-sm font-medium">{(profile as any).bik || "—"}</span>
          </div>
        </div>
      </TabsContent>

      {/* Приглашения */}
      <TabsContent value="invitations" className="pt-6">
        <h3 className="text-lg font-bold mb-4">Приглашения</h3>
        <div className="border border-border rounded-lg p-8 text-center text-muted-foreground text-sm">
          <FolderOpen className="h-10 w-10 mx-auto mb-2 opacity-50" />
          Приглашений нет
        </div>
      </TabsContent>

      {/* Документы */}
      <TabsContent value="documents" className="pt-6">
        <h3 className="text-lg font-bold mb-4">Мои документы</h3>
        <div className="flex gap-2 mb-4">
          {["Ждут подписи", "Подписанные", "Отклонённые", "Договоры с заказчиками"].map((f, i) => (
            <Button key={f} variant={i === 0 ? "default" : "outline"} size="sm" className="text-xs">
              {f}
            </Button>
          ))}
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-muted/50 text-xs text-muted-foreground font-medium">
            <span>Дата</span><span>Документ</span><span>Заказчик</span><span className="text-right">Действия</span>
          </div>
          <div className="p-8 text-center text-muted-foreground text-sm">
            <FolderOpen className="h-10 w-10 mx-auto mb-2 opacity-50" />
            Нет данных
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ExecutorDashboard;
