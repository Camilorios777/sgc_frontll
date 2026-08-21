function Navbar() {
  const today = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="h-16 w-full bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <span className="text-sm font-medium text-gray-500 capitalize">{today}</span>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          CE
        </div>
        <span className="text-sm font-medium text-gray-700">CESDE</span>
      </div>
    </header>
  )
}

export default Navbar
