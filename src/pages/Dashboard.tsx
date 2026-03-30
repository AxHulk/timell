import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LogOut, FileText, Plus, Search, AlertCircle, Briefcase, Link2, Clock, Shield, ChevronDown, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logoImg from "@/assets/logo-horizontal.png";
import ExecutorDashboard from "@/components/dashboard/ExecutorDashboard";
import ExecutorProfile from "@/components/dashboard/ExecutorProfile";
import CreateExecutorModal from "@/components/dashboard/CreateExecutorModal";

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

const OPF_LABELS: Record<string, string> = {
  ip: "ИП", ooo: "ООО", pao: "ПАО",
};

const TAX_LABELS: Record<string, string> = {
  self_employed: "Самозанятый", individual: "Физическое лицо", ip: "ИП", ooo: "ООО", pao: "ПАО",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [activeRole, setActiveRole] = useState<string>("client");
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showCreateExecutor, setShowCreateExecutor] = useState(false);
  const [sidebarPage, setSidebarPage] = useState<string>("main");

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/login"); return; }
    setUserEmail(user.email || "");

    const { data: profileData } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
    if (profileData) setProfile(profileData as unknown as Profile);

    const { data: rolesData } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
    if (rolesData) {
      const roles = rolesData.map((r: any) => r.role);
      setUserRoles(roles);
      if (roles.length === 1) setActiveRole(roles[0]);
    }

    setLoading(false);
  };

  useEffect(() => { loadData(); }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка...</div>;
  }

  const fullName = [profile?.last_name, profile?.first_name, profile?.patronymic].filter(Boolean).join(" ") || "Пользователь";
  const isClient = activeRole === "client";
  const isExecutor = activeRole === "executor";
  const hasExecutorRole = userRoles.includes("executor");
  const hasClientRole = userRoles.includes("client");

  const roleLabel = isClient ? "Заказчик" : "Исполнитель";
  const opfLabel = profile?.opf ? OPF_LABELS[profile.opf] || profile.opf : (profile?.tax_status ? TAX_LABELS[profile.tax_status] || profile.tax_status : "");
  const displayName = opfLabel ? `${opfLabel} ${fullName}` : fullName;

  const sidebarItems = isExecutor
    ? [
        { id: "main", icon: Briefcase, label: "Мой Timell" },
        { id: "tasks", icon: FileText, label: "Задания" },
        { id: "profile", icon: User, label: "Профиль" },
      ]
    : [
        { id: "main", icon: User, label: "Профиль" },
      ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <a href="/"><img src={logoImg} alt="Timell" className="h-8" /></a>
        <div className="flex items-center gap-3">
          {/* Role switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-sm h-auto py-1.5 px-3">
                <span className="hidden sm:inline font-medium">{displayName}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {hasClientRole && (
                <DropdownMenuItem
                  onClick={() => { setActiveRole("client"); setSidebarPage("main"); }}
                  className={activeRole === "client" ? "bg-primary/5" : ""}
                >
                  <div>
                    <p className="font-medium text-sm">Заказчик</p>
                    <p className="text-xs text-muted-foreground">{opfLabel} {fullName}</p>
                  </div>
                </DropdownMenuItem>
              )}
              {hasExecutorRole && (
                <DropdownMenuItem
                  onClick={() => { setActiveRole("executor"); setSidebarPage("main"); }}
                  className={activeRole === "executor" ? "bg-primary/5" : ""}
                >
                  <div>
                    <p className="font-medium text-sm">Исполнитель</p>
                    <p className="text-xs text-muted-foreground">{fullName}</p>
                  </div>
                </DropdownMenuItem>
              )}
              {!hasExecutorRole && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowCreateExecutor(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Создать кабинет исполнителя
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
        <aside className="hidden md:flex flex-col w-56 border-r border-border bg-card min-h-[calc(100vh-57px)] p-4 justify-between">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSidebarPage(item.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${
                  sidebarPage === item.id ? "bg-primary/5 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-border">
            <a href="/freelancer-knowledge" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <FileText className="h-4 w-4" /> База знаний
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl">
          {/* Executor views */}
          {isExecutor && sidebarPage === "main" && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3">Новые продукты и обновления</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { icon: Briefcase, title: "Зарплата", desc: "Как выгоднее проводить платежи по трудовым договорам?" },
                    { icon: Link2, title: "Интеграция с 1С", desc: "Проводите выплаты и получайте закрывающие документы в 1С" },
                    { icon: Clock, title: "Подбор за 48 часов", desc: "Сократим расходы на подбор линейного персонала до 70%" },
                    { icon: Shield, title: "Страхование", desc: "Выплаты при несчастном случае и нетрудоспособности" },
                  ].map((c) => (
                    <div key={c.title} className="border border-border rounded-lg p-4 bg-card hover:shadow-sm transition-shadow">
                      <c.icon className="h-5 w-5 text-primary mb-2" />
                      <h3 className="font-semibold text-sm">{c.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <ExecutorDashboard profile={profile!} userEmail={userEmail} />
            </>
          )}
          {isExecutor && sidebarPage === "profile" && (
            <ExecutorProfile profile={profile!} userEmail={userEmail} />
          )}
          {isExecutor && sidebarPage === "tasks" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Задания</h2>
              <div className="border border-border rounded-lg p-8 text-center text-muted-foreground text-sm">
                У вас пока нет заданий
              </div>
            </div>
          )}

          {/* Client view */}
          {isClient && (
            <>
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

                  {!hasExecutorRole && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-primary">Исполнители</h4>
                      </div>
                      <button
                        onClick={() => setShowCreateExecutor(true)}
                        className="w-full border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <UserPlus className="h-4 w-4" /> Создать кабинет исполнителя
                      </button>
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
            </>
          )}
        </main>
      </div>

      {/* Create executor modal */}
      {profile && (
        <CreateExecutorModal
          open={showCreateExecutor}
          onOpenChange={setShowCreateExecutor}
          onCreated={loadData}
          userId={profile.user_id}
        />
      )}
    </div>
  );
};

export default Dashboard;
