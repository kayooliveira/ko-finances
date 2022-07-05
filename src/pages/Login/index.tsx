import { GoogleLogo } from 'phosphor-react'
import React, { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LogoPink } from '../../components/LogoPink'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const { login, state } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/')
    }
  }, [navigate, state.isAuthenticated])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login()
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-brand-pink">
      <div className="rounded bg-brand-white py-8 px-4">
        <LogoPink className="mx-auto" />
        <hr className="my-4" />
        <form className="w-full" action="" onSubmit={handleSubmit}>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded bg-brand-red py-4 px-8 leading-none text-brand-white transition-all duration-150 hover:rounded-3xl hover:bg-brand-title"
          >
            <GoogleLogo weight="fill" size="24" /> Login com Google
          </button>
        </form>
      </div>
    </div>
  )
}
