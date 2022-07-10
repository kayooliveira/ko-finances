import classNames from 'classnames'
import { format, formatDistanceToNow, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Trash } from 'phosphor-react'
import React from 'react'

import { Transaction as TransactionType } from '../@types'
import { TransactionActions } from '../contexts/TransactionContext'
import { useTransaction } from '../hooks/useTransaction'
import { formatCurrency } from '../utils/formatCurrency'

export function Transaction(transaction: TransactionType) {
  const { dispatch } = useTransaction()
  const formattedDate = format(transaction.createdAt, 'dd/MM/yyyy')
  const formattedDateFromNow = formatDistanceToNow(transaction.createdAt, {
    addSuffix: true,
    locale: ptBR
  })
  const formattedDateIso = formatISO(transaction.createdAt)

  function deleteTransaction() {
    dispatch({
      type: TransactionActions.removeTransaction,
      payload: transaction
    })
  }
  const variants = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.1
      }
    }
  }

  return (
    <motion.tr
      initial="initial"
      layout
      animate="animate"
      exit="exit"
      variants={variants}
      className="rounded bg-brand-white text-left text-brand-title transition-colors hover:bg-brand-white/70"
      key={transaction.id}
    >
      <td>{transaction.title}</td>
      <td
        className={classNames('', {
          'text-brand-green': transaction.type === 'income',
          'text-brand-red': transaction.type === 'outcome'
        })}
      >
        {formatCurrency(transaction.amount)}
      </td>
      <td>{transaction.category}</td>
      <td>
        <time dateTime={formattedDateIso} title={formattedDateFromNow}>
          {formattedDate}
        </time>
      </td>
      <td className="text-right">
        <button
          className="transition-colors hover:text-brand-green"
          onClick={deleteTransaction}
        >
          <Trash size="24" weight="fill" />
        </button>
      </td>
    </motion.tr>
  )
}
