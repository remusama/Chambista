'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Home, MapPin, Star } from 'lucide-react'
import { ChambistaLogo } from '@/components/chambista-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { categories } from '@/lib/chambista-data'
import { PERU, getProvincias, getDistritos } from '@/lib/peru-locations'

type ClienteData = {
  nombre: string
  email: string
  password: string
  ciudad: string
  provincia: string
  distrito: string
  zona: string
  serviciosFrecuentes: string[]
}

const PASOS_CLIENTE = [
  { id: 'cuenta', titulo: 'Crea tu cuenta', icon: Home },
  { id: 'ubicacion', titulo: 'Tu ubicación', icon: MapPin },
  { id: 'preferencias', titulo: 'Tus preferencias', icon: Star },
]

export function OnboardingClienteWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [data, setData] = useState<ClienteData>({
    nombre: '',
    email: '',
    password: '',
    ciudad: '',
    provincia: '',
    distrito: '',
    zona: '',
    serviciosFrecuentes: [],
  })

  function update(patch: Partial<ClienteData>) {
    setData((prev) => {
      const updated = { ...prev, ...patch };
      if (patch.ciudad !== undefined) {
        updated.provincia = '';
        updated.distrito = '';
      }
      if (patch.provincia !== undefined) {
        updated.distrito = '';
      }
      return updated;
    })
  }

  function toggleServicio(id: string) {
    const list = data.serviciosFrecuentes
    update({
      serviciosFrecuentes: list.includes(id)
        ? list.filter((s) => s !== id)
        : [...list, id],
    })
  }

  const getPasswordStrength = () => {
    let score = 0;
    if (data.password.length >= 8) score++;
    if (/[A-Z]/.test(data.password)) score++;
    if (/[a-z]/.test(data.password)) score++;
    if (/[0-9]/.test(data.password)) score++;
    return score;
  };

  const isPasswordSecure = getPasswordStrength() === 4;

  function isValid(): boolean {
    switch (step) {
      case 0:
        return !!data.nombre && !!data.email && isPasswordSecure
      case 1:
        return !!data.ciudad && !!data.provincia && !!data.distrito
      default:
        return true
    }
  }

  async function handleFinish() {
    setLoading(true)
    try {
      // 1. Register
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          password: data.password,
          rol: 'cliente',
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        const msg = typeof d.detail === 'string' ? d.detail : (Array.isArray(d.detail) ? d.detail[0].msg : 'Error al registrar')
        alert(msg)
        setLoading(false)
        return
      }

      // 2. Auto-login
      const lr = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
      if (lr.ok) {
        const ld = await lr.json()
        localStorage.setItem('chambista_token', ld.access_token)
        localStorage.setItem('chambista_rol', ld.rol)
        localStorage.setItem('chambista_nombre', ld.nombre || data.nombre)
      }

      // 3. Save client profile
      const token = localStorage.getItem('chambista_token')
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/clientes/perfil`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ciudad: data.ciudad,
            provincia: data.provincia,
            distrito: data.distrito,
            zona: data.zona,
            servicios_frecuentes: data.serviciosFrecuentes.join(','),
          }),
        }).catch(() => { /* Non-critical */ })
      }

      router.push('/cliente')
    } catch {
      alert('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  async function next() {
    if (!isValid()) {
      alert('Completa los campos obligatorios para continuar.')
      return
    }

    if (emailError) {
      alert('Por favor, corrige los errores en los campos antes de continuar.')
      return
    }

    if (step === 0) {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/check-email?email=${encodeURIComponent(data.email)}`)
        const check = await res.json()
        if (check.exists) {
          setEmailError('Este correo electrónico ya está registrado.')
          alert('El correo electrónico ya está en uso. Por favor ingresa uno diferente.')
          setLoading(false)
          return
        }
      } catch (e) {
        console.error("Error checking email duplicity on step 0 next:", e)
      } finally {
        setLoading(false)
      }
    }

    if (step < PASOS_CLIENTE.length - 1) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleFinish()
    }
  }

  function back() {
    if (step === 0) { router.push('/'); return }
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const progress = ((step + 1) / PASOS_CLIENTE.length) * 100

  return (
    <div className="force-light min-h-dvh">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4">
          <ChambistaLogo />
          <span className="text-sm text-gray-500">Paso {step + 1} de {PASOS_CLIENTE.length}</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 pb-28">
        {/* Step pills */}
        <ol className="mb-8 flex gap-2">
          {PASOS_CLIENTE.map((p, i) => {
            const Icon = p.icon
            return (
              <li
                key={p.id}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  i === step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : i < step
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground'
                }`}
              >
                {i < step ? <Check className="size-3" /> : <Icon className="size-3" />}
                {p.titulo}
              </li>
            )
          })}
        </ol>

        <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">
          {PASOS_CLIENTE[step].titulo}
        </h1>

        {/* ─── Step 0: Account ─── */}
        {step === 0 && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Crea tu cuenta de cliente para encontrar profesionales de confianza.
            </p>
            <div className="space-y-2">
              <Label htmlFor="cl-nombre">Nombre completo *</Label>
              <Input
                id="cl-nombre"
                placeholder="Ej. María García"
                value={data.nombre}
                onChange={(e) => update({ nombre: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cl-email">Correo electrónico *</Label>
              <Input
                id="cl-email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={data.email}
                onChange={(e) => { update({ email: e.target.value }); setEmailError('') }}
                onBlur={async () => {
                  if (data.email && data.email.includes('@')) {
                    try {
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/check-email?email=${encodeURIComponent(data.email)}`)
                      const check = await res.json()
                      if (check.exists) {
                        setEmailError('Este correo electrónico ya está registrado.')
                      } else {
                        setEmailError('')
                      }
                    } catch (e) {}
                  }
                }}
              />
              {emailError && <p className="text-xs text-red-500 font-medium">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cl-pass">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="cl-pass"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Ej. Chambista2026!"
                  value={data.password}
                  onChange={(e) => update({ password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {/* Password Requirements and Strength Bar */}
              <div className="mt-3 space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-xs font-semibold text-slate-700">Fuerza de la contraseña:</p>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      getPasswordStrength() === 0 ? 'w-0' :
                      getPasswordStrength() === 1 ? 'w-1/4 bg-red-500' :
                      getPasswordStrength() === 2 ? 'w-2/4 bg-orange-500' :
                      getPasswordStrength() === 3 ? 'w-3/4 bg-yellow-500' :
                      'w-full bg-green-500'
                    }`}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  {getPasswordStrength() === 0 && 'Ingresa una contraseña'}
                  {getPasswordStrength() === 1 && 'Contraseña muy débil'}
                  {getPasswordStrength() === 2 && 'Contraseña débil'}
                  {getPasswordStrength() === 3 && 'Contraseña media'}
                  {getPasswordStrength() === 4 && 'Contraseña fuerte y segura'}
                </p>
                <ul className="text-xs space-y-1 text-slate-600 mt-2 font-medium">
                  <li className={`flex items-center gap-1.5 ${data.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="size-1.5 rounded-full bg-current" /> Mínimo 8 caracteres
                  </li>
                  <li className={`flex items-center gap-1.5 ${/[A-Z]/.test(data.password) ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="size-1.5 rounded-full bg-current" /> Al menos una letra mayúscula
                  </li>
                  <li className={`flex items-center gap-1.5 ${/[a-z]/.test(data.password) ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="size-1.5 rounded-full bg-current" /> Al menos una letra minúscula
                  </li>
                  <li className={`flex items-center gap-1.5 ${/[0-9]/.test(data.password) ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="size-1.5 rounded-full bg-current" /> Al menos un número
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ─── Step 1: Location ─── */}
        {step === 1 && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Así podremos mostrarte profesionales disponibles cerca de ti.
            </p>

            <div className="space-y-2">
              <Label htmlFor="cl-dept">Departamento *</Label>
              <select
                id="cl-dept"
                value={data.ciudad}
                onChange={(e) => update({ ciudad: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              >
                <option value="">Selecciona</option>
                {PERU.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cl-prov">Provincia *</Label>
              <select
                id="cl-prov"
                value={data.provincia}
                onChange={(e) => update({ provincia: e.target.value })}
                disabled={!data.ciudad}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                required
              >
                <option value="">Selecciona</option>
                {getProvincias(data.ciudad).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cl-dist">Distrito *</Label>
              <select
                id="cl-dist"
                value={data.distrito}
                onChange={(e) => update({ distrito: e.target.value })}
                disabled={!data.provincia}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                required
              >
                <option value="">Selecciona</option>
                {getDistritos(data.ciudad, data.provincia).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cl-zona">Urbanización / zona (opcional)</Label>
              <Input
                id="cl-zona"
                placeholder="Ej. Higuereta, Camacho..."
                value={data.zona}
                onChange={(e) => update({ zona: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* ─── Step 2: Preferences ─── */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ¿Qué tipo de servicios sueles necesitar? (Opcional, selecciona los que quieras)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                const active = data.serviciosFrecuentes.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleServicio(cat.id)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                      active
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: cat.color + '20', color: cat.color }}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-xs font-medium text-foreground">{cat.label}</span>
                    {active && <Check className="ml-auto size-3.5 text-primary" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-4 py-3">
          <Button variant="ghost" onClick={back} className="gap-2">
            <ArrowLeft className="size-4" />
            {step === 0 ? 'Salir' : 'Atrás'}
          </Button>
          <Button onClick={next} disabled={loading} className="gap-2">
            {loading
              ? 'Creando cuenta...'
              : step === PASOS_CLIENTE.length - 1
                ? '¡Empezar a buscar!'
                : 'Continuar'}
            {!loading && (step === PASOS_CLIENTE.length - 1
              ? <Check className="size-4" />
              : <ArrowRight className="size-4" />)}
          </Button>
        </div>
      </div>
    </div>
  )
}
