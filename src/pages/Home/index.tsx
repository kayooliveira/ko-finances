import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/useAuth'

export function Home() {
  const { state } = useAuth()
  const navigate = useNavigate()
  if (!state.isAuthenticated) {
    navigate('/login')
  }
  return (
    <>
      <Header />
      <div className="relative -mt-16 flex items-center justify-center gap-8">
        <Card
          title="Entradas"
          value={35000}
          icon={<ArrowCircleUp className="h-8 w-8 text-brand-green" />}
        />
        <Card
          title="Saídas"
          value={5000}
          icon={<ArrowCircleDown className="h-8 w-8 text-brand-red" />}
        />
        <Card
          title="Total"
          value={30000}
          icon={<CurrencyDollar className="h-8 w-8 text-brand-white" />}
          isTotal
        />
      </div>
    </>
  )
}
