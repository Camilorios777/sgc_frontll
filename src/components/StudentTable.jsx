function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) return null

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Apellido</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Fecha nacimiento</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{student.first_name}</td>
              <td className="px-4 py-3 text-gray-600">{student.last_name}</td>
              <td className="px-4 py-3 text-gray-600">{student.email}</td>
              <td className="px-4 py-3 text-gray-600">{student.birth_date}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(student)}
                  className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(student)}
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

export default StudentTable
