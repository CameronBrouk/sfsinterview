import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Debt } from '../debt.types'

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

  return (
    <table>
      <th></th>
      <tbody></tbody>
    </table>
  )
}
