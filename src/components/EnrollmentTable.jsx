const statusStyles = {
  ACTIVE: 'bg-green-100 text-green-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

const statusLabels = {
  ACTIVE: 'Activa',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada',
}

function EnrollmentTable({ enrollments, onChangeStatus, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Estudiante</th>
            <th className="px-4 py-3">Curso</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-800">
                {enrollment.students
                  ? `${enrollment.students.first_name} ${enrollment.students.last_name}`
                  : '—'}
              </td>
              <td className="px-4 py-3 text-gray-800">
                {enrollment.courses
                  ? `${enrollment.courses.code} - ${enrollment.courses.name}`
                  : '—'}
              </td>
              <td className="px-4 py-3 text-gray-600">{enrollment.enrollment_date}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[enrollment.status]}`}
                >
                  {statusLabels[enrollment.status] ?? enrollment.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                {enrollment.status === 'ACTIVE' && (
                  <>
                    <button
                      onClick={() => onChangeStatus(enrollment, 'COMPLETED')}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => onChangeStatus(enrollment, 'CANCELLED')}
                      className="text-amber-600 hover:underline text-sm font-medium"
                    >
                      Cancelar
                    </button>
                  </>
                )}
                <button
                  onClick={() => onDelete(enrollment)}
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

export default EnrollmentTable
