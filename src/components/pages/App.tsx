import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import liff from '@line/liff'
import QR from './QR'
import Result from './Result'

const App: React.FC = () => {
  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login()
        }
      })
  }, [])
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
