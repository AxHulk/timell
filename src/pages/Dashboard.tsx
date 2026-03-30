import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LayoutDashboard, LogOut, FileText, Plus, Search, AlertCircle, Briefcase, Link2, Clock, Shield } from "lucide-react";
import { toast } from "sonner";
import logoImg from "@/assets/logo-horizontal.png";

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
}

interface UserRole {
  role: string;
}

const OPF_LABELS: Record<string, string> = {
  ip: "ИП", ooo: "ООО", pao: "ПАО",
};

const TAX_LABELS: Record<string, string> = {
  self_employed: "Самозанятый", individual: "Физическое лицо", ip: "ИП", ooo: "ООО", pao: "ПАО",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      setUserEmail(user.email || "");

      const { data: profileData } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (profileData) setProfile(profileData as Profile);

      const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
      if (roleData) setUserRole((roleData as UserRole).role);

      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка...</div>;
  }

  const fullName = [profile?.last_name, profile?.first_name, profile?.patronymic].filter(Boolean).join(" ") || "Пользователь";
  const roleLabel = userRole === "client" ? "Заказчик" : "Исполнитель";
  const opfLabel = profile?.opf ? OPF_LABELS[profile.opf] || profile.opf : (profile?.tax_status ? TAX_LABELS[profile.tax_status] || profile.tax_status : "");
  const displayName = opfLabel ? `${opfLabel} ${fullName}` : fullName;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <a href="/"><img src={logoImg} alt="Timell" className="h-8" /></a>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {(profile?.first_name?.[0] || "T").toUpperCase()}
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Выйти"><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>

      {/* Moderation banner */}
      {profile?.status === "moderation" && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center gap-2 text-amber-800 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Ваш аккаунт находится на модерации. Доступ к некоторым функциям временно ограничен до завершения проверки.
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-border bg-card min-h-[calc(100vh-57px)] p-4">
          <nav className="space-y-1">
            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-primary/5 text-primary">
              <User className="h-4 w-4" /> Профиль
            </a>
          </nav>
          <div className="mt-auto pt-4 border-t border-border">
            <a href="/freelancer-knowledge" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <FileText className="h-4 w-4" /> База знаний
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl">
          {/* Product cards banner */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Новые продукты и обновления</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              {[
                { icon: Briefcase, title: "Зарплата", desc: "Как выгоднее проводить платежи по трудовым договорам?" },
                { icon: Link2, title: "Интеграция с 1С", desc: "Проводите выплаты и получайте все необходимые закрывающие документы прямо в 1С" },
                { icon: Clock, title: "Подбор исполнителей за 48 часов", desc: "Сократим расходы на подбор и управление линейным персоналом до 70%" },
                { icon: Shield, title: "Страхование исполнителей", desc: "Выплаты при несчастном случае и временной нетрудоспособности" },
              ].map((c) => (
                <div key={c.title} className="border border-border rounded-lg p-4 bg-card hover:shadow-sm transition-shadow">
                  <c.icon className="h-5 w-5 text-primary mb-2" />
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-4 p-0 h-auto">
              <TabsTrigger value="user" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-2">
                Пользователь
              </TabsTrigger>
              <TabsTrigger value="summary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-2">
                Сводка
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="pt-6">
              <h3 className="text-lg font-bold mb-4">Данные пользователя</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs text-muted-foreground">Имя пользователя</label>
                  <Input value={profile?.first_name || ""} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">E-mail</label>
                  <Input value={userEmail} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Номер телефона</label>
                  <Input value={profile?.phone || ""} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Роль</label>
                  <Input value={roleLabel} readOnly className="bg-muted/50" />
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4 pt-4 border-t border-border">Доступные личные кабинеты</h3>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Поиск по названию, ИНН" className="pl-9" />
                </div>
              </div>

              {userRole === "executor" ? (
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-2">Исполнитель</h4>
                  <div className="border border-border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{fullName}</p>
                      {profile?.inn && <p className="text-xs text-muted-foreground">ИНН: {profile.inn}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground">{opfLabel}</span>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary">Заказчики</h4>
                    <Button variant="outline" size="sm"><Plus className="h-3 w-3 mr-1" /> Добавить заказчика</Button>
                  </div>
                  <div className="border border-border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                        {(profile?.last_name?.[0] || "T").toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{displayName}</p>
                        {profile?.inn && <p className="text-xs text-muted-foreground">ИНН: {profile.inn}</p>}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Владелец аккаунта</span>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="summary" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">Баланс</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-3xl font-bold">{profile?.balance || 0} ₽</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full"><Plus className="h-4 w-4" /></Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">🔒 0 ₽</p>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">Анкета {roleLabel.toLowerCase()}а</a>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold">Комиссии</h3>
                <p className="text-xs text-muted-foreground">в том числе НДС 22% (с 01.01.2026)</p>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">СМЗ</p>
                  <p className="text-xl font-bold">{profile?.commission_rate}% <span className="text-sm font-normal text-muted-foreground">(мин 59.78 ₽)</span></p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Ваши документы</h3>
                <div className="border border-border rounded-lg p-4 inline-flex items-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Договор</p>
                    <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString("ru-RU")}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">Сотрудники</h3>
                  <Button variant="outline" size="sm"><Plus className="h-3 w-3 mr-1" /> Добавить сотрудника</Button>
                </div>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Поиск по ФИО, телефону" className="pl-9" />
                </div>
                <div className="border border-border rounded-lg p-6 text-center text-muted-foreground text-sm">
                  Сотрудники пока не добавлены
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
