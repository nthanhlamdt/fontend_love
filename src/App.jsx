import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/index'
import Home from './pages/Home/page'
import Album from './pages/Album/page'
import Celebrate from './pages/Celebrate/page'
import Challenges from './pages/Challenges/page'
import Cooking from './pages/Cooking/page'
import Learning from './pages/Learning/page'
import TimeCapsule from './pages/TimeCapsule/page'
import VirtualGifts from './pages/VirtualGifts/page'
import PostPicture from './pages/PostPicture/page'
import Login from './pages/Auth/Login/page'
import Signup from './pages/Auth/Signup/page'
import { Toaster } from 'react-hot-toast'
// import { useAuthContext } from './context/authContext'
import { dataTest } from '../Data/DATATEST'

function App() {
  const location = useLocation()
  // const { authUser } = useAuthContext()

  return (
    <div className='flex flex-col min-h-screen'>
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <div className='fixed top-0 right-0 left-0 z-10'>
          <Navbar dataTest={dataTest} />
        </div>
      )}
      <div className={`flex-1 ${location.pathname !== '/signup' && location.pathname !== '/login' ? 'mt-10' : ''}`}>
        <Routes>
          {/* <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/album' element={<Album />} />
          <Route path='/celebrate' element={<Celebrate />} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/cooking' element={<Cooking />} />
          <Route path='/learning' element={<Learning />} />
          <Route path='/timeCapsule' element={<TimeCapsule />} />
          <Route path='/virtualGifts' element={<VirtualGifts />} />
          <Route path='/postPicture' element={<PostPicture />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} /> */}
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App
