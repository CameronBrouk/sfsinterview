import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Debt } from '../debt.types'
import { DebtTableRow } from './DebtTableRow'
import { CreateDebtFormData, CreateDebtFormModal } from './CreateDebtFormModal'

export type DebtListItem = Debt & { checked: boolean }

export const DebtTable = () => {
  const [debtList, setDebtList] = useState<DebtListItem[]>([])
  const [createFormShowing, setCreateFormShowing] = useState(false)

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json',
      )
      .then(({ data }) => {
        setDebtList(data.map((debt: Debt) => ({ ...debt, checked: false })))
      })
  }, [])

  const removeDebt = (id: number) => {
    setDebtList(debt => debt.filter(debt => id !== debt.id))
  }

  const toggleCheckbox = (id: number) => {
    setDebtList(debt =>
      debt.reduce((acc, curr) => {
        if (curr.id === id) return [...acc, { ...curr, checked: !curr.checked }]
        return [...acc, curr]
      }, [] as DebtListItem[]),
    )
  }

  const toggleAllCheckboxes = () => {
    setDebtList(debt =>
      debt.map(debtInfo => ({ ...debtInfo, checked: !debtInfo.checked })),
    )
  }

  const removeAllCheckedDebts = () => {
    setDebtList(debt => debt.filter(({ checked }) => !checked))
  }

  const getTotalDebt = (allDebts: DebtListItem[]) =>
    allDebts.reduce((acc, { balance }) => balance + acc, 0)

  const addDebt = (debt: Omit<DebtListItem, 'id' | 'checked'>) => {
    setDebtList(debtList => [
      ...debtList,
      { ...debt, checked: false, id: debtList.length },
    ])
  }

  const tableRowClasses =
    'px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'

  return (
    <div className='w-3/4 relative'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            {/* Table */}
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className={`${tableRowClasses}`}>
                      <input
                        type='checkbox'
                        name='checkAll'
                        onChange={toggleAllCheckboxes}
                      />
                    </th>
                    <th scope='col' className={tableRowClasses}>
                      Creditor
                    </th>
                    <th scope='col' className={tableRowClasses}>
                      First Name
                    </th>
                    <th scope='col' className={tableRowClasses}>
                      Last Name
                    </th>
                    <th scope='col' className={tableRowClasses}>
                      Min Pay%
                    </th>
                    <th scope='col' className={tableRowClasses}>
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {debtList.length > 0 &&
                    debtList.map(debt => (
                      <DebtTableRow
                        debtInfo={debt}
                        removeDebt={removeDebt}
                        toggleCheckbox={toggleCheckbox}
                      />
                    ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className='flex'>
              <button
                className='bg-red-500 text-white p-2 m-2 rounded-md'
                onClick={removeAllCheckedDebts}>
                Remove Selected Debts
              </button>

              {/* Show Create Form */}
              <button
                className='bg-blue-500 text-white p-2 m-2 rounded-md'
                onClick={() => setCreateFormShowing(visible => !visible)}>
                {createFormShowing ? 'Cancel Creation' : 'Add Debt'}
              </button>

              {createFormShowing && (
                <CreateDebtFormModal
                  closeForm={() => setCreateFormShowing(false)}
                  addDebt={addDebt}
                />
              )}
            </div>
          </div>

          <div className='flex space-x-12 m-2 p-2 bg-white'>
            <div className='flex space-x-2'>
              <p className='font-medium text-md'>Total Rows: </p>
              <p className='text-md'>{debtList.length}</p>
            </div>

            <div className='flex space-x-2'>
              <p className='font-medium text-md'>Total Checked Rows: </p>
              <p className='text-md'>
                {debtList.filter(({ checked }) => checked).length}
              </p>
            </div>
          </div>

          <div className='flex justify-between m-2 p-2 bg-blue-800 text-white'>
            <p className='font-medium text-xl'>Total Debt</p>
            <p className='text-xl'>${getTotalDebt(debtList)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
