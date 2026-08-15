import { useCallback, useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import PrimaryButton from '../components/PrimaryButton'
import EnrollmentTable from '../components/EnrollmentTable'
import EnrollmentForm from '../components/EnrollmentForm'
import EmptyState from '../components/EmptyState'
import { getStudents } from '../services/studentService'
import { getCourses } from '../services/courseService'
import { getEnrollments, createEnrollment } from '../services/enrollmentService'

function Enrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setError('')
      const [enrollmentData, studentData, courseData] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ])
      setEnrollments(enrollmentData)
      setStudents(studentData)
      setCourses(courseData)
    } catch (err) {
      setError(err.message ?? 'Error al cargar matrículas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleSubmit(formData) {
    await createEnrollment(formData)
    await loadData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Enrollments" subtitle="Gestión de matrículas" />
        <PrimaryButton
          onClick={() => setFormOpen(true)}
          disabled={students.length === 0 || courses.length === 0}
        >
          + Nueva matrícula
        </PrimaryButton>
      </div>

      {students.length === 0 || courses.length === 0 ? (
        <p className="text-amber-700 text-sm mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Debes tener al menos un estudiante y un curso registrados para crear matrículas.
        </p>
      ) : null}

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-400">Cargando matrículas...</p>
      ) : enrollments.length === 0 ? (
        <EmptyState message="No hay matrículas registradas. Crea la primera." />
      ) : (
        <EnrollmentTable enrollments={enrollments} />
      )}

      <EnrollmentForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        students={students}
        courses={courses}
      />
    </div>
  )
}

export default Enrollments
