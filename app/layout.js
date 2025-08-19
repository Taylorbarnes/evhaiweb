import './globals.css'

export const metadata = {
  title: 'EVH Corp',
  description: 'EVH Corporate Development Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
