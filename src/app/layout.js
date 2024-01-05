import './globals.css'

export const metadata = {
  title: 'PB - Generador de imagenes',
  description: 'Generador de imagenes con IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
