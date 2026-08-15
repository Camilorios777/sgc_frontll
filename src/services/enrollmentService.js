import { supabase } from './supabase'

export async function getEnrollments() {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      students ( first_name, last_name, email ),
      courses ( code, name )
    `)
    .order('enrollment_date', { ascending: false })

  if (error) throw error
  return data
}

export async function createEnrollment(enrollment) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      student_id: enrollment.studentId,
      course_id: enrollment.courseId,
      enrollment_date: enrollment.enrollmentDate,
      status: enrollment.status,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getEnrollmentsCount() {
  const { count, error } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count ?? 0
}

export async function getEnrollmentsCountByStatus(status) {
  const { count, error } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', status)

  if (error) throw error
  return count ?? 0
}
