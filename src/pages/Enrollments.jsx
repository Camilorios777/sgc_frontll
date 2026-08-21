import { useEffect, useMemo, useState } from 'react'
import {
  getEnrollments,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
} from '../services/enrollmentService'
import { getStudents } from '../services/studentService'
import { getCourses } from '../services/courseService'
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

  const filteredEnrollments = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return enrollments
    return enrollments.filter((e) => {
      const studentName = e.students
        ? `${e.students.first_name} ${e.students.last_name}`
        : ''
      const courseName = e.courses ? `${e.courses.code} ${e.courses.name}` : ''
      return (
        studentName.toLowerCase().includes(term) ||
        courseName.toLowerCase().includes(term)
      )
    })
  }, [enrollments, search])

  async function handleSubmit({ studentId, courseId }) {
    const course = courses.find((c) => c.id === courseId)
    await createEnrollment({
      studentId,
      courseId,
      maxCapacity: course?.max_capacity,
    })
    setFormOpen(false)
    await loadData()
  }

  async function handleChangeStatus(enrollment, status) {
    await updateEnrollmentStatus(enrollment.id, status)
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
