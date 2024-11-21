import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Teacher from './pages/teacher';
import Position from './pages/Position';


function App() {


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto my-8 ml-6'>
          <Routes>
            <Route path='/teacher' element={<Teacher />} />
            <Route path='/position' element={<Position />} />
          </Routes>
        </div>

      </div>

    </div>
  )
}

export default App
