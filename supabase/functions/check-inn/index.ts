const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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

    const apiKey = Deno.env.get('DADATA_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'API-ключ DaData не настроен' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${apiKey}`,
      },
      body: JSON.stringify({ query: inn, count: 1 }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('DaData error:', response.status, errText);
      return new Response(
        JSON.stringify({ success: false, error: `DaData вернул ошибку ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const suggestions = data.suggestions;

    if (!suggestions || suggestions.length === 0) {
      return new Response(
        JSON.stringify({ success: true, found: false, message: 'Данные по указанному ИНН не найдены' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const s = suggestions[0];
    const d = s.data;

    const company = {
      name: s.value,
      inn: d.inn,
      kpp: d.kpp || undefined,
      ogrn: d.ogrn || undefined,
      type: d.type, // LEGAL, INDIVIDUAL
      status: d.state?.status === 'ACTIVE' ? 'Действующая' : d.state?.status === 'LIQUIDATING' ? 'Ликвидируется' : d.state?.status === 'LIQUIDATED' ? 'Ликвидирована' : d.state?.status === 'REORGANIZING' ? 'Реорганизация' : d.state?.status || undefined,
      registrationDate: d.state?.registration_date ? new Date(d.state.registration_date).toLocaleDateString('ru-RU') : undefined,
      liquidationDate: d.state?.liquidation_date ? new Date(d.state.liquidation_date).toLocaleDateString('ru-RU') : undefined,
      address: d.address?.unrestricted_value || d.address?.value || undefined,
      director: d.management?.name || undefined,
      directorPost: d.management?.post || undefined,
      okved: d.okved || undefined,
      okvedType: d.okved_type || undefined,
      capitalAmount: d.finance?.tax_system || undefined,
      employeeCount: d.employee_count || undefined,
      opf: d.opf?.short || undefined, // ООО, ИП, АО, etc.
    };

    return new Response(
      JSON.stringify({ success: true, found: true, company }),
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
