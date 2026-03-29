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
}

function clean(s: string | undefined): string | undefined {
  if (!s) return undefined;
  return s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim() || undefined;
}

function extract(html: string, regex: RegExp): string | undefined {
  const m = html.match(regex);
  return m ? clean(m[1]) : undefined;
}

const browserHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Sec-Ch-Ua': '"Chromium";v="131", "Not_A Brand";v="24"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
};

async function tryRusprofile(inn: string): Promise<CompanyInfo | null> {
  // Try direct company page URL pattern
  const urls = [
    `https://www.rusprofile.ru/id/${inn}`,
    `https://www.rusprofile.ru/ip/${inn}`,
  ];

  for (const url of urls) {
    try {
      console.log('Trying URL:', url);
      const resp = await fetch(url, { 
        headers: { ...browserHeaders, 'Referer': 'https://www.google.com/' },
        redirect: 'follow',
      });
      
      console.log('Response status:', resp.status);
      if (resp.status === 404) continue;
      if (!resp.ok) continue;

      const html = await resp.text();
      const company: CompanyInfo = { inn };

      company.name = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/)
        || extract(html, /itemprop="name"[^>]*>([\s\S]*?)<\//);
      company.director = extract(html, /Руководитель[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/)
        || extract(html, /Генеральный директор[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
      company.kpp = extract(html, /КПП[\s\S]{0,100}?([\d]{9})/);
      company.ogrn = extract(html, /ОГРН[ИП]?[\s\S]{0,100}?([\d]{13,15})/);
      company.registrationDate = extract(html, /(\d{2}\.\d{2}\.\d{4})/);
      company.address = extract(html, /Юридический адрес[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/)
        || extract(html, /itemprop="address"[^>]*>([\s\S]*?)<\//);
      company.activity = extract(html, /Основной вид деятельности[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
      company.status = extract(html, /class="[^"]*company-status[^"]*"[^>]*>([\s\S]*?)<\//);

      if (company.name || company.director || company.kpp) {
        return company;
      }
    } catch (e) {
      console.error('Rusprofile error for', url, ':', e);
    }
  }
  return null;
}

async function tryEgrul(inn: string): Promise<CompanyInfo | null> {
  try {
    // Step 1: Submit search to egrul.nalog.ru
    const searchResp = await fetch('https://egrul.nalog.ru/', {
      method: 'POST',
      headers: {
        ...browserHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://egrul.nalog.ru/',
        'Origin': 'https://egrul.nalog.ru',
      },
      body: `query=${inn}`,
    });

    if (!searchResp.ok) {
      console.error('EGRUL search status:', searchResp.status);
      return null;
    }

    const searchData = await searchResp.json();
    const token = searchData.t;
    if (!token) {
      console.error('No EGRUL token received');
      return null;
    }

    // Step 2: Wait and fetch results
    await new Promise(r => setTimeout(r, 2000));

    const resultResp = await fetch(`https://egrul.nalog.ru/search-result/${token}`, {
      headers: { ...browserHeaders, 'Referer': 'https://egrul.nalog.ru/' },
    });

    if (!resultResp.ok) {
      console.error('EGRUL result status:', resultResp.status);
      return null;
    }

    const resultData = await resultResp.json();
    const rows = resultData?.rows;
    if (!rows || rows.length === 0) return null;

    const row = rows[0];
    const company: CompanyInfo = {
      inn: row.i || inn,
      name: row.n || row.c,
      ogrn: row.o,
      kpp: row.p,
      registrationDate: row.r,
      address: row.a,
      director: row.g,
    };

    return company;
  } catch (e) {
    console.error('EGRUL error:', e);
    return null;
  }
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

    // Try rusprofile first, fallback to egrul.nalog.ru
    let company = await tryRusprofile(inn);
    const source = company ? 'rusprofile' : null;

    if (!company) {
      console.log('Rusprofile failed, trying EGRUL...');
      company = await tryEgrul(inn);
    }

    const found = !!(company && (company.name || company.director || company.kpp || company.ogrn));

    return new Response(
      JSON.stringify({
        success: true,
        found,
        company: found ? company : null,
        source: found ? (source || 'egrul') : undefined,
        message: found ? undefined : 'Данные по указанному ИНН не найдены',
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
