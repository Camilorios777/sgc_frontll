import { supabase } from './supabaseClient'

const TABLE = 'students'

export async function getStudents() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error
  return data
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([
      {
        first_name: student.firstName,
        last_name: student.lastName,
        email: student.email,
        phone: student.phone,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateStudent(id, student) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email,
      phone: student.phone,
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteStudent(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
