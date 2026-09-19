import axios from 'axios';

const backendUrl = 'http://localhost:8080';

export async function getStudents() {
    const response = await axios.get(`${backendUrl}/api/students`);
    return response.data;
}

export async function createStudent(student) {
    const response = await axios.post(`${backendUrl}/api/students`, {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        birthDate: student.birthDate,
    });
    return response.data;
}

export async function updateStudent(id, student) {
    const response = await axios.put(`${backendUrl}/api/students/${id}`, {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        birthDate: student.birthDate,
    });
    return response.data;
}

export async function deleteStudent(id) {
    await axios.delete(`${backendUrl}/api/students/${id}`);
}