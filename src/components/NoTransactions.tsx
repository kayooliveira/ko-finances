import { BookOpen } from 'phosphor-react'
import React from 'react'

export function NoTransactions() {
  return (
    <div className=" flex w-full flex-col items-center justify-center gap-4 rounded-md border border-brand-pink/20 px-8 py-20 text-xl font-bold text-brand-title">
      <BookOpen weight="fill" size="64" />
      <p>Você ainda não cadastrou nenhuma transação!</p>
    </div>
  )
}
