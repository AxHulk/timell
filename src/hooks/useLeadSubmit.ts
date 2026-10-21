import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  team_size?: string;
  message?: string;
  source?: string;
}

export function useLeadSubmit() {
  const [submitting, setSubmitting] = useState(false);

  const submitLead = async (data: LeadData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        ...data,
        source: data.source || "website",
        page_url: window.location.pathname,
      });
      if (error) throw error;
      // Мгновенная отправка уведомления (не блокирует пользователя)
      supabase.functions.invoke("notify-leads", { body: {} }).catch((e) =>
        console.error("notify-leads invoke error:", e)
      );
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      return true;
    } catch (e) {
      console.error("Lead submit error:", e);
      toast.error("Не удалось отправить заявку. Попробуйте позже.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitLead, submitting };
}
