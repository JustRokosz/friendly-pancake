import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import Template from './__template'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Larvis User Interface',
  description: 'Very nice UI, wow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Template>{children}</Template>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
