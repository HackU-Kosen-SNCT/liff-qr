import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import QR from './QR'
import Result from './Result'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<QR />} />
        <Route path='result' element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App
