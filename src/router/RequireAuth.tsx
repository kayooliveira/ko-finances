import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

export function RequireAuth() {
  const { state } = useAuth()
  const location = useLocation()
  if (state.isAuthenticated) {
    return <Outlet />
  } else {
    return <Navigate to={`/login`} state={{ from: location }} replace />
  }
}
