import PrimaryButton from './PrimaryButton'

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">{message}</p>

        <div className="flex justify-end gap-2 mt-6">
          <PrimaryButton variant="secondary" onClick={onCancel}>
            Cancelar
          </PrimaryButton>
          <PrimaryButton variant="danger" onClick={onConfirm}>
            Eliminar
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
