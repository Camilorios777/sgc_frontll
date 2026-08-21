import { supabase } from './supabaseClient'

const TABLE = 'enrollments'

// Trae las matrículas con los datos del estudiante y del curso ya unidos
export async function getEnrollments() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(
      `
      id,
      enrollment_date,
      status,
      student_id,
      course_id,
      students ( id, first_name, last_name, email ),
      courses ( id, code, name, max_capacity )
    `
    )
    .order('id', { ascending: true })

  if (error) throw error
  return data
}

// Cuenta cuántas matrículas activas tiene un curso (para validar el cupo)
export async function countActiveEnrollmentsByCourse(courseId) {
  const { count, error } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('course_id', courseId)
    .eq('status', 'ACTIVE')

  if (error) throw error
  return count ?? 0
}

export async function createEnrollment({ studentId, courseId, maxCapacity }) {
  // Validación de cupo disponible antes de insertar
  if (maxCapacity != null) {
    const activeCount = await countActiveEnrollmentsByCourse(courseId)
    if (activeCount >= maxCapacity) {
      throw new Error('El curso ya alcanzó su capacidad máxima.')
    }
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert([
      {
        student_id: studentId,
        course_id: courseId,
        enrollment_date: new Date().toISOString().slice(0, 10),
        status: 'ACTIVE',
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateEnrollmentStatus(id, status) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ status })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteEnrollment(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
