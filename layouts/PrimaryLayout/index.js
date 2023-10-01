import React from 'react'
import Header from '@/components/common/header'
import { Inter } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'], variable: "--font-sans", })

const PrimaryLayout = ({ children }) => {
  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  )
}

export default PrimaryLayout