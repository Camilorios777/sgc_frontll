function CourseTable({ courses, onEdit, onDelete }) {
  if (courses.length === 0) return null

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Código</th>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Descripción</th>
            <th className="px-4 py-3 text-left">Capacidad</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{course.code}</td>
              <td className="px-4 py-3 text-gray-600">{course.name}</td>
              <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{course.description}</td>
              <td className="px-4 py-3 text-gray-600">{course.max_capacity}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(course)}
                  className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(course)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseTable
