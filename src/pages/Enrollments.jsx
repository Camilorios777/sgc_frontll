import { useEffect, useMemo, useState } from 'react'
import {
  getEnrollments,
  createEnrollment,
  cancelEnrollment,
  completeEnrollment,
  deleteEnrollment,
} from '../services/enrollmentBdService'
import { getStudents } from '../services/studentBdService'
import { getCourses } from '../services/courseBdService'
import PageTitle from '../components/PageTitle'
import PrimaryButton from '../components/PrimaryButton'
import EnrollmentTable from '../components/EnrollmentTable'
import EnrollmentForm from '../components/EnrollmentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'

function Enrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function loadData() {
    setLoading(true)
    try {
      const [enrollmentsData, studentsData, coursesData] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ])
      setEnrollments(enrollmentsData)
      setStudents(studentsData)
      setCourses(coursesData)
      setError('')
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar las matrículas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // El backend solo devuelve studentId/courseId sueltos, asi que aqui
  // "unimos" cada matricula con su estudiante y curso completos.
  const enrichedEnrollments = useMemo(() => {
    return enrollments.map((e) => ({
      ...e,
      student: students.find((s) => s.id === e.studentId) || null,
      course: courses.find((c) => c.id === e.courseId) || null,
    }))
  }, [enrollments, students, courses])

  const filteredEnrollments = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return enrichedEnrollments
    return enrichedEnrollments.filter((e) => {
      const studentName = e.student ? `${e.student.firstName} ${e.student.lastName}` : ''
      const courseName = e.course ? `${e.course.code} ${e.course.name}` : ''
      return (
        studentName.toLowerCase().includes(term) ||
        courseName.toLowerCase().includes(term)
      )
    })
  }, [enrichedEnrollments, search])

  async function handleSubmit({ studentId, courseId }) {
    await createEnrollment({ studentId, courseId })
    setFormOpen(false)
    await loadData()
  }

  async function handleChangeStatus(enrollment, status) {
    if (status === 'COMPLETED') {
      await completeEnrollment(enrollment.id)
    } else if (status === 'CANCELLED') {
      await cancelEnrollment(enrollment.id)
    }
    await loadData()
  }

  async function confirmDelete() {
    await deleteEnrollment(deleteTarget.id)
    setDeleteTarget(null)
    await loadData()
  }

  return (
    <div className="p-6">
      <PageTitle
        title="Matrículas"
        subtitle="Gestión de matrículas de estudiantes"
        action={
          <PrimaryButton onClick={() => setFormOpen(true)} disabled={loading}>
            Nueva Matrícula
          </PrimaryButton>
        }
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar matrícula por estudiante o curso..."
        className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-gray-400">Cargando matrículas...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : filteredEnrollments.length === 0 ? (
        <EmptyState
          message={
            search
              ? 'No se encontraron matrículas con ese criterio.'
              : 'Aún no hay matrículas registradas.'
          }
        />
      ) : (
        <EnrollmentTable
          enrollments={filteredEnrollments}
          onChangeStatus={handleChangeStatus}
          onDelete={setDeleteTarget}
        />
      )}

      <EnrollmentForm
        open={formOpen}
        students={students}
        courses={courses}
        onSubmit={handleSubmit}
        onCancel={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar matrícula"
        message="¿Seguro que deseas eliminar esta matrícula? Esta acción no se puede deshacer."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default Enrollments