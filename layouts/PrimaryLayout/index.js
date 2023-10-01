import React from 'react'
import Header from '@/components/common/header'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const PrimaryLayout = ({ children }) => {
  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  )
}

export default PrimaryLayout