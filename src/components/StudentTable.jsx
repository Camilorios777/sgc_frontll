function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Apellido</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Celular</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-800">{student.first_name}</td>
              <td className="px-4 py-3 text-gray-800">{student.last_name}</td>
              <td className="px-4 py-3 text-gray-600">{student.email}</td>
              <td className="px-4 py-3 text-gray-600">{student.phone}</td>
              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <button
                  onClick={() => onEdit(student)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(student)}
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

export default StudentTable
