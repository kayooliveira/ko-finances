import React from 'react'

import { useAuth } from '../hooks/useAuth'
import { Logo } from './Logo'

export function Header() {
  const { state } = useAuth()
  return (
    <header className="relative h-52 bg-brand-pink pt-8">
      <div className="mx-auto flex w-5/6 items-center justify-between">
        <Logo />
        <div>
          <button
            title={state.user.name}
            className="group flex flex-col items-center justify-center"
          >
            <img
              src={state.user.profileAvatar}
              alt="Avatar do usuário"
              referrerPolicy="no-referrer"
              className="box-box w-14 rounded-full border-2 border-brand-green p-[2px] transition-all group-hover:p-1"
            />
            <span className="font-bold text-brand-white transition-colors group-hover:text-brand-green">
              {state.user.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
