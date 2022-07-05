import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { RequireAuth } from './RequireAuth'

export function Router() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<h1> Página não encontrada</h1>} />
    </Routes>
  )
}
