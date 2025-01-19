import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import HomePage from './HomePage'
import HomePage from './HomePage'
import { LoginSignup } from './LoginSignup'

export function RootCmp() {
  return (
    <div className="main-container full">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </main>
    </div>
  )
}
