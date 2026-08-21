import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

function EnrollmentForm({ open, students, courses, onSubmit, onCancel }) {
  const [studentId, setStudentId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setStudentId('')
      setCourseId('')
      setError('')
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !courseId) {
      setError('Selecciona un estudiante y un curso.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({ studentId: Number(studentId), courseId: Number(courseId) })
    } catch (err) {
      setError(err.message ?? 'Ocurrió un error al matricular.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Nueva matrícula</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Estudiante</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Curso</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <PrimaryButton type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? 'Matriculando...' : 'Matricular'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EnrollmentForm
