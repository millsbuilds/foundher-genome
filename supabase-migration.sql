-- Run this in your Supabase SQL Editor to create the genome_results table

create table if not exists genome_results (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  genome_code text not null,
  genome_name text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table genome_results enable row level security;

-- Allow anonymous inserts (for the quiz flow)
create policy "Allow anonymous inserts" on genome_results
  for insert with check (true);
