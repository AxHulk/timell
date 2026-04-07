import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD")!;

const SMTP_HOST = "mail.timell.ru";
const SMTP_PORT = 465;
const SMTP_USER = "info@timell.ru";
const NOTIFY_TO = "info@timell.ru";

// Minimal SMTP client over TLS for Deno
async function sendEmail(to: string, subject: string, html: string) {
  const conn = await Deno.connectTls({ hostname: SMTP_HOST, port: SMTP_PORT });
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  async function read(): Promise<string> {
    const buf = new Uint8Array(4096);
    const n = await conn.read(buf);
    return n ? decoder.decode(buf.subarray(0, n)) : "";
  }

  async function write(cmd: string) {
    await conn.write(encoder.encode(cmd + "\r\n"));
  }

  async function cmd(command: string, expectCode?: number): Promise<string> {
    await write(command);
    const resp = await read();
    if (expectCode && !resp.startsWith(String(expectCode))) {
      throw new Error(`SMTP error on "${command}": ${resp.trim()}`);
    }
    return resp;
  }

  // Read greeting
  const greeting = await read();
  if (!greeting.startsWith("220")) throw new Error("SMTP greeting failed: " + greeting);

  await cmd("EHLO timell.ru", 250);

  // AUTH LOGIN
  await cmd("AUTH LOGIN", 334);
  await cmd(btoa(SMTP_USER), 334);
  await cmd(btoa(SMTP_PASSWORD), 235);

  await cmd(`MAIL FROM:<${SMTP_USER}>`, 250);
  await cmd(`RCPT TO:<${to}>`, 250);
  await cmd("DATA", 354);

  const boundary = "----=_Part_" + crypto.randomUUID().replace(/-/g, "");
  const message = [
    `From: Timell <${SMTP_USER}>`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    btoa(unescape(encodeURIComponent(html))),
    ``,
    `--${boundary}--`,
    `.`,
  ].join("\r\n");

  await cmd(message, 250);
  await cmd("QUIT");
  conn.close();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch un-notified leads
    const { data: leads, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .eq("is_notified", false)
      .order("created_at", { ascending: true })
      .limit(50);

    if (fetchError) throw fetchError;
    if (!leads || leads.length === 0) {
      return new Response(JSON.stringify({ message: "No new leads" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: { id: string; status: string; error?: string }[] = [];

    for (const lead of leads) {
      const html = `
        <h2>Новая заявка с сайта Timell</h2>
        <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;">Источник:</td><td style="padding:8px;">${lead.source || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Имя:</td><td style="padding:8px;">${lead.name || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Телефон:</td><td style="padding:8px;">${lead.phone || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${lead.email || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Компания:</td><td style="padding:8px;">${lead.company || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Кол-во исполнителей:</td><td style="padding:8px;">${lead.team_size || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Сообщение:</td><td style="padding:8px;">${lead.message || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Страница:</td><td style="padding:8px;">${lead.page_url || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Дата:</td><td style="padding:8px;">${new Date(lead.created_at).toLocaleString("ru-RU")}</td></tr>
        </table>
      `;

      const subject = `Новая заявка: ${lead.name || "Без имени"} — ${lead.source}`;

      try {
        await sendEmail(NOTIFY_TO, subject, html);

        await supabase
          .from("leads")
          .update({ is_notified: true })
          .eq("id", lead.id);

        results.push({ id: lead.id, status: "sent" });
      } catch (emailErr) {
        console.error(`Failed to send for lead ${lead.id}:`, emailErr);
        results.push({ id: lead.id, status: "failed", error: String(emailErr) });
      }
    }

    return new Response(JSON.stringify({ processed: results.length, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-leads error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
