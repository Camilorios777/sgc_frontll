import axios from 'axios';

const backendUrl = 'http://localhost:8080';

export async function getEnrollments() {
  const response = await axios.get(`${backendUrl}/api/enrollments`);
  return response.data;
}

export async function createEnrollment({ studentId, courseId }) {
  const response = await axios.post(`${backendUrl}/api/enrollments`, null, {
    params: { studentId, courseId },
  });
  return response.data;
}

export async function cancelEnrollment(id) {
  await axios.patch(`${backendUrl}/api/enrollments/${id}/cancel`);
}

export async function completeEnrollment(id) {
  await axios.patch(`${backendUrl}/api/enrollments/${id}/complete`);
}

export async function deleteEnrollment(id) {
  await axios.delete(`${backendUrl}/api/enrollments/${id}`);
}