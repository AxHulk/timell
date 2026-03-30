import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generateCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("8") && digits.length === 11) {
    return "7" + digits.slice(1);
  }
  return digits;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, phone, code } = await req.json();

    if (!phone) {
      return new Response(JSON.stringify({ error: "Номер телефона обязателен" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      return new Response(JSON.stringify({ error: "Некорректный номер телефона" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (action === "send") {
      // Rate limit: max 3 codes per phone per 10 minutes
      const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: recentCodes } = await supabase
        .from("sms_codes")
        .select("id")
        .eq("phone", normalizedPhone)
        .gte("created_at", tenMinAgo);

      if (recentCodes && recentCodes.length >= 3) {
        return new Response(
          JSON.stringify({ error: "Слишком много попыток. Подождите 10 минут." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const smsCode = generateCode();

      // Save code to DB
      await supabase.from("sms_codes").insert({
        phone: normalizedPhone,
        code: smsCode,
      });

      // Send via SMS Aero
      const smsEmail = Deno.env.get("SMSAERO_EMAIL");
      const smsApiKey = Deno.env.get("SMSAERO_API_KEY");

      if (!smsEmail?.trim() || !smsApiKey?.trim()) {
        return new Response(
          JSON.stringify({ error: "SMS сервис не настроен" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const cleanEmail = smsEmail.trim();
      const cleanKey = smsApiKey.trim();
      const auth = btoa(`${cleanEmail}:${cleanKey}`);
      const smsUrl = `https://gate.smsaero.ru/v2/sms/send?number=${normalizedPhone}&text=${encodeURIComponent(`Timell: ваш код подтверждения ${smsCode}`)}&sign=SMS%20Aero`;

      const smsResponse = await fetch(smsUrl, {
        method: "GET",
        headers: { Authorization: `Basic ${auth}` },
      });

      const smsResult = await smsResponse.json();

      if (!smsResult.success) {
        console.error("SMS Aero error:", smsResult);
        return new Response(
          JSON.stringify({ error: "Ошибка отправки SMS. Попробуйте позже." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Код отправлен" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "verify") {
      if (!code) {
        return new Response(JSON.stringify({ error: "Введите код" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: validCode } = await supabase
        .from("sms_codes")
        .select("*")
        .eq("phone", normalizedPhone)
        .eq("code", code)
        .eq("verified", false)
        .gte("created_at", fiveMinAgo)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!validCode) {
        // Increment attempts on latest code
        const { data: latest } = await supabase
          .from("sms_codes")
          .select("id, attempts")
          .eq("phone", normalizedPhone)
          .eq("verified", false)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (latest) {
          await supabase
            .from("sms_codes")
            .update({ attempts: (latest.attempts || 0) + 1 })
            .eq("id", latest.id);
        }

        return new Response(
          JSON.stringify({ error: "Неверный или просроченный код" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Mark as verified
      await supabase
        .from("sms_codes")
        .update({ verified: true })
        .eq("id", validCode.id);

      return new Response(
        JSON.stringify({ success: true, message: "Телефон подтверждён" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Неизвестное действие" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("SMS verify error:", err);
    return new Response(JSON.stringify({ error: "Внутренняя ошибка сервера" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
