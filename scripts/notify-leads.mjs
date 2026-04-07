#!/usr/bin/env node
// Скрипт для отправки email-уведомлений о новых заявках с сайта
// Запускается на VPS через cron каждые 5 минут:
// */5 * * * * /usr/bin/node /var/www/timell/scripts/notify-leads.mjs >> /var/log/timell-leads.log 2>&1

import nodemailer from 'nodemailer';

const SUPABASE_URL = 'https://mcasibkshlwbxexiuvfe.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY; // Set this in environment
const SMTP_HOST = 'mail.timell.ru';
const SMTP_PORT = 465;
const SMTP_USER = 'info@timell.ru';
const SMTP_PASS = process.env.SMTP_PASSWORD; // Set this in environment
const NOTIFY_TO = 'info@timell.ru';

if (!SUPABASE_KEY || !SMTP_PASS) {
  console.error('Missing SUPABASE_SERVICE_KEY or SMTP_PASSWORD env vars');
  process.exit(1);
}

async function main() {
  // 1. Fetch un-notified leads
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leads?is_notified=eq.false&order=created_at.asc&limit=50`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
  const leads = await res.json();
  if (!leads.length) return;

  // 2. Create SMTP transport
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // 3. Send email for each lead
  for (const lead of leads) {
    const html = `
      <h2>Новая заявка с сайта Timell</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;">Источник:</td><td style="padding:8px;">${lead.source || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Имя:</td><td style="padding:8px;">${lead.name || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Телефон:</td><td style="padding:8px;">${lead.phone || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${lead.email || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Компания:</td><td style="padding:8px;">${lead.company || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Кол-во исполнителей:</td><td style="padding:8px;">${lead.team_size || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Сообщение:</td><td style="padding:8px;">${lead.message || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Страница:</td><td style="padding:8px;">${lead.page_url || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Дата:</td><td style="padding:8px;">${new Date(lead.created_at).toLocaleString('ru-RU')}</td></tr>
      </table>
    `;

    try {
      await transporter.sendMail({
        from: `Timell <${SMTP_USER}>`,
        to: NOTIFY_TO,
        subject: `Новая заявка: ${lead.name || 'Без имени'} — ${lead.source}`,
        html,
      });

      // Mark as notified
      await fetch(
        `${SUPABASE_URL}/rest/v1/leads?id=eq.${lead.id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ is_notified: true }),
        }
      );
      console.log(`[${new Date().toISOString()}] Notified: ${lead.id} (${lead.name})`);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Failed: ${lead.id}`, err.message);
    }
  }

  await transporter.close();
}

main().catch(console.error);
