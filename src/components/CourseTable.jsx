function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Cupo máximo</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-800 font-medium">{course.code}</td>
              <td className="px-4 py-3 text-gray-800">{course.name}</td>
              <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                {course.description}
              </td>
              <td className="px-4 py-3 text-gray-600">{course.maxCapacity}</td>
              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <button
                  onClick={() => onEdit(course)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(course)}
                  className="text-red-600 hover:underline text-sm font-medium"
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