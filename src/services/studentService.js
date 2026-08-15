import { supabase } from './supabase'

export async function getStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('last_name', { ascending: true })

  if (error) throw error
  return data
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from('students')
    .insert({
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email,
      birth_date: student.birthDate,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateStudent(id, student) {
  const { data, error } = await supabase
    .from('students')
    .update({
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email,
      birth_date: student.birthDate,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteStudent(id) {
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) throw error
}

export async function getStudentsCount() {
  const { count, error } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count ?? 0
}
