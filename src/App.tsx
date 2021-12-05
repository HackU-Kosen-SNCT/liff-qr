import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import QR from './components/pages/QR'
import Result from './components/pages/Result'

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
