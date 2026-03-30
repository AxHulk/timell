
create type public.app_role as enum ('executor', 'client');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  opf text,
  tax_status text,
  inn text,
  phone text,
  first_name text,
  last_name text,
  patronymic text,
  company_name text,
  balance numeric default 0,
  commission_rate numeric default 4.88,
  status text default 'moderation',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own profile" on public.profiles for select to authenticated using (auth.uid() = user_id);
create policy "Users can update own profile" on public.profiles for update to authenticated using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can view own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Users can insert own roles" on public.user_roles for insert to authenticated with check (auth.uid() = user_id);
