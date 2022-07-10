import { Popover, Transition } from '@headlessui/react'
import { SignOut } from 'phosphor-react'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { Logo } from './Logo'

export function Header() {
  const { state, logout } = useAuth()
  return (
    <header className="z-10 h-52 bg-brand-pink pt-8">
      <div className="mx-auto flex w-5/6 items-start justify-between">
        <Link to="/">
          <Logo />
        </Link>
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

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-3"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 translate-y-3"
          >
            <Popover.Panel className="right-0 z-10">
              <button
                type="button"
                title="sair"
                onClick={logout}
                className="flex items-center gap-1 rounded bg-brand-white py-3 px-4 font-bold text-brand-pink"
              >
                <SignOut weight="bold" /> Sair
              </button>
            </Popover.Panel>
          </Transition.Child>
        </Popover>
      </div>
    </header>
  )
}
