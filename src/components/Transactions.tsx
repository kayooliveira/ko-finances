import { AnimatePresence } from 'framer-motion'
import React from 'react'

import { useTransaction } from '../hooks/useTransaction'
import { NoTransactions } from './NoTransactions'
import { Transaction } from './Transaction'

export function Transactions() {
  const { state: transactions } = useTransaction()

  return (
    <div className="mx-auto mt-4">
      {transactions.transactions.length > 0 ? (
        <table className="w-full table-fixed border-separate border-spacing-y-2 bg-brand-background text-left">
          <thead className="text-brand-title">
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Data</th>
              <th className="text-right">Remover</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {transactions.transactions.map(transaction => (
                <Transaction key={transaction.id} {...transaction} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      ) : (
        <NoTransactions />
      )}
    </div>
  )
}
