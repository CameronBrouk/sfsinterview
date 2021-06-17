import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Debt } from '../debt.types'
import { DebtTableRow } from './DebtTableRow'

export const DebtTable = () => {
  const [debtList, setDebtList] = useState<Debt[]>([])

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json',
      )
      .then(({ data }) => {
        setDebtList(data)
      })
  }, [])

  const tableRowClasses =
    'px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'

  return (
    <div className='w-1/2'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
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
                  {debtList &&
                    debtList.map(debt => <DebtTableRow debtInfo={debt} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
