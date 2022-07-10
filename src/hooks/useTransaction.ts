import { useContext } from 'react'

import { TransactionContext } from './../contexts/TransactionContext/index'

export function useTransaction() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error("This component haven't acces to this context")
  }
  return context
}
