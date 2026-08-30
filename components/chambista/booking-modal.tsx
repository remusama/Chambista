"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Provider } from "@/lib/chambista-data"
import { createBooking } from "@/lib/api/hooks"
import { apiClient } from "@/lib/api/client"

export function BookingModal({
  provider,
  onClose,
  onSuccess
}: {
  provider: Provider
  onClose: () => void
  onSuccess: () => void
}) {
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [direccion, setDireccion] = useState("")
  const [problema, setProblema] = useState("")
  const [loading, setLoading] = useState(false)

  const todayStr = new Date().toISOString().split("T")[0]

  // Fetch client details to prefill address
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const meRes = await apiClient.get("/auth/me")
        const user = meRes.data
        if (user) {
          const profileRes = await apiClient.get("/clientes/perfil")
          const profile = profileRes.data
          if (profile) {
            const fullAddress = [profile.zona, profile.distrito, profile.provincia].filter(Boolean).join(", ")
            setDireccion(fullAddress || user.distrito_principal || "")
          }
        }
      } catch (err) {
        console.error("Error prefilling client address:", err)
      }
    }
    fetchProfile()
  }, [])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (fecha === todayStr) {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const nowTimeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
      if (val < nowTimeStr) {
        alert("No puedes elegir una hora del pasado para hoy.")
        return
      }
    }
    setHora(val)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Pedir al backend el ID del usuario actual
      const meRes = await apiClient.get("/auth/me")
      const clienteId = meRes.data?.id
      const clienteNombre = meRes.data?.nombre || "Cliente"

      if (!clienteId) {
        alert("No se pudo identificar tu cuenta. Por favor, inicia sesión nuevamente.")
        setLoading(false)
        return
      }

      const payload = {
        cliente_id: clienteId,
        provider_id: parseInt(provider.id),
        servicio: (provider as any).categoryName || (provider as any).trade || "Servicio General",
        fecha: fecha,
        hora: hora,
        direccion: direccion,
        descripcion: problema
      }

      // 1. Create DB booking
      await createBooking(payload)

      // 2. Open chat conversation and post the designed [TARJETA_SOLICITUD] card
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("chambista_token") : null
        const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

        const convRes = await fetch(`${apiBase}/api/chat/conversaciones`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders },
          body: JSON.stringify({
            cliente_username: clienteNombre,
            prestador_id: provider.id,
            prestador_nombre: provider.name,
            prestador_categoria: (provider as any).categoryName || (provider as any).trade || "Servicio General",
          }),
        })

        if (convRes.ok) {
          const conv = await convRes.json()
          const cardMessage = `[TARJETA_SOLICITUD]
🛠️ Servicio: ${(provider as any).categoryName || (provider as any).trade || "Servicio General"}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}
📍 Dirección: ${direccion}
📝 Problema: ${problema}
💰 Estado: Nueva Solicitud (Pendiente de aprobación)`

          await fetch(`${apiBase}/api/chat/conversaciones/${conv.id}/mensajes`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders },
            body: JSON.stringify({
              texto: cardMessage,
              remitente: "cliente"
            })
          })
        }
      } catch (errChat) {
        console.error("Error creating chat card message:", errChat)
      }
      
      onSuccess()
    } catch (err) {
      alert("Hubo un error al procesar tu solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/60 p-4" onClick={onClose}>
      <div 
        className="w-full max-w-md rounded-3xl bg-background p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="mb-2 text-xl font-bold">Solicitar servicio</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Estás reservando a <span className="font-semibold text-foreground">{provider.name}</span>. Por favor completa los detalles del trabajo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Calendar className="size-4" /> Fecha</Label>
              <Input 
                type="date" 
                required 
                min={todayStr} 
                value={fecha} 
                onChange={e => {
                  setFecha(e.target.value)
                  setHora("") // Reset time validation
                }} 
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Clock className="size-4" /> Hora</Label>
              <Input 
                type="time" 
                required 
                value={hora} 
                onChange={handleTimeChange} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><MapPin className="size-4" /> Dirección</Label>
            <Input type="text" placeholder="Ej: Av. Principal 123, Miraflores" required value={direccion} onChange={e => setDireccion(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Info className="size-4" /> Descripción del problema</Label>
            <textarea 
              className="w-full rounded-xl border border-border bg-transparent p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              rows={3}
              placeholder="Describe brevemente lo que necesitas reparar o instalar..."
              required
              value={problema}
              onChange={e => setProblema(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Confirmar Reserva"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
