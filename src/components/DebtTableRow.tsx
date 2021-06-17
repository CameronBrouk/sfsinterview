import React from 'react'
import { Debt } from '../debt.types'

type Props = {
  debtInfo: Debt
  removeDebt: (id: number) => void
}

export const DebtTableRow = ({ debtInfo, ...props }: Props) => {
  const rowClasses = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500'
  return (
    <tr key={debtInfo.id}>
      <td className={rowClasses}>{debtInfo.creditorName}</td>
      <td className={rowClasses}>{debtInfo.firstName}</td>
      <td className={rowClasses}>{debtInfo.lastName}</td>
      <td className={rowClasses}>{debtInfo.minPaymentPercentage}</td>
      <td className={rowClasses}>{debtInfo.balance}</td>
      <td className={rowClasses}>
        <button
          className='text-white p-1 px-2 rounded-md bg-red-400 font-medium'
          onClick={() => props.removeDebt(debtInfo.id)}>
          REMOVE
        </button>
      </td>
    </tr>
  )
}
