import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import HomePage from './HomePage'
import App from './HomePage'
import { LoginSignup } from './LoginSignup'

export function RootCmp() {
  return (
    <div className="main-container full">
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </main>
    </div>
  )
}
