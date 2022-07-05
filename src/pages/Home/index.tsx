import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/useAuth'

export function Home() {
  const { state } = useAuth()
  const navigate = useNavigate()
  if (!state.isAuthenticated) {
    navigate('/login')
  }
  return <Header />
}
