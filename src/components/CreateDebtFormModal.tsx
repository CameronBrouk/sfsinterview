import React, { useState } from 'react'
import { DebtListItem } from './DebtTable'

type Props = {
  addDebt: (debtInfo: CreateDebtFormData) => void
  closeForm: () => void
}

export type CreateDebtFormData = Omit<DebtListItem, 'id' | 'checked'>

const defaultFormData = {
  firstName: '',
  lastName: '',
  creditorName: '',
  balance: 0,
  minPaymentPercentage: 0,
}

export const CreateDebtFormModal = ({ addDebt, closeForm }: Props) => {
  const [formValue, setFormValue] =
    useState<CreateDebtFormData>(defaultFormData)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    addDebt(formValue)
    closeForm()
  }

  return (
    <div className='absolute bottom-24 left-1/4 z-20 border border-blue-200 rounded-md shadow-md bg-white w-1/2 h-1/2'>
      <h2 className='font-medium text-xl text-center pb-4 pt-2 border-b'>
        Create a New Debt
      </h2>
      <form onSubmit={onSubmit}>
        <div className='m-2'>
          <label htmlFor='firstName'>First Name</label>
          <input
            name='firstName'
            onChange={e =>
              setFormValue(form => ({ ...form, firstName: e.target.value }))
            }
            className='w-full rounded-md border border-blue-200'
          />
        </div>
        <div className='m-2'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            name='lastName'
            className='w-full rounded-md border border-blue-200'
            onChange={e =>
              setFormValue(form => ({ ...form, lastName: e.target.value }))
            }
          />
        </div>
        <div className='m-2'>
          <label htmlFor='creditor'>Creditor Name</label>
          <input
            name='creditorName'
            className='w-full rounded-md border border-blue-200'
            onChange={e =>
              setFormValue(form => ({ ...form, creditorName: e.target.value }))
            }
          />
        </div>
        <div className='m-2'>
          <label htmlFor='balance'>Balance</label>
          <input
            name='balance'
            type='number'
            className='w-full rounded-md border border-blue-200'
            onChange={e =>
              setFormValue(form => ({
                ...form,
                balance: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className='m-2'>
          <label htmlFor='minPaymentPercentage'>Min Payment Percentage</label>
          <input
            name='minPaymentPercentage'
            type='number'
            className='w-full rounded-md border border-blue-200'
            onChange={e =>
              setFormValue(form => ({
                ...form,
                minPaymentPercentage: parseInt(e.target.value),
              }))
            }
          />
        </div>

        <div className='flex space-x-2'>
          <button
            type='submit'
            className='font-medium text-white rounded-md bg-blue-400 p-2 m-2 '>
            Create Debt
          </button>
          <button
            type='button'
            onClick={closeForm}
            className='font-medium text-gray-500'>
            Close Form
          </button>
        </div>
      </form>
    </div>
  )
}
