import React from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import { ThemeProvider } from './Context/ThemeContext'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import { useSelector } from 'react-redux'
import ProfilePage from './components/ProfilePage'



const App = () => {

const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div>
      
        <ThemeProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/profile/:userId' element={isAuth ? <ProfilePage/> : <Navigate to='/login'/>}/>
      </Routes>
      </ThemeProvider>
      
    </div>
  )
}

export default App