function EmptyState({ message = 'No hay datos para mostrar.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-300 rounded-lg bg-white">
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )
}

export default EmptyState
