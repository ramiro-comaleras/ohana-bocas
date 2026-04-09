'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// ─── Color tokens ───────────────────────────────────────────────────
const C = {
  ocean: '#0d2d4a',
  oceanMid: '#1a3a5c',
  teal: '#118a96',
  tealLight: '#e0f5f7',
  coral: '#f4715d',
  coralDark: '#e05a47',
  sand: '#fdf8f0',
  sandDark: '#f5ede0',
  brown: '#8b5a45',
  brownDark: '#6d4535',
  white: '#ffffff',
  textDark: '#2c1a12',
  textMid: '#5a4030',
  textLight: '#9a7a68',
}

// ─── Playfair Display helper ─────────────────────────────────────────
const serif = { fontFamily: "'Playfair Display', Georgia, serif" }
const sans = { fontFamily: "'Inter', system-ui, sans-serif" }

// ─── Menu Data ───────────────────────────────────────────────────────
type MenuItem = {
  name: string
  price: string
  desc: string
  badge?: 'chef' | 'popular'
  allergens?: string[]
}

const MENU: Record<string, MenuItem[]> = {
  breakfast: [
    {
      name: 'Breakfast Burrito',
      price: '$14',
      desc: 'Huevos · pollo crocante · tocino · papas · queso cheddar · mayonesa chipotle · costra de parmesano',
      badge: 'popular',
      allergens: ['🥛', '🌾'],
    },
    {
      name: 'Benny by the Beach',
      price: '$15',
      desc: 'Pan de coco casero · aguacate · arúgula · tocino · 2 huevos pochados · salsa holandesa · cebollas curtidas',
      badge: 'chef',
      allergens: ['🥛', '🥚', '🌾'],
    },
    {
      name: 'Pancakes de Pie de Limón',
      price: '$11',
      desc: 'Torre de pancakes con salsa casera de pie de limón y crumble de galleta',
      allergens: ['🌾', '🥚', '🥛'],
    },
    {
      name: 'Bowl de Açaí',
      price: '$10',
      desc: 'Mezcla cremosa de açaí · fruta fresca · granola casera · hojuelas de coco. Ligero y energizante',
      allergens: ['🌾'],
    },
    {
      name: 'Avo Toast',
      price: '$12',
      desc: 'Pan de masa madre · aguacate · semillas de sésamo · salsa chipotle · 2 huevos fritos',
      allergens: ['🌾', '🥚'],
    },
    {
      name: 'Ohana Breakfast',
      price: '$13',
      desc: '2 huevos a tu manera · pan de masa madre · mantequilla · mermelada de arándanos · fruta',
      allergens: ['🌾', '🥚', '🥛'],
    },
  ],
  pizza: [
    {
      name: "Ohana Mía",
      price: '$17',
      desc: 'Salsa de tomate · mozzarella · prosciutto · queso feta · parmesano · reducción de balsámico',
      badge: 'chef',
      allergens: ['🌾', '🥛'],
    },
    {
      name: 'Burratísima',
      price: '$19',
      desc: 'Salsa de tomate · pesto · queso burrata · parmesano · reducción de balsámico · prosciutto · tomates cherry',
      badge: 'popular',
      allergens: ['🌾', '🥛'],
    },
    {
      name: 'Margherita',
      price: '$13',
      desc: 'Salsa de tomate · doble mozzarella',
      allergens: ['🌾', '🥛'],
    },
    {
      name: 'Pepperoni',
      price: '$15',
      desc: 'Salsa de tomate · mozzarella · pepperoni',
      allergens: ['🌾', '🥛'],
    },
    {
      name: 'Hawaiian',
      price: '$16',
      desc: 'Salsa de tomate · mozzarella · jamón curado · piña caramelizada',
      allergens: ['🌾', '🥛'],
    },
    {
      name: 'VeggieSweet',
      price: '$14',
      desc: 'Salsa de tomate · mozzarella · tomates cherry caramelizados · cebollas caramelizadas',
      allergens: ['🌾', '🥛'],
    },
  ],
  fusion: [
    {
      name: 'Salmón con Maracuyá',
      price: '$25',
      desc: 'Salmón a la parrilla · salsa cremosa de maracuyá · arroz con coco · microgreens',
      badge: 'chef',
      allergens: ['🐟', '🥛'],
    },
    {
      name: 'Burrito Tropical',
      price: '$15',
      desc: 'Pollo al curry con coco · verduras a la parrilla · arroz · plátano dulce · salsa picante de mango',
      badge: 'popular',
      allergens: ['🌾'],
    },
    {
      name: 'Pulpo a la Parrilla',
      price: '$32',
      desc: '250g de pulpo tierno · mantequilla de ajo · salsa de pimientos rojos ahumados · puré de patatas',
      allergens: ['🦑', '🥛'],
    },
    {
      name: 'Caribeño Steak',
      price: '$28',
      desc: '350g de Ribeye marinado · puré de papas · tomates cherry a la parrilla · microgreens',
      allergens: ['🥛'],
    },
    {
      name: 'Mar y Fuego',
      price: '$24',
      desc: 'Tuna fresca sellada con costra de sésamo · salsa de soya · arroz con coco · cebollas crocantes',
      allergens: ['🐟'],
    },
    {
      name: 'Camarón que se Duerme',
      price: '$18',
      desc: 'Camarones a la plancha salteados en mantequilla y ajo · puré de papas · vegetales salteados',
      allergens: ['🦐', '🥛'],
    },
  ],
}

// ─── Events Data ─────────────────────────────────────────────────────
const EVENTS = [
  {
    day: 'LUN',
    dayFull: 'Lunes',
    title: 'Salsa Social',
    subtitle: 'con Los Que La Forman',
    time: '8:00 PM',
    emoji: '💃',
    highlight: true,
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80&fit=crop&auto=format',
  },
  {
    day: 'MIÉ',
    dayFull: 'Miércoles',
    title: 'Acoustic Night',
    subtitle: 'Sounds of the Caribbean',
    time: '7:00 PM',
    emoji: '🎸',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&fit=crop&auto=format',
  },
  {
    day: 'JUE',
    dayFull: 'Jueves',
    title: 'Trivia Night',
    subtitle: 'Teams of up to 4',
    time: '7:30 PM',
    emoji: '🧠',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80&fit=crop&auto=format',
  },
  {
    day: 'VIE',
    dayFull: 'Viernes',
    title: 'Reggae Sunsets',
    subtitle: 'Sunset Vibes + Rum',
    time: '6:00 PM',
    emoji: '🌅',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop&auto=format',
  },
  {
    day: 'SÁB',
    dayFull: 'Sábado',
    title: 'DJ Set',
    subtitle: 'Happy Hour 5–7pm',
    time: '5:00 PM',
    emoji: '🎧',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&fit=crop&auto=format',
  },
  {
    day: 'DOM',
    dayFull: 'Domingo',
    title: 'Brunch & Chill',
    subtitle: 'Live Background Music',
    time: '10:00 AM',
    emoji: '🥂',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop&auto=format',
  },
]

// ─── WhatsApp config ─────────────────────────────────────────────────
const WA_NUMBER = '50700000000' // ← reemplaza con el número real
const WA_MSG = encodeURIComponent("Hola! Vi su página y quiero hacer una reserva en 'Ohana Bocas 🌊")
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`

// ─── Allergen legend ─────────────────────────────────────────────────
const ALLERGEN_KEY: Record<string, string> = {
  '🌾': 'Gluten',
  '🥛': 'Lácteos',
  '🥚': 'Huevo',
  '🐟': 'Pescado',
  '🦐': 'Mariscos',
  '🦑': 'Mariscos',
  '🥜': 'Frutos secos',
}

// ════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════
export function OhanaLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'breakfast' | 'pizza' | 'fusion'>('breakfast')
  const [scrolled, setScrolled] = useState(false)
  const [showWaTooltip, setShowWaTooltip] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ ...sans, backgroundColor: C.sand, color: C.textDark, overflowX: 'hidden' }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s',
          backgroundColor: scrolled ? 'rgba(13,45,74,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 20px',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
            aria-label="Ir al inicio"
          >
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              <Image
                src="/ohana.webp"
                alt="'Ohana Bocas logo"
                fill
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = target.nextSibling as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              <div
                style={{
                  display: 'none',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: C.brown,
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...serif,
                  color: C.white,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                &#x2019;O
              </div>
            </div>
            <span
              style={{
                ...serif,
                color: C.white,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.05em',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              &#x2019;Ohana
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ gap: 8, alignItems: 'center' }}>
            {[
              { label: 'Menú', id: 'menu' },
              { label: 'Eventos', id: 'events' },
              { label: 'Hospedarse', id: 'stay' },
              { label: 'Reseñas', id: 'reviews' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: C.white,
                  fontSize: 15,
                  fontWeight: 500,
                  padding: '8px 14px',
                  borderRadius: 8,
                  transition: 'background 0.2s',
                  opacity: 0.9,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {label}
              </button>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: C.coral,
                color: C.white,
                padding: '10px 20px',
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
                marginLeft: 8,
                transition: 'background 0.2s, transform 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = C.coralDark
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = C.coral
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Reserva Directa
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: C.white,
              padding: 8,
            }}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: 'rgba(13,45,74,0.98)',
              backdropFilter: 'blur(12px)',
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {[
              { label: '🍽️ Menú', id: 'menu' },
              { label: '🎶 Eventos', id: 'events' },
              { label: '🏠 Hospedarse', id: 'stay' },
              { label: '⭐ Reseñas', id: 'reviews' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: C.white,
                  fontSize: 16,
                  fontWeight: 500,
                  padding: '14px 16px',
                  borderRadius: 10,
                  textAlign: 'left',
                }}
              >
                {label}
              </button>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: C.coral,
                color: C.white,
                padding: '14px 20px',
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              📲 Reserva Directa
            </a>
          </div>
        )}
      </header>

      {/* ── HERO MOBILE — video only ────────────────────────────────── */}
      <section
        id="hero"
        className="hero-mobile-video"
        style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source
            src="/Ohana%20is%20that%20place%20you%20were%20looking%20for%20while%20booking%20your%20trip%20to%20Bocas%20-)From%20delicious%20break.mp4"
            type="video/mp4"
          />
        </video>
        {/* Hours badge on mobile hero */}
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(13,45,74,0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 50,
            padding: '10px 24px',
            color: 'rgba(255,255,255,0.95)',
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          🕗 Open daily · 8:00 am – 10:00 pm
        </div>

        {/* Floating WhatsApp on mobile hero */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            bottom: 32,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#25d366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
            textDecoration: 'none',
          }}
          aria-label="Contactar por WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </section>

      {/* ── HERO DESKTOP — gradient + text ─────────────────────────── */}
      <section
        id="hero-desktop"
        className="hero-desktop-content"
        style={{
          minHeight: '100vh',
          background: `linear-gradient(to bottom, rgba(10,30,48,0.55) 0%, rgba(10,40,55,0.45) 60%, rgba(13,45,74,0.72) 100%), url('/ohana%20fondo.jpg') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '100px 20px 60px',
          textAlign: 'center',
        }}
      >
        {/* Decorative wave pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '200%',
                height: 80,
                bottom: i * 90 - 100,
                left: '-50%',
                borderRadius: '50%',
                border: '2px solid white',
                transform: `scaleX(${0.6 + i * 0.1})`,
              }}
            />
          ))}
        </div>

        {/* Coral splash top-right */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: C.coral,
            opacity: 0.15,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <div style={{ marginBottom: 32, position: 'relative', width: 120, height: 120 }}>
          <Image
            src="/ohana.webp"
            alt="'Ohana Bocas"
            fill
            style={{ objectFit: 'cover', borderRadius: '50%', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))' }}
            priority
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.style.display = 'none'
              const fallback = el.nextSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <div
            style={{
              display: 'none',
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: C.brown,
              alignItems: 'center',
              justifyContent: 'center',
              ...serif,
              color: C.white,
              fontSize: 18,
              fontWeight: 700,
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 26 }}>&#x2019;O</span>
            <span style={{ fontSize: 10, letterSpacing: 3, opacity: 0.8 }}>HANA</span>
          </div>
        </div>

        {/* Eyebrow */}
        <p style={{ color: C.teal, fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
          Isla Colón · Bocas del Toro 🇵🇦
        </p>

        {/* Main headline */}
        <h1
          style={{
            ...serif,
            color: C.white,
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 24,
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          Breathe.<br />Surf.<br />Eat.
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            lineHeight: 1.6,
            maxWidth: 560,
            marginBottom: 40,
          }}
        >
          Tu santuario frente al mar en Isla Colón. Fusión caribeña, ritmos en vivo y la mejor vista al surf de Bocas del Toro.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => scrollTo('menu')}
            style={{
              backgroundColor: C.coral,
              color: C.white,
              padding: '16px 32px',
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(244,113,93,0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(244,113,93,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(244,113,93,0.5)'
            }}
          >
            🍽️ Ver Menú de Hoy
          </button>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: 'transparent',
              color: C.white,
              padding: '16px 32px',
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 16,
              border: '2px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
            }}
          >
            📅 Reservar Mesa
          </a>
        </div>

        {/* Hours badge */}
        <div
          style={{
            marginTop: 48,
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 50,
            padding: '10px 24px',
            color: 'rgba(255,255,255,0.9)',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          🕗 Open daily · 8:00 am – 10:00 pm
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('menu')}
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            animation: 'bounce 2s infinite',
          }}
          aria-label="Scroll hacia abajo"
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </section>
      {/* End hero desktop */}

      {/* ── SLOGAN ─────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: C.sand,
          padding: '56px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, maxWidth: 600, margin: '0 auto' }}>
          <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(139,90,69,0.2)' }} />
          <p
            style={{
              ...serif,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: C.brown,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            The place to be
          </p>
          <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(139,90,69,0.2)' }} />
        </div>
      </div>

      {/* ── DIGITAL MENU ───────────────────────────────────────────── */}
      <section id="menu" style={{ padding: 'clamp(60px, 8vw, 100px) 20px', backgroundColor: C.sand }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ color: C.coral, fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>
              Menú Digital
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: C.ocean, marginBottom: 16 }}>
              Sabores del Caribe
            </h2>
            <p style={{ color: C.textMid, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Todo preparado con ingredientes frescos del mar y la tierra.
            </p>
          </div>

          {/* Tab buttons */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 40,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {([
              { id: 'breakfast', label: '🌴 Breakfast & Brunch' },
              { id: 'pizza', label: '🍕 Wood-Fired Pizzas' },
              { id: 'fusion', label: '🌊 Caribbean Fusion' },
            ] as { id: 'breakfast' | 'pizza' | 'fusion'; label: string }[]).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 15,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: activeTab === id ? C.ocean : C.white,
                  color: activeTab === id ? C.white : C.textMid,
                  boxShadow: activeTab === id
                    ? `0 4px 20px rgba(13,45,74,0.35)`
                    : '0 2px 8px rgba(0,0,0,0.08)',
                  transform: activeTab === id ? 'translateY(-1px)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {MENU[activeTab].map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </div>

          {/* Allergen key */}
          <div
            style={{
              marginTop: 32,
              padding: '16px 24px',
              backgroundColor: C.white,
              borderRadius: 16,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Alérgenos:
            </span>
            {Object.entries(ALLERGEN_KEY).map(([emoji, label]) => (
              <span key={emoji} style={{ fontSize: 13, color: C.textMid }}>
                {emoji} {label}
              </span>
            ))}
          </div>

          {/* Full menu CTA */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: C.textLight, marginBottom: 16, fontSize: 15 }}>
              ¿Quieres ver el menú completo con todas las categorías?
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: C.teal,
                color: C.white,
                padding: '14px 32px',
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              📲 Pedir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── EVENTS ─────────────────────────────────────────────────── */}
      <section
        id="events"
        style={{
          padding: 'clamp(60px, 8vw, 100px) 20px',
          background: `linear-gradient(160deg, ${C.ocean} 0%, #0a4a5c 100%)`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: C.coral, fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>
              Cada semana
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: C.white, marginBottom: 16 }}>
              El lugar donde pasar la noche
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Música en vivo, DJ sets y la mejor salsa social de Bocas. Hay algo especial cada noche de la semana.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {EVENTS.map((event) => (
              <EventCard key={event.day} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ATMOSPHERE & B&B ───────────────────────────────────────── */}
      <section id="stay" style={{ padding: 'clamp(60px, 8vw, 100px) 20px', backgroundColor: C.sandDark }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: C.coral, fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>
              Vibe & Stay
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: C.ocean, marginBottom: 16 }}>
              Más que un restaurante
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 32,
            }}
          >
            {/* Restaurant vibe */}
            <div
              style={{
                backgroundColor: C.white,
                borderRadius: 24,
                padding: 40,
                boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
                borderTop: `4px solid ${C.teal}`,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 20 }}>🏄</div>
              <h3 style={{ ...serif, fontSize: 26, color: C.ocean, marginBottom: 16 }}>
                Surf-Chic Vibes
              </h3>
              <p style={{ color: C.textMid, lineHeight: 1.8, marginBottom: 20 }}>
                Ubicados frente a la mejor ola de Isla Colón, somos el punto de encuentro de surfistas, nómadas digitales y foodies. Un ambiente relajado donde todos son familia.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '🌳', text: 'Kids Park — los peques también son bienvenidos' },
                  { icon: '🌊', text: 'Vista directa al surf break de Isla Colón' },
                  { icon: '🍹', text: 'Happy Hour diario y cócteles artesanales' },
                  { icon: '💻', text: 'WiFi de alta velocidad para nómadas digitales' },
                ].map(({ icon, text }) => (
                  <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                    <span style={{ color: C.textMid, fontSize: 15, lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B&B */}
            <div
              style={{
                backgroundColor: C.ocean,
                borderRadius: 24,
                padding: 40,
                boxShadow: '0 4px 30px rgba(13,45,74,0.3)',
                borderTop: `4px solid ${C.coral}`,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 20 }}>🌅</div>
              <h3 style={{ ...serif, fontSize: 26, color: C.white, marginBottom: 16 }}>
                B&B con Vista al Mar
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 24 }}>
                En el segundo piso, habitaciones diseñadas para que te despiertes con la brisa del Caribe y el sonido de las olas. Desayuno incluido, surf a pasos.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {[
                  { icon: '🪟', text: 'Vista panorámica al océano desde cada habitación' },
                  { icon: '🏠', text: 'Ambiente íntimo y personalizado' },
                  { icon: '🌺', text: "Desayuno \u2019Ohana incluido cada ma\u00f1ana" },
                  { icon: '🏄', text: 'Acceso directo a la playa' },
                ].map(({ icon, text }) => (
                  <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: C.coral,
                  color: C.white,
                  padding: '14px 28px',
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.coralDark}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = C.coral}
              >
                📲 Consultar disponibilidad
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────────── */}
      <section id="reviews" style={{ padding: 'clamp(60px, 8vw, 100px) 20px', backgroundColor: C.sand }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ color: C.coral, fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>
              Lo que dicen nuestros clientes
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: C.ocean, marginBottom: 24 }}>
              La familia crece cada día
            </h2>

            {/* Google Stars Badge */}
            <a
              href="https://www.google.com/search?q=ohana+bocas"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: C.white,
                border: `2px solid ${C.teal}`,
                borderRadius: 50,
                padding: '12px 28px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ fontSize: 24 }}>⭐</span>
              <span style={{ ...serif, fontSize: 22, fontWeight: 700, color: C.ocean }}>4.8</span>
              <span style={{ color: C.textMid, fontSize: 14 }}>en Google Reviews</span>
              <svg width="16" height="16" fill="none" stroke={C.teal} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {/* Testimonials */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                name: 'Sarah M.',
                origin: '🇺🇸 California',
                text: "Best breakfast in Bocas, no question. The Burrito Tropical changed my life. We came back 4 days in a row. The view while surfing passes is unmatched.",
                stars: 5,
              },
              {
                name: 'Carlos R.',
                origin: '🇨🇴 Medellín',
                text: "El salmón con maracuyá es una obra de arte. La vista, la música, el ambiente... 'Ohana es ese lugar especial que te hace volver a Bocas.",
                stars: 5,
              },
              {
                name: 'Emma L.',
                origin: '🇫🇷 París',
                text: "We stayed in the B&B and it was magical. Woke up to ocean sounds, had açaí bowls for breakfast, surfed all day. This place is a dream.",
                stars: 5,
              },
            ].map((review) => (
              <div
                key={review.name}
                style={{
                  backgroundColor: C.white,
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: `1px solid rgba(17,138,150,0.1)`,
                }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(review.stars)].map((_, i) => (
                    <span key={i} style={{ fontSize: 18, color: '#f5a623' }}>★</span>
                  ))}
                </div>
                <p style={{ color: C.textMid, lineHeight: 1.7, marginBottom: 20, fontSize: 15, fontStyle: 'italic' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: C.teal,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: C.white,
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: C.textDark, fontSize: 14 }}>{review.name}</p>
                    <p style={{ color: C.textLight, fontSize: 13 }}>{review.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer
        style={{
          background: `linear-gradient(160deg, ${C.ocean} 0%, #071e32 100%)`,
          padding: 'clamp(48px, 6vw, 80px) 20px 32px',
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 40,
              marginBottom: 48,
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ position: 'relative', width: 56, height: 56 }}>
                  <Image
                    src="/ohana.webp"
                    alt="'Ohana Bocas"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                    }}
                  />
                </div>
                <div>
                  <p style={{ ...serif, color: C.white, fontSize: 22, fontWeight: 700 }}>&#x2019;Ohana Bocas</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>
                    BEACH VIBES · YUMMY BITES
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
                Tu santuario caribeño frente al mar. Comida con alma, música con ritmo, hospitality con corazón.
              </p>
            </div>

            {/* Info */}
            <div>
              <h4 style={{ color: C.white, fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Encuéntranos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>📍</span>
                  <span>Isla Colón<br />Bocas del Toro, Panamá 🇵🇦</span>
                </p>
                <p style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🕗</span>
                  Open daily · 8:00 am – 10:00 pm
                </p>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#25d366',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 18 }}>📱</span>
                  WhatsApp · Reservas &amp; consultas
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 style={{ color: C.white, fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Síguenos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a
                  href="https://www.instagram.com/ohanabocas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = C.white}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  <span style={{ fontSize: 22 }}>📸</span>
                  <span style={{ fontSize: 15 }}>@ohanabocas</span>
                </a>
                <a
                  href="https://www.tiktok.com/@ohana.bocas"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = C.white}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  <span style={{ fontSize: 22 }}>🎵</span>
                  <span style={{ fontSize: 15 }}>@ohana.bocas</span>
                </a>
                <a
                  href="https://www.google.com/search?q=ohana+bocas"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = C.white}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  <span style={{ fontSize: 22 }}>⭐</span>
                  <span style={{ fontSize: 15 }}>Reseñas en Google</span>
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h4 style={{ color: C.white, fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Cómo llegar</h4>
              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15646.123456789!2d-82.25!3d9.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73a1234567890%3A0xabcdef1234567890!2sPlaya+Paunch%2C+Bocas+del+Toro!5e0!3m2!1ses!2spa!4v1234567890"
                  width="100%"
                  height="180"
                  style={{ border: 0, display: 'block', filter: 'saturate(0.7) brightness(0.85)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Ohana Bocas - Isla Colón"
                />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              © 2025 &#x2019;Ohana Bocas · Isla Colón · Bocas del Toro 🇵🇦
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://www.instagram.com/ohanabocas/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Instagram</a>
              <a href="https://www.tiktok.com/@ohana.bocas" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ───────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        {/* Tooltip */}
        {showWaTooltip && (
          <div
            style={{
              backgroundColor: C.ocean,
              color: C.white,
              padding: '10px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            ¿Tienes Hambre? 🌊
          </div>
        )}

        {/* Button */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowWaTooltip(true)}
          onMouseLeave={() => setShowWaTooltip(false)}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#25d366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
            textDecoration: 'none',
            transition: 'all 0.2s',
            animation: 'wa-pulse 2.5s infinite',
          }}
          onFocus={() => setShowWaTooltip(true)}
          onBlur={() => setShowWaTooltip(false)}
          aria-label="Contactar por WhatsApp"
        >
          {/* WhatsApp SVG icon */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>

      {/* ── GLOBAL STYLES ──────────────────────────────────────────── */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes salsa-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Hero: mobile = video only, desktop = gradient + text */
        .hero-mobile-video  { display: none; }
        .hero-desktop-content { display: flex; }
        @media (max-width: 767px) {
          .hero-mobile-video  { display: block; }
          .hero-desktop-content { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div
      style={{
        backgroundColor: C.white,
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: `1px solid rgba(17,138,150,0.08)`,
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
      }}
    >
      {/* Badge */}
      {item.badge && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: item.badge === 'chef' ? C.coral : C.teal,
            color: C.white,
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 50,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {item.badge === 'chef' ? '👨‍🍳 Chef\'s Pick' : '🔥 Popular'}
        </div>
      )}

      {/* Name + Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, paddingRight: item.badge ? 100 : 0 }}>
        <h3 style={{ ...serif, fontSize: 17, color: C.brown, fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h3>
        <span style={{ ...serif, fontSize: 20, fontWeight: 700, color: C.coral, flexShrink: 0, marginLeft: 12 }}>{item.price}</span>
      </div>

      {/* Description */}
      <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{item.desc}</p>

      {/* Allergens */}
      {item.allergens && item.allergens.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.allergens.map((a) => (
            <span
              key={a}
              title={ALLERGEN_KEY[a] ?? a}
              style={{
                fontSize: 16,
                backgroundColor: C.sandDark,
                borderRadius: 8,
                padding: '2px 8px',
              }}
            >
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: typeof EVENTS[0] }) {
  return (
    <div
      style={{
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 220,
        cursor: 'default',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: event.highlight
          ? '0 8px 40px rgba(244,113,93,0.45)'
          : '0 4px 24px rgba(0,0,0,0.35)',
        animation: event.highlight ? 'salsa-pulse 3s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)'
        e.currentTarget.style.boxShadow = event.highlight
          ? '0 16px 50px rgba(244,113,93,0.55)'
          : '0 12px 40px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = event.highlight
          ? '0 8px 40px rgba(244,113,93,0.45)'
          : '0 4px 24px rgba(0,0,0,0.35)'
      }}
    >
      {/* Blurred background image */}
      <div
        style={{
          position: 'absolute',
          inset: -8,
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px) brightness(0.45) saturate(1.2)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Color tint overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: event.highlight
            ? 'linear-gradient(160deg, rgba(244,113,93,0.55) 0%, rgba(13,45,74,0.5) 100%)'
            : 'linear-gradient(160deg, rgba(13,45,74,0.55) 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: 28 }}>

        {/* Top row: day pill + highlight badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: event.highlight ? C.coral : 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              color: C.white,
              fontSize: 11,
              fontWeight: 800,
              padding: '5px 14px',
              borderRadius: 50,
              letterSpacing: '0.12em',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {event.day}
          </div>
          {event.highlight && (
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
                color: C.white,
                fontSize: 10,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 50,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              ⚡ Destacado
            </div>
          )}
        </div>

        <div style={{ fontSize: 34, marginBottom: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          {event.emoji}
        </div>

        <h3
          style={{
            ...serif,
            fontSize: 22,
            color: C.white,
            fontWeight: 700,
            marginBottom: 4,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {event.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 14, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {event.subtitle}
        </p>
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: C.white,
            fontWeight: 700,
            fontSize: 14,
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
            padding: '5px 12px',
            borderRadius: 50,
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          🕐 {event.time}
        </p>
      </div>
    </div>
  )
}
