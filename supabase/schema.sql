

-- ---------------------------------------------------------
-- Tabla: students
-- ---------------------------------------------------------
create table if not exists students (
  id          bigint generated always as identity primary key,
  first_name  text not null,
  last_name   text not null,
  email       text not null unique,
  phone       text not null,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------
-- Tabla: courses
-- ---------------------------------------------------------
create table if not exists courses (
  id            bigint generated always as identity primary key,
  code          text not null unique,
  name          text not null,
  description   text,
  max_capacity  int not null check (max_capacity > 0),
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------
-- Tabla: enrollments
-- ---------------------------------------------------------
create table if not exists enrollments (
  id                bigint generated always as identity primary key,
  student_id        bigint not null references students (id) on delete cascade,
  course_id         bigint not null references courses (id) on delete cascade,
  enrollment_date   date not null default current_date,
  status            text not null default 'ACTIVE'
                     check (status in ('ACTIVE', 'COMPLETED', 'CANCELLED')),
  created_at        timestamptz not null default now(),
  unique (student_id, course_id)
);



alter table students enable row level security;
alter table courses enable row level security;
alter table enrollments enable row level security;

create policy "Allow all on students" on students
  for all using (true) with check (true);

create policy "Allow all on courses" on courses
  for all using (true) with check (true);

create policy "Allow all on enrollments" on enrollments
  for all using (true) with check (true);
