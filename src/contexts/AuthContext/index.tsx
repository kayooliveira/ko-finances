import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence
} from 'firebase/auth'
import React, { createContext, Reducer, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import { app } from '../../firebase'

type UserType = {
  name: string
  profileAvatar: string
  email: string
}

type State = {
  isAuthenticated: boolean
  user: UserType
}

const initialState: State = {
  isAuthenticated: false,
  user: {
    name: '',
    profileAvatar: '',
    email: ''
  }
}

type AuthContextType = {
  state: State
  dispatch: React.Dispatch<Action>
  login: () => void
}

export enum AuthActions {
  setUser,
  setIsAuthenticated
}

type Action = {
  type: AuthActions
  payload: any
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case AuthActions.setUser:
      return {
        ...state,
        user: action.payload
      }
    case AuthActions.setIsAuthenticated:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    default:
      return state
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  auth.setPersistence(browserLocalPersistence)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: AuthActions.setUser,
          payload: {
            name: user.displayName,
            profileAvatar: user.photoURL,
            email: user.email
          }
        })
        dispatch({
          type: AuthActions.setIsAuthenticated,
          payload: true
        })
      }
    })
  }, [auth])

  async function login() {
    const auth = getAuth(app)
    const result = await signInWithPopup(auth, provider)
    dispatch({
      type: AuthActions.setUser,
      payload: {
        name: result.user.displayName,
        profileAvatar: result.user.photoURL,
        email: result.user.email
      }
    })
    dispatch({
      type: AuthActions.setIsAuthenticated,
      payload: true
    })
    navigate('/')
  }
  console.log(state)
  const value: AuthContextType = { state, dispatch, login }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
