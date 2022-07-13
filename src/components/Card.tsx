import classNames from 'classnames'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import React, { HTMLAttributes } from 'react'

import { useTransaction } from '../hooks/useTransaction'
import { formatCurrency } from '../utils/formatCurrency'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  type: 'incomes' | 'outcomes' | 'total'
}

export function Card({ type, ...props }: CardProps) {
  const { state: transactions } = useTransaction()

  const icons = {
    incomes: <ArrowCircleUp className="h-8 w-8 text-brand-green" />,
    outcomes: <ArrowCircleDown className="h-8 w-8 text-brand-red" />,
    total: <CurrencyDollar className="h-8 w-8 text-brand-white" />
  }
  const titles = {
    incomes: 'Entradas',
    outcomes: 'Saídas',
    total: 'Total'
  }

  return (
    <div
      {...props}
      className={classNames('h-[8.5rem] w-[20rem] shrink-0 rounded py-6 px-8', {
        'bg-brand-green text-brand-white': type === 'total',
        'bg-brand-white py-6 px-8 text-brand-title': type !== 'total'
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-thin">{titles[type]}</span>
        <span className="block">{icons[type]}</span>
      </div>
      <span className="text-3xl">{formatCurrency(transactions[type])}</span>
    </div>
  )
}
