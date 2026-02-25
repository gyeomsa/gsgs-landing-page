-- 사전등록 테이블 (gsgs-landing-page)
-- Supabase SQL Editor에서 실행

-- 테이블 생성 (글자수 제한 포함, 나중에 집계 조회 시 string 필터링 가능)
create table public.preregistrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,

  name varchar(50) not null,
  email varchar(255) not null,
  interest_role varchar(20) not null,
  main_region varchar(50) not null,
  departure_region varchar(100),
  arrival_region varchar(100),
  service_notification_consent boolean not null default true,
  privacy_consent boolean not null default true
);

-- Row Level Security
alter table public.preregistrations enable row level security;

-- 익명 사용자 insert 허용 (랜딩 페이지 폼 제출용)
create policy "Allow anonymous insert"
  on public.preregistrations
  for insert
  to anon
  with check (true);

-- 인증된 사용자만 select (관리자 대시보드용)
create policy "Allow authenticated read"
  on public.preregistrations
  for select
  to authenticated
  using (true);

-- ============================================================
-- [선택] 나중에 랜딩 페이지에 집계 통계 표시 시 아래 RPC 실행
-- ============================================================
-- create or replace function public.get_preregistration_stats()
-- returns json
-- language sql
-- security definer
-- set search_path = public
-- as $$
--   select json_build_object(
--     'total_count', count(*),
--     'by_role', (select json_object_agg(interest_role, cnt) from (select interest_role, count(*) as cnt from preregistrations group by interest_role) t),
--     'by_region', (select json_object_agg(main_region, cnt) from (select main_region, count(*) as cnt from preregistrations group by main_region) t)
--   ) from preregistrations;
-- $$;
-- grant execute on function public.get_preregistration_stats() to anon;
