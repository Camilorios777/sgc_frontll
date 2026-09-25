import { useEffect, useMemo, useState } from 'react'
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/courseBdService'
import PageTitle from '../components/PageTitle'
import PrimaryButton from '../components/PrimaryButton'
import CourseTable from '../components/CourseTable'
import CourseForm from '../components/CourseForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const [deleteTarget, setDeleteTarget] = useState(null)

  async function loadCourses() {
    setLoading(true)
    try {
      const data = await getCourses()
      setCourses(data)
      setError('')
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los cursos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return courses
    return courses.filter((c) =>
      [c.code, c.name, c.description]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    )
  }, [courses, search])

  function handleCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function handleEdit(course) {
    setEditing(course)
    setFormOpen(true)
  }

  async function handleSubmit(form) {
    if (editing) {
      await updateCourse(editing.id, form)
    } else {
      await createCourse(form)
    }
    setFormOpen(false)
    setEditing(null)
    await loadCourses()
  }

  async function confirmDelete() {
    await deleteCourse(deleteTarget.id)
    setDeleteTarget(null)
    await loadCourses()
  }

  return (
    <div className="p-6">
      <PageTitle
        title="Cursos"
        subtitle="Gestión de cursos disponibles"
        action={<PrimaryButton onClick={handleCreate}>Nuevo Curso</PrimaryButton>}
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar curso..."
        className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-gray-400">Cargando cursos...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          message={
            search
              ? 'No se encontraron cursos con ese criterio.'
              : 'Aún no hay cursos registrados.'
          }
        />
      ) : (
        <CourseTable courses={filteredCourses} onEdit={handleEdit} onDelete={setDeleteTarget} />
      )}

      <CourseForm
        open={formOpen}
        initialData={editing}
        onSubmit={handleSubmit}
        onCancel={() => {
          setFormOpen(false)
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar curso"
        message={`¿Seguro que deseas eliminar el curso ${deleteTarget?.name ?? ''}? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default Courses
