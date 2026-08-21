import { supabase } from './supabaseClient'

const TABLE = 'courses'

export async function getCourses() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error
  return data
}

export async function createCourse(course) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([
      {
        code: course.code,
        name: course.name,
        description: course.description,
        max_capacity: Number(course.maxCapacity),
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateCourse(id, course) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      code: course.code,
      name: course.name,
      description: course.description,
      max_capacity: Number(course.maxCapacity),
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteCourse(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
