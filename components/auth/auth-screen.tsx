'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, ShieldCheck, Star, Users, Zap, Home, Wrench, Building2 } from 'lucide-react'
import { ChambistaLogo } from '@/components/chambista-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const HERO_SLIDES = [
  {
    src: '/providers/electricista.png',
    label: 'Electricistas',
    caption: 'Instalaciones y reparaciones eléctricas seguras',
  },
  {
    src: '/providers/plomero.png',
    label: 'Plomeros',
    caption: 'Fugas, instalaciones y mantenimiento',
  },
  {
    src: '/providers/carpintero.png',
    label: 'Carpinteros',
    caption: 'Muebles a medida y reparaciones de madera',
  },
  {
    src: '/providers/pintor.png',
    label: 'Pintores',
    caption: 'Acabados perfectos para tu espacio',
  },
  {
    src: '/providers/tecnico.png',
    label: 'Técnicos',
    caption: 'Reparación de equipos y electrodomésticos',
  },
  {
    src: '/providers/limpieza.png',
    label: 'Limpieza',
    caption: 'Hogares y oficinas limpias y relucientes',
  },
]

export function AuthScreen() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loginError, setLoginError] = useState('')
  const [emailHint, setEmailHint] = useState('')
  const [slideIndex, setSlideIndex] = useState(0)
  const [fading, setFading] = useState(false)

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setSlideIndex(i => (i + 1) % HERO_SLIDES.length)
        setFading(false)
      }, 600)
    }, 11000)
    return () => clearInterval(timer)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        const errMsg = typeof data.detail === 'string' ? data.detail : (Array.isArray(data.detail) ? data.detail[0].msg : 'Credenciales incorrectas')
        throw new Error(errMsg)
      }
      const data = await res.json()
      localStorage.setItem('chambista_token', data.access_token)
      localStorage.setItem('chambista_rol', data.rol)
      localStorage.setItem('chambista_nombre', data.nombre || email.split('@')[0])

      if (data.rol === 'cliente') {
        router.push('/cliente')
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setLoginError(err.message || 'Error al iniciar sesión')
    }
  }

  const accountTypes = [
    {
      id: 'cliente',
      title: 'Soy cliente',
      desc: 'Busco profesionales para mi hogar',
      icon: <Home className="size-6 text-white" />,
      href: '/onboarding-cliente',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'independiente',
      title: 'Soy independiente',
      desc: 'Ofrezco mis servicios como persona natural',
      icon: <Wrench className="size-6 text-white" />,
      href: '/onboarding',
      color: 'from-orange-500 to-amber-600',
    },
    {
      id: 'empresa',
      title: 'Tengo una empresa',
      desc: 'Quiero captar más clientes para mi negocio',
      icon: <Building2 className="size-6 text-white" />,
      href: '/onboarding',
      color: 'from-purple-500 to-violet-600',
    },
  ]

  const currentSlide = HERO_SLIDES[slideIndex]

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <ChambistaLogo />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('login')}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${tab === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => setTab('register')}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${tab === 'register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Crear cuenta
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* ── Left Panel: Image Carousel ── */}
        <section className="relative hidden lg:flex lg:w-1/2 overflow-hidden">
          {/* Slide image */}
          <img
            key={slideIndex}
            src={currentSlide.src}
            alt={currentSlide.label}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.6s ease-in-out',
            }}
          />

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 to-transparent" />

          {/* Top-left: Logo + App name */}
          <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
            <img
              src="/5447b5d0-2e72-43c0-bb40-a545a174aec4-removebg-preview.png"
              alt="Chambista logo"
              className="size-12 object-contain drop-shadow-lg"
            />
            <div>
              <p className="text-xl font-extrabold text-white leading-none tracking-tight">Chambista</p>
              <p className="text-xs text-white/60 font-medium mt-0.5">Profesionales de confianza</p>
            </div>
          </div>

          {/* Bottom content */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 p-8"
            style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
          >
            {/* Category pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-secondary animate-pulse" />
              {currentSlide.label} · Lima, Perú
            </div>

            <h2 className="text-3xl font-bold text-white leading-tight mb-1">
              {currentSlide.caption}
            </h2>
            <p className="text-blue-200/70 text-sm leading-relaxed mb-5">
              Conecta con quien sí sabe hacerlo. Sin vueltas, sin perder tiempo.
            </p>

            {/* Social proof avatars */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex -space-x-2">
                {['ML', 'CM', 'AT', '+'].map((init, i) => (
                  <div key={i} className={`flex size-8 items-center justify-center rounded-full border-2 border-slate-950 text-[11px] font-bold text-white ${i === 3 ? 'bg-primary' : 'bg-gradient-to-br from-blue-400 to-blue-600'}`}>
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-secondary text-xs">{'★'.repeat(5)}</div>
                <p className="text-white/60 text-[11px]">+2,000 personas confían en Chambista</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { label: '500+', sub: 'Profesionales verificados' },
                { label: '30min', sub: 'Respuesta promedio' },
                { label: '4.8★', sub: 'Calificación general' },
              ].map(s => (
                <div key={s.sub} className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
                  <p className="text-white font-bold text-base leading-none">{s.label}</p>
                  <p className="text-white/55 text-[10px] mt-0.5 leading-tight">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Slide dots */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setFading(true); setTimeout(() => { setSlideIndex(i); setFading(false) }, 400) }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`}
                  aria-label={`Ir a slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Right Panel - Forms */}
        <section className="flex w-full flex-1 items-center justify-center p-6 lg:w-1/2 bg-white">
          <div className="w-full max-w-md">
            {tab === 'login' ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Bienvenido de nuevo</h2>
                  <p className="mt-1 text-muted-foreground">Ingresa a tu cuenta para continuar.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Correo electrónico</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setLoginError(''); setEmailHint('') }}
                      onBlur={async () => {
                        if (email && email.includes('@')) {
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/check-email?email=${encodeURIComponent(email)}`)
                            const data = await res.json()
                            if (!data.exists) setEmailHint('Este correo no está registrado. ¿Quieres crear una cuenta?')
                            else setEmailHint('')
                          } catch (e) { }
                        }
                      }}
                      placeholder="tucorreo@ejemplo.com"
                      required
                      className="h-12 rounded-xl border-border bg-muted/30 focus:bg-white"
                    />
                    {emailHint && <p className="text-xs text-amber-500">{emailHint}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Tu contraseña"
                        required
                        className="h-12 rounded-xl border-border bg-muted/30 focus:bg-white"
                      />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                  {loginError && (
                    <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">{loginError}</p>
                  )}
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Iniciar sesión <ArrowRight className="size-4" />
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  ¿No tienes cuenta?{' '}
                  <button onClick={() => setTab('register')} className="font-semibold text-primary hover:underline">
                    Crear cuenta gratis
                  </button>
                </p>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground">¿Cómo quieres usar Chambista?</h2>
                  <p className="mt-1 text-muted-foreground">Elige tu tipo de cuenta para comenzar.</p>
                </div>

                <div className="flex flex-col gap-3">
                  {accountTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => router.push(type.href)}
                      className="group flex items-center gap-4 rounded-2xl border-2 border-border bg-white p-4 text-left transition-all hover:border-primary hover:shadow-md hover:shadow-primary/10 active:scale-[0.98]"
                    >
                      <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} shadow-sm`}>
                        {type.icon}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{type.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                  <button onClick={() => setTab('login')} className="font-semibold text-primary hover:underline">
                    Iniciar sesión
                  </button>
                </p>
              </>
            )}
          </div>
        </section>
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-border bg-muted/30 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6 text-xs text-muted-foreground">
          {[
            { icon: ShieldCheck, text: 'Profesionales verificados' },
            { icon: Zap, text: 'Respuestas rápidas' },
            { icon: Star, text: 'Calificaciones reales' },
            { icon: Users, text: 'Hecho para tu comunidad' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="size-3.5 text-primary" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}


