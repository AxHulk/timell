create table public.sms_codes (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code text not null,
  created_at timestamptz default now(),
  verified boolean default false,
  attempts int default 0
);

alter table public.sms_codes enable row level security;

create policy "Anyone can insert sms codes" on public.sms_codes for insert to anon, authenticated with check (true);
create policy "Anyone can select sms codes" on public.sms_codes for select to anon, authenticated using (true);
create policy "Anyone can update sms codes" on public.sms_codes for update to anon, authenticated using (true);