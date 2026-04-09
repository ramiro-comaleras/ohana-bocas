import type { Metadata } from 'next'
import { OhanaLanding } from '@/components/ohana/OhanaLanding'

export const metadata: Metadata = {
  title: "'Ohana Bocas | Restaurante frente al mar en Bocas del Toro",
  description:
    'Restaurante y B&B frente al mar en Isla Colón. Fusión caribeña, wood-fired pizza, desayunos y eventos en vivo. Open daily 8am–10pm.',
  keywords:
    'restaurante bocas del toro, restaurante isla colon, playa paunch, ohana bocas, comida caribeña, b&b bocas del toro',
}

export default function OhanaPage() {
  return <OhanaLanding />
}
