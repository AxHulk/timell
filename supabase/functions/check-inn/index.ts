const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface CompanyInfo {
  inn?: string;
  kpp?: string;
  name?: string;
  director?: string;
  address?: string;
  ogrn?: string;
  registrationDate?: string;
  activity?: string;
  status?: string;
  capitalAmount?: string;
  employeeCount?: string;
}

function extractText(html: string, regex: RegExp): string | undefined {
  const match = html.match(regex);
  if (!match) return undefined;
  return match[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { inn } = await req.json();

    if (!inn || typeof inn !== 'string' || !/^\d{10,12}$/.test(inn)) {
      return new Response(
        JSON.stringify({ success: false, error: 'ИНН должен содержать 10 или 12 цифр' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch from rusprofile.ru
    const rpResponse = await fetch(`https://www.rusprofile.ru/search?query=${inn}&type=ul`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    if (!rpResponse.ok) {
      console.error('Rusprofile response status:', rpResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: `Rusprofile вернул статус ${rpResponse.status}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await rpResponse.text();
    const company: CompanyInfo = { inn };

    // Company name - try multiple patterns
    company.name = extractText(html, /<h1[^>]*>([\s\S]*?)<\/h1>/) 
      || extractText(html, /class="[^"]*company-name[^"]*"[^>]*>([\s\S]*?)<\//)
      || extractText(html, /itemprop="name"[^>]*>([\s\S]*?)<\//);

    // Director / head
    company.director = extractText(html, /Руководитель[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/)
      || extractText(html, /Генеральный директор[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/)
      || extractText(html, /itemprop="employee"[\s\S]*?itemprop="name"[^>]*>([\s\S]*?)<\//);

    // KPP
    company.kpp = extractText(html, /КПП[\s\S]*?<span[^>]*>([\d]+)<\/span>/)
      || extractText(html, /КПП[\s:]*?([\d]{9})/);

    // OGRN
    company.ogrn = extractText(html, /ОГРН[ИП]?[\s\S]*?<span[^>]*>([\d]+)<\/span>/)
      || extractText(html, /ОГРН[ИП]?[\s:]*?([\d]{13,15})/);

    // Registration date
    company.registrationDate = extractText(html, /Дата регистрации[\s\S]*?(\d{2}\.\d{2}\.\d{4})/)
      || extractText(html, /Зарегистрирован[\s\S]*?(\d{2}\.\d{2}\.\d{4})/);

    // Address
    company.address = extractText(html, /Юридический адрес[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/)
      || extractText(html, /itemprop="address"[^>]*>([\s\S]*?)<\//);

    // Main activity
    company.activity = extractText(html, /Основной вид деятельности[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/)
      || extractText(html, /ОКВЭД[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);

    // Status (active/liquidated)
    company.status = extractText(html, /class="[^"]*company-status[^"]*"[^>]*>([\s\S]*?)<\//)
      || extractText(html, /Статус[\s\S]*?<span[^>]*class="[^"]*"[^>]*>([\s\S]*?)<\/span>/);

    // Capital
    company.capitalAmount = extractText(html, /Уставный капитал[\s\S]*?([\d\s]+[\d])\s*₽/)
      || extractText(html, /Уставный капитал[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);

    // Employee count
    company.employeeCount = extractText(html, /Численность[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);

    // Check if we got meaningful data
    const hasData = company.name || company.director || company.kpp || company.ogrn;

    if (!hasData) {
      // Maybe it's an individual (IP) or self-employed, try IP search
      const ipResponse = await fetch(`https://www.rusprofile.ru/search?query=${inn}&type=ip`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        },
      });

      if (ipResponse.ok) {
        const ipHtml = await ipResponse.text();
        company.name = extractText(ipHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/)
          || extractText(ipHtml, /class="[^"]*company-name[^"]*"[^>]*>([\s\S]*?)<\//);
        company.ogrn = extractText(ipHtml, /ОГРНИП[\s\S]*?<span[^>]*>([\d]+)<\/span>/)
          || extractText(ipHtml, /ОГРНИП[\s:]*?([\d]{15})/);
        company.registrationDate = extractText(ipHtml, /Дата регистрации[\s\S]*?(\d{2}\.\d{2}\.\d{4})/);
        company.address = extractText(ipHtml, /Адрес[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
        company.activity = extractText(ipHtml, /Основной вид деятельности[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
        company.status = extractText(ipHtml, /class="[^"]*company-status[^"]*"[^>]*>([\s\S]*?)<\//);
      }
    }

    const finalHasData = company.name || company.director || company.kpp || company.ogrn;

    return new Response(
      JSON.stringify({ 
        success: true, 
        found: !!finalHasData,
        company: finalHasData ? company : null,
        message: finalHasData ? undefined : 'Данные по указанному ИНН не найдены'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
