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
import Login from './pages/Login/page'
import Signup from './pages/Signup/page'

function App() {
  const location = useLocation()

  return (
    <div className='flex flex-col h-screen'>
      {location.pathname !== '/signup' && location.pathname !== '/login' && <Navbar className='fixed top-0 right-0 left-0 z-10' />}
      <div className='flex-1 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/album' element={<Album />} />
          <Route path='/celebrate' element={<Celebrate />} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/cooking' element={<Cooking />} />
          <Route path='/learning' element={<Learning />} />
          <Route path='/timeCapsule' element={<TimeCapsule />} />
          <Route path='/virtualGifts' element={<VirtualGifts />} />
          <Route path='/postPicture' element={<PostPicture />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
