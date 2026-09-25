import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

const emptyForm = { code: '', name: '', description: '', maxCapacity: '' }

function CourseForm({ open, initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code ?? '',
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        maxCapacity: initialData.maxCapacity ?? '',
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
    if (!form.code || !form.name || !form.maxCapacity) {
      setError('Código, nombre y cupo máximo son obligatorios.')
      return
    }
    if (Number(form.maxCapacity) <= 0) {
      setError('El cupo máximo debe ser mayor a 0.')
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
          {initialData ? 'Editar curso' : 'Nuevo curso'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Código</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Cupo máximo</label>
            <input
              type="number"
              min="1"
              name="maxCapacity"
              value={form.maxCapacity}
              onChange={handleChange}
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

export default CourseForm