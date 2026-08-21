import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import StatCard from '../components/StatCard'
import PageTitle from '../components/PageTitle'

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
    active: 0,
    completed: 0,
    cancelled: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: studentsCount, error: e1 },
          { count: coursesCount, error: e2 },
          { count: enrollmentsCount, error: e3 },
          { count: activeCount, error: e4 },
          { count: completedCount, error: e5 },
          { count: cancelledCount, error: e6 },
        ] = await Promise.all([
          supabase.from('students').select('*', { count: 'exact', head: true }),
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('enrollments').select('*', { count: 'exact', head: true }),
          supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'ACTIVE'),
          supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'COMPLETED'),
          supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'CANCELLED'),
        ])

        const firstError = e1 || e2 || e3 || e4 || e5 || e6
        if (firstError) throw firstError

        setStats({
          students: studentsCount ?? 0,
          courses: coursesCount ?? 0,
          enrollments: enrollmentsCount ?? 0,
          active: activeCount ?? 0,
          completed: completedCount ?? 0,
          cancelled: cancelledCount ?? 0,
        })
      } catch (err) {
        console.error(err)
        setError(
          'No se pudieron cargar las estadísticas. Verifica que las tablas existan en Supabase.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="p-6">
      <PageTitle title="Dashboard" subtitle="Bienvenido al Sistema de Gestión de Cursos" />

      {loading ? (
        <p className="text-gray-400">Cargando datos...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Total Estudiantes" total={stats.students} />
<StatCard title="Total Cursos" total={stats.courses} /> 
<StatCard title="Total Matrículas" total={stats.enrollments} />
<StatCard title="Matrículas Activas" total={stats.active} />
<StatCard title="Matrículas Completadas" total={stats.completed} />
<StatCard title="Matrículas Canceladas" total={stats.cancelled} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
