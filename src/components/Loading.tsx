import React from 'react'

import { useLoading } from '../hooks/useLoading'
import { Icon } from './Icon'

export function Loading() {
  const { state } = useLoading()
  return state.isLoading ? (
    <div className="bg-brand-bakground flex h-screen w-screen items-center justify-center">
      <Icon className="animate-spin" />
    </div>
  ) : (
    <></>
  )
}
