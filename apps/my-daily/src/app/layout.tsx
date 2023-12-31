import type {Metadata} from 'next'
import ReactQueryWrapper from './react-query'
import '../../global.css'
export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <ReactQueryWrapper>
        <body>{children}</body>
      </ReactQueryWrapper>
    </html>
  )
}
