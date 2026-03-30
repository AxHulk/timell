import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

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

const STATUS_COLORS: Record<string, string> = {
  moderation: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  blocked: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  moderation: "Модерация",
  active: "Активен",
  blocked: "Заблокирован",
};

interface Props {
  profile: Profile;
  userEmail: string;
}

const ExecutorProfile = ({ profile, userEmail }: Props) => {
  const fullName = [profile.last_name, profile.first_name, profile.patronymic].filter(Boolean).join(" ") || "Исполнитель";
  const taxLabel = profile.tax_status ? TAX_LABELS[profile.tax_status] || profile.tax_status : "";
  const statusColor = STATUS_COLORS[profile.status] || STATUS_COLORS.moderation;
  const statusLabel = STATUS_LABELS[profile.status] || "Модерация";
  const initials = ((profile.first_name?.[0] || "") + (profile.last_name?.[0] || "")).toUpperCase() || "И";

  return (
    <div className="space-y-6">
      {/* My Profile + Payment Details */}
      <div className="border border-border rounded-lg p-5 flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Мой профиль</h3>
            <button className="text-sm text-primary hover:underline">Изменить</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {initials}
            </div>
            <div>
              <p className="font-semibold">{profile.first_name || "Пользователь"}</p>
              <p className="text-sm text-muted-foreground">{profile.phone || userEmail}</p>
            </div>
          </div>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Реквизиты для оплаты</h3>
            <button className="text-sm text-primary hover:underline">Подробнее</button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Расчётный счёт</span>
              <p className="font-medium">{(profile as any).bank_account || "—"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">БИК банка</span>
              <p className="font-medium">{(profile as any).bik || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Executor Data */}
      <div>
        <h3 className="font-bold mb-3">Данные исполнителя</h3>
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{taxLabel || "Исполнитель"}</p>
              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${statusColor}`}>{statusLabel}</span>
              <p className="text-xs text-muted-foreground mt-1">
                {profile.status === "active" ? "Всё отлично. Вы можете выполнять задания и получать выплаты" : "Ваш профиль находится на проверке"}
              </p>
            </div>
            <span className="text-muted-foreground">›</span>
          </div>
        </div>
      </div>

      {/* Executor card */}
      <div>
        <h3 className="font-bold mb-3">Исполнитель</h3>
        <div className="border-2 border-primary/20 rounded-lg p-4 flex items-center justify-between bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {initials}
            </div>
            <div>
              <p className="font-medium text-sm">{taxLabel ? `${taxLabel === "Индивидуальный предприниматель" ? "ИП" : taxLabel} ${fullName}` : fullName}</p>
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${statusColor}`}>{statusLabel}</span>
            </div>
          </div>
          <div className="text-right text-sm">
            {profile.inn && <p className="text-muted-foreground">ИНН <span className="font-medium text-foreground">{profile.inn}</span></p>}
            <p className="text-muted-foreground">{taxLabel}</p>
          </div>
        </div>
      </div>

      {/* Clients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Заказчики</h3>
          <Button variant="outline" size="sm"><Plus className="h-3 w-3 mr-1" /> Добавить заказчика</Button>
        </div>
        <div className="border border-border rounded-lg p-4 text-center text-muted-foreground text-sm">
          Заказчики пока не добавлены
        </div>
      </div>
    </div>
  );
};

export default ExecutorProfile;
