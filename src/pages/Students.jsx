import { useEffect, useMemo, useState } from 'react'
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/studentService'
import PageTitle from '../components/PageTitle'
import PrimaryButton from '../components/PrimaryButton'
import StudentTable from '../components/StudentTable'
import StudentForm from '../components/StudentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const [deleteTarget, setDeleteTarget] = useState(null)

  async function loadStudents() {
    setLoading(true)
    try {
      const data = await getStudents()
      setStudents(data)
      setError('')
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los estudiantes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return students
    return students.filter((s) =>
      [s.first_name, s.last_name, s.email, s.phone]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    )
  }, [students, search])

  function handleCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function handleEdit(student) {
    setEditing(student)
    setFormOpen(true)
  }

  async function handleSubmit(form) {
    if (editing) {
      await updateStudent(editing.id, form)
    } else {
      await createStudent(form)
    }
    setFormOpen(false)
    setEditing(null)
    await loadStudents()
  }

  async function confirmDelete() {
    await deleteStudent(deleteTarget.id)
    setDeleteTarget(null)
    await loadStudents()
  }

  return (
    <div className="p-6">
      <PageTitle
        title="Estudiantes"
        subtitle="Gestión de estudiantes registrados"
        action={<PrimaryButton onClick={handleCreate}>Nuevo Estudiante</PrimaryButton>}
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar estudiante..."
        className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-gray-400">Cargando estudiantes...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          message={
            search
              ? 'No se encontraron estudiantes con ese criterio.'
              : 'Aún no hay estudiantes registrados.'
          }
        />
      ) : (
        <StudentTable students={filteredStudents} onEdit={handleEdit} onDelete={setDeleteTarget} />
      )}

      <StudentForm
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
        title="Eliminar estudiante"
        message={`¿Seguro que deseas eliminar a ${deleteTarget?.first_name ?? ''} ${deleteTarget?.last_name ?? ''}? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default Students
