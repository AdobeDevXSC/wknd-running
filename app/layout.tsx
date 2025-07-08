import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'wknd.running',
  description: 'Running the WKND',
  generator: 'v0.dev',
  other: {
    'urn:adobe:aue:system:aemconnection':'aem:https://author-p124903-e1367755.adobeaemcloud.com'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
