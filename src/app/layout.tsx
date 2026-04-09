import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "'Ohana Bocas | Restaurante frente al mar en Bocas del Toro",
  description: 'Restaurante y B&B frente al mar en Playa Paunch, Isla Colón. Fusión caribeña, wood-fired pizza, desayunos y eventos en vivo. Beach Vibes - Yummy Bites.',
  keywords: 'restaurante bocas del toro, restaurante isla colon, playa paunch, ohana bocas, comida caribeña, b&b bocas del toro',
  openGraph: {
    title: "'Ohana Bocas | Restaurante frente al mar en Bocas del Toro",
    description: 'Restaurante y B&B frente al mar en Playa Paunch, Isla Colón. Fusión caribeña, wood-fired pizza, desayunos y eventos en vivo.',
    locale: 'es_PA',
    siteName: "'Ohana Bocas",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
