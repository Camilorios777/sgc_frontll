import axios from 'axios';

const backendUrl = 'http://localhost:8080';

export async function getCourses() {
  const response = await axios.get(`${backendUrl}/api/courses`);
  return response.data;
}

export async function createCourse(course) {
  const response = await axios.post(`${backendUrl}/api/courses`, {
    code: course.code,
    name: course.name,
    description: course.description,
    maxCapacity: Number(course.maxCapacity),
  });
  return response.data;
}

export async function updateCourse(id, course) {
  const response = await axios.put(`${backendUrl}/api/courses/${id}`, {
    code: course.code,
    name: course.name,
    description: course.description,
    maxCapacity: Number(course.maxCapacity),
  });
  return response.data;
}

export async function deleteCourse(id) {
  await axios.delete(`${backendUrl}/api/courses/${id}`);
}