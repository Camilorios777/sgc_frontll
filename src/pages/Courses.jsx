import { useCallback, useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import PrimaryButton from '../components/PrimaryButton'
import CourseTable from '../components/CourseTable'
import CourseForm from '../components/CourseForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/courseService'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletingCourse, setDeletingCourse] = useState(null)

  const loadCourses = useCallback(async () => {
    try {
      setError('')
      const data = await getCourses()
      setCourses(data)
    } catch (err) {
      setError(err.message ?? 'Error al cargar cursos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  async function handleSubmit(formData) {
    if (editingCourse) {
      await updateCourse(editingCourse.id, formData)
    } else {
      await createCourse(formData)
    }
    await loadCourses()
  }

  async function handleConfirmDelete() {
    try {
      await deleteCourse(deletingCourse.id)
      setConfirmOpen(false)
      setDeletingCourse(null)
      await loadCourses()
    } catch (err) {
      setError(err.message ?? 'Error al eliminar curso')
      setConfirmOpen(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Courses" subtitle="Gestión de cursos" />
        <PrimaryButton
          onClick={() => {
            setEditingCourse(null)
            setFormOpen(true)
          }}
        >
          + Nuevo curso
        </PrimaryButton>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-400">Cargando cursos...</p>
      ) : courses.length === 0 ? (
        <EmptyState message="No hay cursos registrados. Crea el primero." />
      ) : (
        <CourseTable
          courses={courses}
          onEdit={(course) => {
            setEditingCourse(course)
            setFormOpen(true)
          }}
          onDelete={(course) => {
            setDeletingCourse(course)
            setConfirmOpen(true)
          }}
        />
      )}

      <CourseForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingCourse(null)
        }}
        onSubmit={handleSubmit}
        initialData={editingCourse}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar curso"
        message={`¿Estás seguro de eliminar el curso "${deletingCourse?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false)
          setDeletingCourse(null)
        }}
      />
    </div>
  )
}

export default Courses
