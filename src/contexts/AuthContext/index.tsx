import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence
} from 'firebase/auth'
import React, { createContext, Reducer, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import { app } from '../../firebase'
import { useLoading } from '../../hooks/useLoading'
import { LoadingActions } from '../LoadingContext'

type UserType = {
  uid: string
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
    uid: '',
    name: '',
    profileAvatar: '',
    email: ''
  }
}

type AuthContextType = {
  state: State
  dispatch: React.Dispatch<Action>
  login: () => void
  logout: () => void
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
  const { dispatch: loadingDispatch } = useLoading()

  useEffect(() => {
    loadingDispatch({ type: LoadingActions.setLoading, payload: true })
  }, [loadingDispatch])

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
        loadingDispatch({ type: LoadingActions.setLoading, payload: false })
      }
      loadingDispatch({ type: LoadingActions.setLoading, payload: false })
    })
  }, [auth, loadingDispatch])

  async function login() {
    try {
      loadingDispatch({ type: LoadingActions.setLoading, payload: true })
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
      loadingDispatch({ type: LoadingActions.setLoading, payload: false })
      navigate('/')
    } catch (error) {
      console.error(error)
      loadingDispatch({ type: LoadingActions.setLoading, payload: false })
    }
  }

  async function logout() {
    try {
      loadingDispatch({ type: LoadingActions.setLoading, payload: true })
      await auth.signOut()
      dispatch({
        type: AuthActions.setUser,
        payload: {
          name: '',
          profileAvatar: '',
          email: ''
        }
      })
      dispatch({
        type: AuthActions.setIsAuthenticated,
        payload: false
      })
      loadingDispatch({ type: LoadingActions.setLoading, payload: false })
      navigate('/login')
    } catch (error) {
      console.error(error)
      loadingDispatch({ type: LoadingActions.setLoading, payload: false })
    }
  }

  const value: AuthContextType = { state, dispatch, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
