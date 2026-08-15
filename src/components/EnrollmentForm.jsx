import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

const emptyForm = {
  studentId: '',
  courseId: '',
  enrollmentDate: new Date().toISOString().split('T')[0],
  status: 'ACTIVE',
}

function EnrollmentForm({ open, onClose, onSubmit, students, courses }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({
      ...emptyForm,
      enrollmentDate: new Date().toISOString().split('T')[0],
    })
    setError('')
  }, [open])

  if (!open) return null

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err.message ?? 'Error al crear la matrícula')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold text-gray-800">Nueva matrícula</h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estudiante</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name} ({student.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
            <select
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} — {course.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de matrícula</label>
            <input
              name="enrollmentDate"
              type="date"
              value={form.enrollmentDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ACTIVE">Activa</option>
              <option value="COMPLETED">Completada</option>
              <option value="CANCELLED">Cancelada</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <PrimaryButton type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit">Crear matrícula</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EnrollmentForm
