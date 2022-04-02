import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Navigate
} from 'react-router-dom'

import { Home } from './pages'

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default Routing
