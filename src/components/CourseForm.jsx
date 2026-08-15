import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

const emptyForm = {
  code: '',
  name: '',
  description: '',
  maxCapacity: '',
}

function CourseForm({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code ?? '',
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        maxCapacity: String(initialData.max_capacity ?? ''),
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
      await onSubmit({
        ...form,
        maxCapacity: Number(form.maxCapacity),
      })
      onClose()
    } catch (err) {
      setError(err.message ?? 'Error al guardar el curso')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {initialData ? 'Editar curso' : 'Nuevo curso'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad máxima</label>
            <input
              name="maxCapacity"
              type="number"
              min="1"
              value={form.maxCapacity}
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

export default CourseForm
