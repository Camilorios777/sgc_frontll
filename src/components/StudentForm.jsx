import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
}

function StudentForm({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        firstName: initialData.first_name ?? '',
        lastName: initialData.last_name ?? '',
        email: initialData.email ?? '',
        birthDate: initialData.birth_date ?? '',
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
  }, [initialData, open])

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
      setError(err.message ?? 'Error al guardar el estudiante')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {initialData ? 'Editar estudiante' : 'Nuevo estudiante'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <PrimaryButton type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit">
              {initialData ? 'Guardar cambios' : 'Crear'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentForm
