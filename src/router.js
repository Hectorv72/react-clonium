import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Navigate
} from 'react-router-dom'

import { Home, Menu, Room } from './pages'

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/room/:room' element={<Room />} />
      </Routes>
    </Router>
  )
}

export default Routing
