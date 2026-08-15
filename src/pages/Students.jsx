import { useCallback, useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import PrimaryButton from '../components/PrimaryButton'
import StudentTable from '../components/StudentTable'
import StudentForm from '../components/StudentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/studentService'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletingStudent, setDeletingStudent] = useState(null)

  const loadStudents = useCallback(async () => {
    try {
      setError('')
      const data = await getStudents()
      setStudents(data)
    } catch (err) {
      setError(err.message ?? 'Error al cargar estudiantes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStudents()
  }, [loadStudents])

  async function handleSubmit(formData) {
    if (editingStudent) {
      await updateStudent(editingStudent.id, formData)
    } else {
      await createStudent(formData)
    }
    await loadStudents()
  }

  async function handleConfirmDelete() {
    try {
      await deleteStudent(deletingStudent.id)
      setConfirmOpen(false)
      setDeletingStudent(null)
      await loadStudents()
    } catch (err) {
      setError(err.message ?? 'Error al eliminar estudiante')
      setConfirmOpen(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Students" subtitle="Gestión de estudiantes" />
        <PrimaryButton
          onClick={() => {
            setEditingStudent(null)
            setFormOpen(true)
          }}
        >
          + Nuevo estudiante
        </PrimaryButton>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-400">Cargando estudiantes...</p>
      ) : students.length === 0 ? (
        <EmptyState message="No hay estudiantes registrados. Crea el primero." />
      ) : (
        <StudentTable
          students={students}
          onEdit={(student) => {
            setEditingStudent(student)
            setFormOpen(true)
          }}
          onDelete={(student) => {
            setDeletingStudent(student)
            setConfirmOpen(true)
          }}
        />
      )}

      <StudentForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingStudent(null)
        }}
        onSubmit={handleSubmit}
        initialData={editingStudent}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar estudiante"
        message={`¿Estás seguro de eliminar a ${deletingStudent?.first_name} ${deletingStudent?.last_name}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false)
          setDeletingStudent(null)
        }}
      />
    </div>
  )
}

export default Students
