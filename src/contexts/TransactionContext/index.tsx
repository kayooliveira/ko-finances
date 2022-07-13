import { child, get, ref, set } from 'firebase/database'
import React, {
  createContext,
  Reducer,
  useCallback,
  useEffect,
  useReducer
} from 'react'

import { Transaction } from '../../@types'
import { db } from '../../firebase'
import { useAuth } from '../../hooks/useAuth'

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
  removeTransaction,
  clearTransactions
}

type TransactionContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const TransactionContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps
)

async function newTransaction(transaction: Transaction) {
  try {
    const dbRef = ref(
      db,
      `users/${transaction.userId}/transactions/${transaction.id}`
    )
    await set(dbRef, JSON.stringify(transaction))
  } catch (error) {
    console.log(error)
  }
}

async function deleteTransaction(transaction: Transaction) {
  try {
    const dbRef = ref(
      db,
      `users/${transaction.userId}/transactions/${transaction.id}`
    )
    await set(dbRef, null)
  } catch (error) {
    console.log(error)
  }
}

const TransactionReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case TransactionActions.addTransaction:
      newTransaction(action.payload)
      return {
        ...state,
        transactions: [
          ...state.transactions,
          { ...action.payload, createdAt: new Date() }
        ],
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
      deleteTransaction(action.payload)
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
    case TransactionActions.clearTransactions:
      return initialState
    default:
      return state
  }
}

interface TransactionProviderProps {
  children: React.ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [state, dispatch] = useReducer(TransactionReducer, initialState)
  const { state: auth } = useAuth()
  const value = { state, dispatch }

  const getTransactions = useCallback(async () => {
    const dbRef = ref(db)
    const transactions = await get(
      child(dbRef, `users/${auth.user.uid}/transactions`)
    )
    const transactionsJson = transactions.toJSON()
    dispatch({
      type: TransactionActions.clearTransactions,
      payload: {} as Transaction
    })
    if (transactionsJson) {
      Object.values(transactionsJson).map(transaction => {
        return dispatch({
          type: TransactionActions.addTransaction,
          payload: JSON.parse(transaction) as Transaction
        })
      })
    }
    return transactions.toJSON()
  }, [auth.user.uid])

  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}
