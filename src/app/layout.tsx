import './globals.scss'

import { AuthContextProvider } from '@/components/lib/context/auth-context'
import { Inter } from 'next/font/google'
import { WindowContextProvider } from '@/components/lib/context/window-context'
import { Suspense } from 'react'
import Loading from './loading'
import type { Metadata } from 'next'
import { Loader } from '@/components/common/loader'

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
            <Loader />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </WindowContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
