const statusLabels = {
  ACTIVE: 'Activa',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada',
}

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

function EnrollmentTable({ enrollments }) {
  if (enrollments.length === 0) return null

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Estudiante</th>
            <th className="px-4 py-3 text-left">Curso</th>
            <th className="px-4 py-3 text-left">Fecha matrícula</th>
            <th className="px-4 py-3 text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">
                {enrollment.students?.first_name} {enrollment.students?.last_name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {enrollment.courses?.code} — {enrollment.courses?.name}
              </td>
              <td className="px-4 py-3 text-gray-600">{enrollment.enrollment_date}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[enrollment.status]}`}>
                  {statusLabels[enrollment.status] ?? enrollment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EnrollmentTable
