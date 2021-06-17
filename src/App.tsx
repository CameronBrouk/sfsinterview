import React from 'react'
import { DebtTable } from './components/DebtTable'

export const App = () => {
  return (
    <div className='w-screen bg-gray-200'>
      <header className='w-full bg-white'>
        <h1 className='p-4 mb-8 text-2xl font-medium'>
          SFS Take Home Assessment
        </h1>
      </header>
      <main className='flex justify-center'>
        <DebtTable />
      </main>
    </div>
  )
}

export default App
