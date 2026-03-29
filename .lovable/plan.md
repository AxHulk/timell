

# Исправление проверки ИНН

## Проблема

Edge function не может обращаться к внешним API (`statusnpd.nalog.ru`, `rusprofile.ru`) — DNS не резолвится в среде Supabase Edge Functions. Логи подтверждают: `"failed to lookup address information: Temporary failure in name resolution"`.

## Решение

Перенести вызов API ФНС напрямую на клиент (браузер). API ФНС по адресу `https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status` — публичный сервис, предназначенный для сторонней интеграции.

Rusprofile-парсинг убрать — он требует серверный запрос (CORS блокирует), а реальной ценности для MVP не несёт.

### Изменения

**1. `src/pages/StatusCheck.tsx`** — переписать `handleCheck`:
- Вместо `supabase.functions.invoke('check-inn')` делать `fetch('https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status', { method: 'POST', body: JSON.stringify({ inn, requestDate }) })`
- Убрать блок отображения данных компании (rusprofile) — оставить только статус НПД
- Если FNS API блокирует CORS — добавить fallback: показать ссылку на официальную страницу проверки `npd.nalog.ru/check-status/` с предзаполненным ИНН
- Обработка ответа: `status: true` → активен, `status: false` → неактивен + сообщение

**2. Edge function** — оставить как есть (может пригодиться позже если ограничение DNS будет снято), но клиент больше не вызывает её.

### Результат
- Проверка статуса НПД работает напрямую из браузера
- Если CORS блокирует — пользователь видит понятный fallback со ссылкой на официальный сайт ФНС

