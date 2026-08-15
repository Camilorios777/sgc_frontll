function EmptyState({ message }) {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )
}

export default EmptyState
