import './globals.scss'

import { AuthContextProvider } from '@/components/lib/context/auth-context'
import { Inter } from 'next/font/google'
import { WindowContextProvider } from '@/components/lib/context/window-context'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home / Vortex',
  description: 'Home for fighting game players',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <WindowContextProvider>
            {children}
          </WindowContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
