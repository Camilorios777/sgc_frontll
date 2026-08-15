import { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import StatCard from '../components/StatCard'
import { getStudentsCount } from '../services/studentService'
import { getCoursesCount } from '../services/courseService'
import {
  getEnrollmentsCount,
  getEnrollmentsCountByStatus,
} from '../services/enrollmentService'

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
        const [students, courses, enrollments, active, completed, cancelled] =
          await Promise.all([
            getStudentsCount(),
            getCoursesCount(),
            getEnrollmentsCount(),
            getEnrollmentsCountByStatus('ACTIVE'),
            getEnrollmentsCountByStatus('COMPLETED'),
            getEnrollmentsCountByStatus('CANCELLED'),
          ])

        setStats({ students, courses, enrollments, active, completed, cancelled })
      } catch (err) {
        setError(err.message ?? 'Error al cargar las métricas')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <PageTitle
        title="Dashboard"
        subtitle="Bienvenido al Sistema de Gestión de Cursos"
      />

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-400">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Total Students" total={stats.students} />
          <StatCard title="Total Courses" total={stats.courses} />
          <StatCard title="Total Enrollments" total={stats.enrollments} />
          <StatCard title="Active Enrollments" total={stats.active} />
          <StatCard title="Completed Enrollments" total={stats.completed} />
          <StatCard title="Cancelled Enrollments" total={stats.cancelled} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
