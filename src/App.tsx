import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import { Loading } from './components/Loading'
import { AuthProvider } from './contexts/AuthContext'
import { LoadingProvider } from './contexts/LoadingContext'
import { TransactionProvider } from './contexts/TransactionContext'
import { Router } from './router'

export function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <TransactionProvider>
            <Loading />
            <Router />
          </TransactionProvider>
        </AuthProvider>
        <Toaster />
      </BrowserRouter>
    </LoadingProvider>
  )
}
