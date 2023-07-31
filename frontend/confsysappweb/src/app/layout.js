'use client'
import MenuMain from '@/components/MenuMain'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import ProtectedRoute from '../components/ProtectedRoute.js'
import { usePathname } from 'next/navigation'
import { parseCookies } from '@/components/utils/cookies.js'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'ConfSys',
//   description: 'Backup And View Files',
// }

const getAuthSession = async (token) => {
  const headers = {
    authorization: token,
  };
    
  const response =  await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/user/RouterProtect`, {headers})
  // Verify if the token is valid
  if (response.status === 200) {
      return true
    } else {
      return false
    }
} 













export default function RootLayout({ children }) {
  const pathname = usePathname()
  const { token } = parseCookies()

  if(getAuthSession(token)){
    return (
      <html lang="pt-BR">
        <body className={inter.className}>
          <div className="max-w-6xl m-auto">
            <MenuMain />
            <p>Current pathname: {pathname}</p>
              <ProtectedRoute>{children}</ProtectedRoute>
            <Footer/>
          </div>
        </body>
      </html>
    )
  }else {
    <html lang="pt-BR">
    <body className={inter.className}>
        <div className="max-w-6xl m-auto">
          <MenuMain />
          <p>Current pathname: {pathname}</p>
          { token ? 
          <ProtectedRoute>{children}</ProtectedRoute>
          :
          <> {children}</>
          }
          <Footer/>
        </div>
      </body>
    </html>
  }

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="max-w-6xl m-auto">
          <MenuMain />
          <p>Current pathname: {pathname}</p>
          { token ? 
          <ProtectedRoute>{children}</ProtectedRoute>
          :
          <> {children}</>
          }
          <Footer/>
        </div>
      </body>
    </html>
  )
}
