import { Transition, Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Category } from '../@types'
import { TransactionActions } from '../contexts/TransactionContext'
import { useAuth } from '../hooks/useAuth'
import { useTransaction } from '../hooks/useTransaction'

type FormInputs = {
  title: string
  amount: number
  category: Category
}

const schema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
  amount: yup
    .number()
    .positive('O número deve ser positivo')
    .transform(value => (isNaN(value) ? 0 : value))
    .required('O valor é obrigatório'),
  category: yup
    .string()
    .oneOf(Object.values(Category))
    .required('A categoria é obrigatória')
})

export function NewTransactionModal() {
  const { dispatch } = useTransaction()
  const { state: auth } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<'income' | 'outcome'>(
    'income'
  )
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormInputs>({ resolver: yupResolver(schema) })

  function setTransactionTypeToIncomes() {
    setTransactionType('income')
  }

  function setTransactionTypeToOutcomes() {
    setTransactionType('outcome')
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function onSubmit(values: FormInputs) {
    dispatch({
      type: TransactionActions.addTransaction,
      payload: {
        id: Math.random().toString(),
        title: values.title,
        type: transactionType,
        amount:
          transactionType === 'income' ? values.amount : values.amount * -1,
        category: values.category,
        createdAt: new Date(),
        userId: auth.user.uid
      }
    })
    reset()
    closeModal()
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <button
          onClick={openModal}
          className="mt-4 rounded-md bg-brand-green py-3 px-4 font-bold text-brand-white hover:bg-brand-green/50"
        >
          Nova transação
        </button>
      </div>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-brand-background px-12 pt-[4.5rem] pb-14 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-8 border-brand-pink text-xl font-bold leading-6 text-brand-title"
                  >
                    Cadastrar transação
                  </Dialog.Title>
                  <div className="flex items-center justify-center">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex w-full flex-col gap-4"
                    >
                      <div className="flex flex-col items-center justify-center gap-4">
                        <input
                          className="block w-full rounded-md border py-5 px-6 placeholder:text-brand-pink"
                          id="title"
                          {...register('title')}
                          type="text"
                          placeholder="Nome"
                        />
                        <span className="text-xs text-brand-red">
                          {errors.title?.message}
                        </span>
                        <input
                          className="block w-full rounded-md border py-5 px-6 placeholder:text-brand-pink"
                          id="amount"
                          {...register('amount')}
                          type="number"
                          placeholder="Preço"
                        />
                        <span className="text-xs text-brand-red">
                          {errors.amount?.message}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={setTransactionTypeToIncomes}
                          className={classNames(
                            'flex w-full items-center justify-center gap-4 rounded-md border-2 px-16 py-5 text-brand-title transition-colors',
                            {
                              'border-brand-green':
                                transactionType === 'income',
                              'border-brand-title/20':
                                transactionType !== 'income'
                            }
                          )}
                        >
                          <ArrowCircleUp
                            size="24"
                            className="text-brand-green"
                          />
                          Entrada
                        </button>
                        <button
                          type="button"
                          onClick={setTransactionTypeToOutcomes}
                          className={classNames(
                            'flex w-full items-center justify-center gap-4 rounded-md border-2 px-16 py-5 text-brand-title transition-colors',
                            {
                              'border-brand-green':
                                transactionType === 'outcome',
                              'border-brand-title/20':
                                transactionType !== 'outcome'
                            }
                          )}
                        >
                          <ArrowCircleDown size="24" />
                          Saída
                        </button>
                      </div>
                      <div>
                        <select
                          {...register('category')}
                          id="category"
                          className="w-full rounded-md px-6 py-5 text-brand-title"
                        >
                          {Object.values(Category).map(c => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <span className="text-xs text-brand-red">
                          {errors.category?.message}
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="mt-2 w-full rounded-md bg-brand-green py-5 text-center font-bold text-brand-white transition-colors hover:bg-brand-green/70"
                      >
                        Criar
                      </button>
                    </form>
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
