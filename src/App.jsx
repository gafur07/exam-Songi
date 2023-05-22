import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const App = () => {
  return (
    <>
    <Routes>
      <Route>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App