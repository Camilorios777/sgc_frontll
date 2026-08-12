import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import StatCard from '../components/StatCard'

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const { count: studentsCount, error: studentsError } = await supabase
            .from('Student')
            .select('*', { count: 'exact', head: true })

            if (studentsError) console.log('ERROR STUDENTS:', studentsError)

      const { count: coursesCount } = await supabase
        .from('Course')
        .select('*', { count: 'exact', head: true })

      const { count: enrollmentsCount } = await supabase
        .from('Enrollement')
        .select('*', { count: 'exact', head: true })

      setStats({
        students: studentsCount ?? 0,
        courses: coursesCount ?? 0,
        enrollments: enrollmentsCount ?? 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mt-1">
        Bienvenido al Sistema de Gestión de Cursos
      </p>

      {loading ? (
        <p className="text-gray-400 mt-6">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <StatCard title="Students" total={stats.students} />
          <StatCard title="Courses" total={stats.courses} />
          <StatCard title="Enrollments" total={stats.enrollments} />
        </div>
      )}
    </div>
  )
}

export default Dashboard