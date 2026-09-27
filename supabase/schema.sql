-- Shivam Collection: long-term relational schema
-- Run this in Supabase SQL Editor after creating the project.

create table if not exists public.farmers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  village text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.wholesalers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  location text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.crate_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.crate_givings (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.farmers(id),
  given_date date not null default current_date,
  quantity integer not null check (quantity > 0),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.farmers(id),
  wholesaler_id uuid references public.wholesalers(id),
  collection_date date not null default current_date,
  crates_given integer not null default 0 check (crates_given >= 0),
  crates_collected integer not null check (crates_collected >= 0),
  sorted_by_farmer boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.collections(id) on delete cascade,
  crate_type_id uuid not null references public.crate_types(id),
  quantity integer not null check (quantity > 0)
);

create index if not exists idx_collections_farmer on public.collections(farmer_id);
create index if not exists idx_collections_date on public.collections(collection_date);
create index if not exists idx_collections_wholesaler on public.collections(wholesaler_id);
create index if not exists idx_collection_items_collection on public.collection_items(collection_id);

-- Enable RLS. For a single-owner initial version, authenticated users can access their data.
alter table public.farmers enable row level security;
alter table public.wholesalers enable row level security;
alter table public.crate_types enable row level security;
alter table public.crate_givings enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;

create policy "authenticated farmers access" on public.farmers
for all to authenticated using (true) with check (true);

create policy "authenticated wholesalers access" on public.wholesalers
for all to authenticated using (true) with check (true);

create policy "authenticated crate types access" on public.crate_types
for all to authenticated using (true) with check (true);

create policy "authenticated crate givings access" on public.crate_givings
for all to authenticated using (true) with check (true);

create policy "authenticated collections access" on public.collections
for all to authenticated using (true) with check (true);

create policy "authenticated collection items access" on public.collection_items
for all to authenticated using (true) with check (true);

-- Suggested starter crate types
insert into public.crate_types (name) values
  ('Tomato Crate'),
  ('Onion Crate'),
  ('Grapes Crate'),
  ('Apple Crate'),
  ('Potato Crate')
on conflict (name) do nothing;