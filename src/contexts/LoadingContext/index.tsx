import React, { createContext, Reducer } from 'react'

type State = {
  isLoading: boolean
}

const initialState = {
  isLoading: true
}

type LoadingContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

export enum LoadingActions {
  setLoading
}

type Action = {
  type: LoadingActions
  payload: any
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
)

const LoadingReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case LoadingActions.setLoading:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

interface LoadingProviderProps {
  children: React.ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [state, dispatch] = React.useReducer(LoadingReducer, initialState)
  const value = { state, dispatch }
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}
