-- SMART TECHNOLOGY database setup. Safe to run more than once in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  role text not null default 'user' check (role in ('super_admin','admin','moderator','user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  category text not null default 'عام',
  price numeric(12,2),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_visits (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  visitor_id text not null,
  visited_at timestamptz not null default now()
);

-- New signups always receive the basic user role; privileges are assigned only by trusted admins.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Keep profile roles protected from self-promotion.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
     and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') not in ('super_admin','admin') then
    raise exception 'Only an administrator can change account roles';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists protect_profile_role_before_update on public.profiles;
create trigger protect_profile_role_before_update
  before update on public.profiles
  for each row execute procedure public.protect_profile_role();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.page_visits enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles" on public.profiles
  for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin','admin'));
drop policy if exists "Admins update profiles" on public.profiles;
create policy "Admins update profiles" on public.profiles
  for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin','admin'))
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin','admin'));

drop policy if exists "Public reads active products" on public.products;
create policy "Public reads active products" on public.products
  for select using (active = true);
drop policy if exists "Authenticated admins manage products" on public.products;
create policy "Authenticated admins manage products" on public.products
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin','admin'))
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin','admin'));

drop policy if exists "Public inserts page visits" on public.page_visits;
create policy "Public inserts page visits" on public.page_visits
  for insert to anon, authenticated
  with check (length(visitor_id) between 8 and 80 and length(page_path) between 1 and 300);
drop policy if exists "Authenticated admins read visits" on public.page_visits;
create policy "Authenticated admins read visits" on public.page_visits
  for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin','admin'));

create index if not exists page_visits_visited_at_idx on public.page_visits (visited_at desc);
create index if not exists page_visits_visitor_idx on public.page_visits (visitor_id);
create index if not exists products_active_created_idx on public.products (active, created_at desc);
