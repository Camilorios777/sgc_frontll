import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

const emptyForm = { firstName: '', lastName: '', email: '', phone: '' }

function StudentForm({ open, initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        firstName: initialData.first_name ?? '',
        lastName: initialData.last_name ?? '',
        email: initialData.email ?? '',
        phone: initialData.phone ?? '',
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
  }, [initialData, open])

  if (!open) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError('Todos los campos son obligatorios.')
      return
    }
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.message ?? 'Ocurrió un error al guardar.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {initialData ? 'Editar estudiante' : 'Nuevo estudiante'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Nombre</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Apellido</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Celular</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Ej: 3052342345"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <PrimaryButton type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit">Guardar</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentForm
