-- genome_results table
create table if not exists genome_results (
  id             uuid          default gen_random_uuid() primary key,
  name           text          not null,
  email          text          not null,
  genome_code    text          not null,
  genome_name    text          not null,
  created_at     timestamptz   default now(),
  early_adopter  boolean       default false
);

-- Row Level Security
alter table genome_results enable row level security;

create policy "Allow anonymous inserts" on genome_results
  for insert with check (true);

-- RPC: mark a row as early adopter (security definer — no update policy needed)
create or replace function mark_early_adopter(row_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update genome_results
  set early_adopter = true
  where id = row_id;
$$;

revoke execute on function mark_early_adopter(uuid) from public;
grant execute on function mark_early_adopter(uuid) to anon;
