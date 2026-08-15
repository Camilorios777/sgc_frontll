-- Ejecuta este script en Supabase → SQL Editor
-- Proyecto: Sistema de Gestión de Cursos

-- =============================================
-- TABLA: students
-- =============================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  birth_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: courses
-- =============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  max_capacity INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: enrollments
-- =============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, course_id)
);

-- =============================================
-- ROW LEVEL SECURITY (acceso público para desarrollo)
-- =============================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "students_select" ON students FOR SELECT USING (true);
CREATE POLICY "students_insert" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "students_update" ON students FOR UPDATE USING (true);
CREATE POLICY "students_delete" ON students FOR DELETE USING (true);

CREATE POLICY "courses_select" ON courses FOR SELECT USING (true);
CREATE POLICY "courses_insert" ON courses FOR INSERT WITH CHECK (true);
CREATE POLICY "courses_update" ON courses FOR UPDATE USING (true);
CREATE POLICY "courses_delete" ON courses FOR DELETE USING (true);

CREATE POLICY "enrollments_select" ON enrollments FOR SELECT USING (true);
CREATE POLICY "enrollments_insert" ON enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "enrollments_update" ON enrollments FOR UPDATE USING (true);
CREATE POLICY "enrollments_delete" ON enrollments FOR DELETE USING (true);

-- =============================================
-- DATOS DE EJEMPLO (opcional)
-- =============================================
INSERT INTO students (first_name, last_name, email, birth_date) VALUES
  ('Ana', 'García', 'ana.garcia@email.com', '2000-03-15'),
  ('Carlos', 'López', 'carlos.lopez@email.com', '1999-07-22'),
  ('María', 'Rodríguez', 'maria.rodriguez@email.com', '2001-11-08')
ON CONFLICT (email) DO NOTHING;

INSERT INTO courses (code, name, description, max_capacity) VALUES
  ('REACT-101', 'React Fundamentals', 'Introducción a React y componentes', 30),
  ('JS-201', 'JavaScript Avanzado', 'Programación asíncrona, closures y ES6+', 25),
  ('DB-301', 'Bases de Datos', 'SQL, modelado relacional y Supabase', 20)
ON CONFLICT (code) DO NOTHING;

-- Matrículas de ejemplo (solo si hay students y courses)
INSERT INTO enrollments (student_id, course_id, enrollment_date, status)
SELECT s.id, c.id, CURRENT_DATE, 'ACTIVE'
FROM students s
CROSS JOIN courses c
WHERE s.email = 'ana.garcia@email.com' AND c.code = 'REACT-101'
ON CONFLICT (student_id, course_id) DO NOTHING;

INSERT INTO enrollments (student_id, course_id, enrollment_date, status)
SELECT s.id, c.id, CURRENT_DATE, 'COMPLETED'
FROM students s
CROSS JOIN courses c
WHERE s.email = 'carlos.lopez@email.com' AND c.code = 'JS-201'
ON CONFLICT (student_id, course_id) DO NOTHING;
