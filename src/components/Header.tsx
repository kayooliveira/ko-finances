import { Popover } from '@headlessui/react'
import { SignOut } from 'phosphor-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { Logo } from './Logo'

export function Header() {
  const { state, logout } = useAuth()
  return (
    <header className="relative h-52 bg-brand-pink pt-8">
      <div className="mx-auto flex w-5/6 items-start justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <Popover className="flex w-20 flex-col items-center gap-2">
            <Popover.Button
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
            </Popover.Button>
            <Popover.Panel className="right-0 z-10 animate-slide-from-bottom">
              <button
                type="button"
                title="sair"
                onClick={logout}
                className="flex items-center gap-1 rounded bg-brand-white py-3 px-4 font-bold text-brand-pink"
              >
                <SignOut weight="bold" /> Sair
              </button>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </header>
  )
}
