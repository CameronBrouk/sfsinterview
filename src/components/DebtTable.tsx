import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Debt } from '../debt.types'
import { DebtTableRow } from './DebtTableRow'

type DebtListItem = Debt & { checked: boolean }

export const DebtTable = () => {
  const [debtList, setDebtList] = useState<DebtListItem[]>([])

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

  const tableRowClasses =
    'px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'

  return (
    <div className='w-1/2'>
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
            <button className='bg-blue-500 text-white p-2 m-2 rounded-md'>
              Add Debt
            </button>

            <button
              className='bg-red-500 text-white p-2 m-2 rounded-md'
              onClick={removeAllCheckedDebts}>
              Remove Debts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
