import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Modern e-commerce platform built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-slate-100"}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 