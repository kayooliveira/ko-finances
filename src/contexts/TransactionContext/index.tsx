import React, { createContext, Reducer, useReducer } from 'react'

import { Transaction } from '../../@types'

type State = {
  transactions: Transaction[]
  incomes: number
  outcomes: number
  total: number
}

const initialState = {
  transactions: [],
  incomes: 0,
  outcomes: 0,
  total: 0
} as State

type Action = {
  type: TransactionActions
  payload: Transaction
}

export enum TransactionActions {
  addTransaction,
  removeTransaction
}

type TransactionContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const TransactionContext = createContext<
  TransactionContextProps | undefined
>(undefined)

const TransactionReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case TransactionActions.addTransaction:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        total: state.total + action.payload.amount,
        incomes:
          action.payload.type === 'income'
            ? state.incomes + action.payload.amount
            : state.incomes,
        outcomes:
          action.payload.type === 'outcome'
            ? state.outcomes + action.payload.amount
            : state.outcomes
      }
    case TransactionActions.removeTransaction:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload.id
        ),
        total: state.total - action.payload.amount,
        incomes:
          action.payload.type === 'income'
            ? state.incomes - action.payload.amount
            : state.incomes,
        outcomes:
          action.payload.type === 'outcome'
            ? state.outcomes - action.payload.amount
            : state.outcomes
      }
    default:
      return state
  }
}

interface TransactionProviderProps {
  children: React.ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [state, dispatch] = useReducer(TransactionReducer, initialState)
  const value = { state, dispatch }
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}
