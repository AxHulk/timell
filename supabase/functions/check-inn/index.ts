const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface NpdStatusResponse {
  status: boolean;
  message: string;
}

interface CompanyInfo {
  name?: string;
  kpp?: string;
  director?: string;
  address?: string;
  ogrn?: string;
  registrationDate?: string;
  activity?: string;
  status?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { inn, requestDate } = await req.json();

    if (!inn || typeof inn !== 'string' || !/^\d{10,12}$/.test(inn)) {
      return new Response(
        JSON.stringify({ success: false, error: 'ИНН должен содержать 10 или 12 цифр' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const date = requestDate || new Date().toISOString().split('T')[0];
    const result: { npdStatus?: NpdStatusResponse; company?: CompanyInfo; error?: string } = {};

    // 1. Check NPD status via FNS API
    try {
      const npdResponse = await fetch('https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inn, requestDate: date }),
      });
      
      if (npdResponse.ok) {
        const npdData = await npdResponse.json();
        result.npdStatus = npdData;
      } else {
        console.error('FNS API error:', npdResponse.status);
        result.npdStatus = { status: false, message: 'Ошибка запроса к ФНС' };
      }
    } catch (e) {
      console.error('FNS API fetch error:', e);
      result.npdStatus = { status: false, message: 'Сервис ФНС недоступен' };
    }

    // 2. Get company/person info from rusprofile
    try {
      const rpResponse = await fetch(`https://www.rusprofile.ru/search?query=${inn}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        },
      });

      if (rpResponse.ok) {
        const html = await rpResponse.text();
        const company: CompanyInfo = {};

        // Parse company name
        const nameMatch = html.match(/<h1[^>]*class="[^"]*company-name[^"]*"[^>]*>(.*?)<\/h1>/s);
        if (nameMatch) {
          company.name = nameMatch[1].replace(/<[^>]+>/g, '').trim();
        } else {
          const titleMatch = html.match(/<div[^>]*class="[^"]*company-name[^"]*"[^>]*>(.*?)<\/div>/s);
          if (titleMatch) company.name = titleMatch[1].replace(/<[^>]+>/g, '').trim();
        }

        // Parse director
        const directorMatch = html.match(/Руководитель[\s\S]*?<a[^>]*>(.*?)<\/a>/);
        if (directorMatch) {
          company.director = directorMatch[1].replace(/<[^>]+>/g, '').trim();
        }

        // Parse KPP
        const kppMatch = html.match(/КПП[\s:]*<[^>]*>([\d]+)<\/[^>]*>/);
        if (kppMatch) company.kpp = kppMatch[1].trim();

        // Parse OGRN
        const ogrnMatch = html.match(/ОГРН[ИП]?[\s:]*<[^>]*>([\d]+)<\/[^>]*>/);
        if (ogrnMatch) company.ogrn = ogrnMatch[1].trim();

        // Parse registration date
        const regDateMatch = html.match(/Дата регистрации[\s\S]*?(\d{2}\.\d{2}\.\d{4})/);
        if (regDateMatch) company.registrationDate = regDateMatch[1];

        // Parse address
        const addressMatch = html.match(/Юридический адрес[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
        if (addressMatch) {
          company.address = addressMatch[1].replace(/<[^>]+>/g, '').trim();
        }

        // Parse main activity
        const activityMatch = html.match(/Основной вид деятельности[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
        if (activityMatch) {
          company.activity = activityMatch[1].replace(/<[^>]+>/g, '').trim();
        }

        // Parse status
        const statusMatch = html.match(/class="[^"]*company-status[^"]*"[^>]*>([\s\S]*?)<\//);
        if (statusMatch) {
          company.status = statusMatch[1].replace(/<[^>]+>/g, '').trim();
        }

        if (company.name || company.director || company.kpp) {
          result.company = company;
        }
      }
    } catch (e) {
      console.error('Rusprofile fetch error:', e);
      // Not critical, continue without company info
    }

    return new Response(
      JSON.stringify({ success: true, ...result }),
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
