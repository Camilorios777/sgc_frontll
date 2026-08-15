import { supabase } from './supabase'

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

export async function createCourse(course) {
  const { data, error } = await supabase
    .from('courses')
    .insert({
      code: course.code,
      name: course.name,
      description: course.description,
      max_capacity: course.maxCapacity,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCourse(id, course) {
  const { data, error } = await supabase
    .from('courses')
    .update({
      code: course.code,
      name: course.name,
      description: course.description,
      max_capacity: course.maxCapacity,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCourse(id) {
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) throw error
}

export async function getCoursesCount() {
  const { count, error } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count ?? 0
}
