export default function NewStudentForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Nuevo estudiante
      </h2>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="first_name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Apellido
          </label>
          <input
            type="text"
            name="last_name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Correo
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Celular
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Ej: 3052342345"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-gray-400"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}