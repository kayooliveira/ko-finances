import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import { Category } from '../@types'
import { TransactionActions } from '../contexts/TransactionContext'
import { useAuth } from '../hooks/useAuth'
import { useTransaction } from '../hooks/useTransaction'

export function NewTransactionModal() {
  const { dispatch } = useTransaction()
  const { state: auth } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function createNewTransaction() {
    dispatch({
      type: TransactionActions.addTransaction,
      payload: {
        id: Math.random().toString(),
        title: 'Novo lançamento',
        type: 'outcome',
        amount: -100,
        category: Category.food,
        createdAt: new Date(),
        userId: auth.user.uid
      }
    })
    closeModal()
  }

  return (
    <>
      <button
        onClick={openModal}
        className="float-right mt-4 rounded bg-brand-green py-3 px-4 font-bold text-brand-white hover:bg-brand-green/50"
      >
        Nova transação
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded bg-brand-background p-6 px-12 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-8 border-brand-pink text-xl font-bold leading-6 text-brand-title"
                  >
                    Cadastrar transação
                  </Dialog.Title>
                  <div className="mt-2">
                    <form className="flex w-full flex-col">
                      <div className="-mx-3 mb-6 flex flex-col items-center justify-center gap-4">
                        <input
                          className="block w-full rounded border py-5 px-6 placeholder:text-brand-pink"
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Título"
                        />
                        <input
                          className="block w-full rounded border py-5 px-6 placeholder:text-brand-pink"
                          id="price"
                          name="price"
                          type="text"
                          placeholder="Preço"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded border border-transparent bg-brand-pink px-4 py-2 text-sm font-bold text-brand-white transition-colors hover:bg-brand-pink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={createNewTransaction}
                    >
                      Criar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
