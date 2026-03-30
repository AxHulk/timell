import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EXECUTOR_TAX = [
  { value: "self_employed", label: "Самозанятый" },
  { value: "individual", label: "Физическое лицо" },
  { value: "ip", label: "Индивидуальный предприниматель" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
  userId: string;
}

const CreateExecutorModal = ({ open, onOpenChange, onCreated, userId }: Props) => {
  const [taxStatus, setTaxStatus] = useState("");
  const [inn, setInn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bik, setBik] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!taxStatus || !inn || !firstName || !lastName || !bankAccount || !bik) {
      toast.error("Заполните все обязательные поля");
      return;
    }
    if (bankAccount.length !== 20) {
      toast.error("Расчётный счёт должен содержать 20 цифр");
      return;
    }
    if (bik.length !== 9) {
      toast.error("БИК должен содержать 9 цифр");
      return;
    }

    setLoading(true);
    try {
      // Add executor role
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: userId,
        role: "executor" as any,
      });
      if (roleError) throw roleError;

      // Update profile with executor data
      const { error: profileError } = await supabase.from("profiles").update({
        tax_status: taxStatus,
        bank_account: bankAccount,
        bik: bik,
      } as any).eq("user_id", userId);
      if (profileError) throw profileError;

      toast.success("Кабинет исполнителя создан!");
      onCreated();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Ошибка создания кабинета");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Создать кабинет исполнителя</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Налоговый статус *</Label>
            <Select value={taxStatus} onValueChange={setTaxStatus}>
              <SelectTrigger><SelectValue placeholder="Выберите статус" /></SelectTrigger>
              <SelectContent>
                {EXECUTOR_TAX.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">ИНН *</Label>
            <Input value={inn} onChange={(e) => setInn(e.target.value.replace(/\D/g, "").slice(0, 12))} placeholder="Введите ИНН" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Фамилия *</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Имя *</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Отчество</Label>
            <Input value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
          </div>

          <div className="pt-2 border-t border-border">
            <h4 className="font-semibold text-sm mb-3">Реквизиты для оплаты</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Расчётный счёт *</Label>
                <Input value={bankAccount} onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, "").slice(0, 20))} placeholder="40802810100002090198" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">БИК банка *</Label>
                <Input value={bik} onChange={(e) => setBik(e.target.value.replace(/\D/g, "").slice(0, 9))} placeholder="044525232" />
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Создание..." : "Создать кабинет"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExecutorModal;
