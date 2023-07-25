
import MenuMain from '@/components/MenuMain'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ConfSys',
  description: 'Backup And View Files',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
