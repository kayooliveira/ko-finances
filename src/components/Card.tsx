import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'

import { formatCurrency } from '../utils/formatCurrency'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: number
  isTotal?: boolean
  icon: JSX.Element
}

export function Card({ title, value, icon, isTotal, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={classNames('h-[8.5rem] w-[22rem] rounded py-6 px-8', {
        'bg-brand-green text-brand-white': isTotal,
        'bg-brand-white py-6 px-8 text-brand-title': !isTotal
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-thin">{title}</span>
        <span className="block">{icon}</span>
      </div>
      <span className="text-3xl">{formatCurrency(value)}</span>
    </div>
  )
}
