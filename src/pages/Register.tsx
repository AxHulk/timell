import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneInput } from "@/components/PhoneInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import executorIcon from "@/assets/icon-executor.png";
import clientIcon from "@/assets/icon-client.png";
import logoImg from "@/assets/logo-horizontal.png";

type Role = "executor" | "client";

const CLIENT_OPF = [
  { value: "ip", label: "Индивидуальный предприниматель" },
  { value: "ooo", label: "Общество с ограниченной ответственностью" },
  { value: "pao", label: "Публичное акционерное общество" },
];

const EXECUTOR_TAX = [
  { value: "self_employed", label: "Самозанятый или хочу стать самозанятым" },
  { value: "individual", label: "Физическое лицо" },
  { value: "ip", label: "Индивидуальный предприниматель" },
  { value: "ooo", label: "Общество с ограниченной ответственностью" },
  { value: "pao", label: "Публичное акционерное общество" },
];

const STEPS_CLIENT = ["ОПФ и ИНН", "Подтверждение", "Данные профиля", "Завершение"];
const STEPS_EXECUTOR = ["Общие данные", "Подтверждение", "Данные профиля", "Завершение"];

interface FormData {
  role: Role | null;
  opf: string;
  taxStatus: string;
  inn: string;
  phone: string;
  phoneCode: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  companyName: string;
  noPatronymic: boolean;
  agreeTerms: boolean;
  agreePersonalData: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [form, setForm] = useState<FormData>({
    role: null, opf: "", taxStatus: "", inn: "",
    phone: "+7", phoneCode: "", firstName: "", lastName: "", patronymic: "",
    companyName: "", noPatronymic: false, agreeTerms: false, agreePersonalData: false,
  });

  const update = (fields: Partial<FormData>) => setForm((p) => ({ ...p, ...fields }));
  const steps = form.role === "client" ? STEPS_CLIENT : STEPS_EXECUTOR;

  const handleSendCode = async () => {
    if (!form.phone || form.phone.length < 12) { toast.error("Введите номер телефона"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("sms-verify", {
        body: { action: "send", phone: form.phone },
      });
      if (error || !data?.success) {
        toast.error(data?.error || "Ошибка отправки SMS");
      } else {
        setCodeSent(true);
        toast.success("Код отправлен на ваш номер");
      }
    } catch {
      toast.error("Ошибка соединения");
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    if (!form.phoneCode) { toast.error("Введите код"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("sms-verify", {
        body: { action: "verify", phone: form.phone, code: form.phoneCode },
      });
      if (error || !data?.success) {
        toast.error(data?.error || "Неверный код");
      } else {
        toast.success("Телефон подтверждён!");
        setStep(3);
      }
    } catch {
      toast.error("Ошибка соединения");
    }
    setLoading(false);
  };

  const handleComplete = async () => {
    setLoading(true);

    // Sign up with phone number (no fake email)
    const tempPassword = crypto.randomUUID();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      phone: form.phone,
      password: tempPassword,
    });

    if (signUpError || !signUpData.user) {
      toast.error("Ошибка создания аккаунта: " + (signUpError?.message || ""));
      setLoading(false);
      return;
    }

    const userId = signUpData.user.id;

    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: userId,
      opf: form.role === "client" ? form.opf : null,
      tax_status: form.role === "executor" ? form.taxStatus : null,
      inn: form.inn,
      phone: form.phone,
      first_name: form.firstName,
      last_name: form.lastName,
      patronymic: form.noPatronymic ? null : form.patronymic,
      company_name: form.companyName || null,
    });

    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: userId,
      role: form.role!,
    });

    setLoading(false);
    if (profileError || roleError) {
      toast.error("Ошибка сохранения: " + (profileError?.message || roleError?.message));
      return;
    }
    toast.success("Регистрация завершена!");
    setStep(4);
  };

  // Step 0: Role selection
  if (step === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
        <a href="/" className="mb-8"><img src={logoImg} alt="Timell" className="h-10" /></a>
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8 sm:p-12 max-w-xl w-full">
          <h1 className="text-2xl font-bold text-center mb-8 font-display">Выбор типа профиля</h1>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {([
              { role: "executor" as Role, icon: executorIcon, title: "Стать исполнителем", desc: "Выполнять задания\nи зарабатывать деньги" },
              { role: "client" as Role, icon: clientIcon, title: "Стать заказчиком", desc: "Размещать задания\nи проводить выплаты" },
            ]).map((opt) => (
              <button
                key={opt.role}
                onClick={() => update({ role: opt.role })}
                className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all hover:shadow-md ${form.role === opt.role ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              >
                <img src={opt.icon} alt={opt.title} className="w-20 h-20 mb-4 object-contain" />
                <span className="font-semibold text-foreground">{opt.title}</span>
                <span className="text-sm text-muted-foreground mt-1 whitespace-pre-line text-center">{opt.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/")}>Отменить регистрацию</Button>
            <Button disabled={!form.role} onClick={() => setStep(1)} className="bg-primary">Следующий шаг</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center p-4 pt-8">
      <a href="/" className="mb-6"><img src={logoImg} alt="Timell" className="h-10" /></a>

      {/* Progress stepper */}
      <div className="max-w-2xl w-full mb-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            return (
              <div key={s} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {i > 0 && <div className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
                  <div className={`w-3 h-3 rounded-full shrink-0 ${i < step ? "bg-primary" : i === step ? "bg-primary ring-4 ring-primary/20" : "bg-border"}`} />
                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step - 1 ? "bg-primary" : "bg-border"}`} />}
                </div>
                <span className={`text-xs mt-1 text-center ${i === step ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                  {stepNum} шаг<br /><span className="text-[10px]">{s}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-8 max-w-xl w-full">
        {/* Step 1: OPF/Tax + INN */}
        {step === 1 && (
          <div>
            {form.role === "client" ? (
              <>
                <h2 className="text-xl font-bold mb-6">Организационно-правовая форма</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Выберите тип ОПФ</Label>
                    <Select value={form.opf} onValueChange={(v) => update({ opf: v })}>
                      <SelectTrigger><SelectValue placeholder="Выберите тип ОПФ" /></SelectTrigger>
                      <SelectContent>
                        {CLIENT_OPF.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input placeholder="Укажите свой ИНН" value={form.inn} onChange={(e) => update({ inn: e.target.value })} />
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" checked={form.agreeTerms} onCheckedChange={(c) => update({ agreeTerms: !!c })} />
                    <Label htmlFor="terms" className="text-sm">Я прочитал и принимаю условия <a href="/legal/customer-agreement" target="_blank" className="text-primary underline">Соглашения с Заказчиком</a></Label>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6">Налоговый статус</h2>
                <RadioGroup value={form.taxStatus} onValueChange={(v) => update({ taxStatus: v })} className="space-y-3 mb-4">
                  {EXECUTOR_TAX.map((t) => (
                    <div key={t.value} className="flex items-center gap-3">
                      <RadioGroupItem value={t.value} id={t.value} />
                      <Label htmlFor={t.value}>{t.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Input placeholder="Укажите свой ИНН" value={form.inn} onChange={(e) => update({ inn: e.target.value })} />
              </>
            )}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(0)}>Предыдущий шаг</Button>
              <Button
                disabled={form.role === "client" ? (!form.opf || !form.inn || !form.agreeTerms) : (!form.taxStatus || !form.inn)}
                onClick={() => setStep(2)}
              >Следующий шаг</Button>
            </div>
          </div>
        )}

        {/* Step 2: Phone verification */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Подтверждение телефона</h2>
            <p className="text-muted-foreground mb-6">Введите ваш номер телефона, на который поступит СМС с кодом подтверждения</p>
            <div className="space-y-4">
              <div>
                <Label>Ваше имя</Label>
                <Input placeholder="Имя" value={form.firstName} onChange={(e) => update({ firstName: e.target.value })} />
              </div>
              <div>
                <Label>Номер телефона</Label>
                <PhoneInput value={form.phone} onChange={(v) => update({ phone: v })} />
              </div>
              {codeSent && (
                <div>
                  <Label>Код подтверждения</Label>
                  <Input placeholder="Введите код" value={form.phoneCode} onChange={(e) => update({ phoneCode: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">Код действителен 5 минут</p>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Checkbox id="pd" checked={form.agreePersonalData} onCheckedChange={(c) => update({ agreePersonalData: !!c })} />
                <Label htmlFor="pd" className="text-xs leading-relaxed cursor-pointer">
                  Я свободно, своей волей и в своем интересе даю конкретное, информированное и сознательное согласие на обработку моих персональных данных и полностью принимаю условия{" "}
                  <a href="/documents/privacy-policy" target="_blank" className="text-primary underline">Политики конфиденциальности</a>
                </Label>
              </div>
            </div>
            <div className="mt-6">
              {!codeSent ? (
                <Button className="w-full" onClick={handleSendCode} disabled={loading || form.phone.length < 12 || !form.agreePersonalData || !form.firstName}>
                  {loading ? "Отправка..." : "Получить код"}
                </Button>
              ) : (
                <Button className="w-full" onClick={handleVerifyCode} disabled={loading}>
                  {loading ? "Проверка..." : "Подтвердить"}
                </Button>
              )}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Регистрируясь, вы принимаете условия <a href="/documents/user-agreement" target="_blank" className="underline">Пользовательского соглашения</a> и подтверждаете ознакомление с <a href="/documents/privacy-policy" target="_blank" className="underline">Политикой конфиденциальности</a>
            </p>
          </div>
        )}

        {/* Step 3: Profile data */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Заполнение профиля</h2>
            <p className="text-muted-foreground mb-6">Внимательно проверьте заполненные поля ниже</p>
            <div className="space-y-4">
              <div>
                <Label>Фамилия</Label>
                <Input placeholder="Фамилия" value={form.lastName} onChange={(e) => update({ lastName: e.target.value })} />
              </div>
              <div>
                <Label>Имя</Label>
                <Input placeholder="Имя" value={form.firstName} onChange={(e) => update({ firstName: e.target.value })} />
              </div>
              <div>
                <Label>Отчество</Label>
                <Input placeholder="Отчество" value={form.patronymic} onChange={(e) => update({ patronymic: e.target.value })} disabled={form.noPatronymic} />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="nopat" checked={form.noPatronymic} onCheckedChange={(c) => update({ noPatronymic: !!c })} />
                <Label htmlFor="nopat" className="text-sm">По паспорту без отчества</Label>
              </div>
              {(form.opf || ["ip", "ooo", "pao"].includes(form.taxStatus)) && (
                <div>
                  <Label>Название компании</Label>
                  <Input placeholder="Название" value={form.companyName} onChange={(e) => update({ companyName: e.target.value })} />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => { setStep(2); setCodeSent(false); }}>Предыдущий шаг</Button>
              <Button onClick={handleComplete} disabled={loading || !form.lastName || !form.firstName}>
                {loading ? "Сохранение..." : "Следующий шаг"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Спасибо за регистрацию!</h2>
            <p className="text-muted-foreground mb-6">
              Спасибо! Ваша регистрация в сервисе Timell успешно завершена. После проверки вашего профиля модератором вы
              сможете публиковать и выполнять задания. Пока модератор проверяет профиль вы можете создать задание или найти
              подходящее вам задание.
            </p>
            <Button className="w-full" onClick={() => navigate("/dashboard")}>Завершить регистрацию</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
