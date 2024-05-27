'use client'
import MenuMain from '@/components/MenuMain'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

import { usePathname } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })




export default function RootLayout({ children }) {


  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="max-w-6xl m-auto">
          <MenuMain />
            {children}
          <Footer/>
        </div>
      </body>
    </html>
  )
}
