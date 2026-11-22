-- SMART TECHNOLOGY database setup. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

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

alter table public.products enable row level security;
alter table public.page_visits enable row level security;

-- Public can read active catalog items and send anonymous page-view events.
drop policy if exists "Public reads active products" on public.products;
create policy "Public reads active products" on public.products for select using (active = true);
drop policy if exists "Authenticated admins manage products" on public.products;
create policy "Authenticated admins manage products" on public.products for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Public inserts page visits" on public.page_visits;
create policy "Public inserts page visits" on public.page_visits for insert to anon, authenticated with check (length(visitor_id) between 8 and 80 and length(page_path) between 1 and 300);
drop policy if exists "Authenticated admins read visits" on public.page_visits;
create policy "Authenticated admins read visits" on public.page_visits for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create index if not exists page_visits_visited_at_idx on public.page_visits (visited_at desc);
create index if not exists page_visits_visitor_idx on public.page_visits (visitor_id);
create index if not exists products_active_created_idx on public.products (active, created_at desc);
