import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Courses from './pages/Courses'
import Enrollments from './pages/Enrollments'

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/enrollments" element={<Enrollments />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
