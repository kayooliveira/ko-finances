import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { NewTransactionModal } from '../../components/NewTransactionModal'
import { Transactions } from '../../components/Transactions'
import { useAuth } from '../../hooks/useAuth'

export function Home() {
  const { state: auth } = useAuth()
  const navigate = useNavigate()
  if (!auth.isAuthenticated) {
    navigate('/login')
  }
  return (
    <>
      <Header />
      <main className="mx-auto w-5/6 max-w-[1200px]">
        <div className="relative mx-auto -mt-16 flex w-full items-center justify-between gap-8 overflow-x-scroll scrollbar-thin scrollbar-thumb-brand-red scrollbar-track-brand-background">
          <Card type="incomes" />
          <Card type="outcomes" />
          <Card type="total" />
        </div>
        <NewTransactionModal />
        <Transactions />
      </main>
    </>
  )
}
