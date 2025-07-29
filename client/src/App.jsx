import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import History from './components/History'

const App = () => {
  return (
    <div className='w-full min-h-screen'>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path="/history/:userId" element={<History />} />
      </Routes>
    </div>
  )
}

export default App