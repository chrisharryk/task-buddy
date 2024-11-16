import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'

export default function App() {
  const { user } = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to={'/login'} />}></Route>
            <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />}></Route>
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/'} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}