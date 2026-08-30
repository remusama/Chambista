"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, CalendarDays, Plane, Ban, Plus, Coffee, Trash2, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProviderDashboard } from "@/lib/api/hooks"

type SlotEstado = 'libre' | 'ocupado' | 'bloqueado'

type HorarioSlot = {
  hora: string
  estado: SlotEstado
  titulo?: string
}

type Bloqueo = {
  id: string
  titulo: string
  rango: string
  tipo: 'vacaciones' | 'bloqueo'
}

const DEFAULT_SLOTS: HorarioSlot[] = [
  { hora: '08:00', estado: 'libre' },
  { hora: '09:00', estado: 'libre' },
  { hora: '10:00', estado: 'libre' },
  { hora: '11:00', estado: 'libre' },
  { hora: '12:00', estado: 'libre' },
  { hora: '13:00', estado: 'bloqueado', titulo: 'Almuerzo' },
  { hora: '14:00', estado: 'libre' },
  { hora: '15:00', estado: 'libre' },
  { hora: '16:00', estado: 'libre' },
  { hora: '17:00', estado: 'libre' },
]

const DEFAULT_BLOQUEOS: Bloqueo[] = [
  { id: 'b-1', titulo: 'Vacaciones', rango: '20 - 24 jul', tipo: 'vacaciones' },
  { id: 'b-2', titulo: 'Almuerzo (diario)', rango: '13:00 - 14:00', tipo: 'bloqueo' },
]

export function SectionAgenda() {
  const { data, isLoading, isError } = useProviderDashboard()
  
  const [slots, setSlots] = useState<HorarioSlot[]>([])
  const [bloqueos, setBloqueos] = useState<Bloqueo[]>([])
  const [showAddBlock, setShowAddBlock] = useState(false)
  
  // Form states for custom blocking
  const [blockTitle, setBlockTitle] = useState("")
  const [blockRange, setBlockRange] = useState("")
  const [blockType, setBlockType] = useState<'vacaciones' | 'bloqueo'>('bloqueo')

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSlots = localStorage.getItem("chambista_agenda_slots")
      const storedBloqueos = localStorage.getItem("chambista_agenda_bloqueos")
      
      setSlots(storedSlots ? JSON.parse(storedSlots) : DEFAULT_SLOTS)
      setBloqueos(storedBloqueos ? JSON.parse(storedBloqueos) : DEFAULT_BLOQUEOS)
    }
  }, [])

  // Save to localStorage whenever state changes
  const saveSlots = (newSlots: HorarioSlot[]) => {
    setSlots(newSlots)
    localStorage.setItem("chambista_agenda_slots", JSON.stringify(newSlots))
  }

  const saveBloqueos = (newBloqueos: Bloqueo[]) => {
    setBloqueos(newBloqueos)
    localStorage.setItem("chambista_agenda_bloqueos", JSON.stringify(newBloqueos))
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Cargando agenda...</div>
  if (isError || !data) return <div className="p-8 text-center text-destructive">Error al cargar datos. Asegúrate de tener el backend corriendo.</div>

  const AGENDA_REAL = data.agenda || []
  const trabajosHoy = AGENDA_REAL.filter((e) => e.tipo === "trabajo")

  // Combine static / user-blocked slots with real backend bookings
  const getCombinedSlots = (): HorarioSlot[] => {
    return slots.map((s) => {
      // Find if there is a backend booking at this exact hour (matching formatted e.g. "08:00")
      const matchingBooking = AGENDA_REAL.find(
        (b) => b.hora && b.hora.substring(0, 5) === s.hora
      )
      
      if (matchingBooking) {
        return {
          hora: s.hora,
          estado: 'ocupado',
          titulo: `Trabajo: ${matchingBooking.titulo} (${matchingBooking.cliente})`
        }
      }
      return s
    })
  }

  const combinedSlots = getCombinedSlots()

  // Toggle slot state between Libre and Bloqueado (only if not occupied by backend job)
  const handleToggleSlot = (hora: string) => {
    const target = combinedSlots.find(c => c.hora === hora)
    if (target?.estado === 'ocupado') return // Can't touch active bookings

    const updated = slots.map((s) => {
      if (s.hora === hora) {
        const nextEstado: SlotEstado = s.estado === 'libre' ? 'bloqueado' : 'libre'
        return {
          ...s,
          estado: nextEstado,
          titulo: nextEstado === 'bloqueado' ? 'Bloqueo manual' : undefined
        }
      }
      return s
    })
    saveSlots(updated)
  }

  // Add block/vacation list item
  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!blockTitle.trim() || !blockRange.trim()) return

    const newBlock: Bloqueo = {
      id: `b-${Date.now()}`,
      titulo: blockTitle.trim(),
      rango: blockRange.trim(),
      tipo: blockType
    }

    const updated = [newBlock, ...bloqueos]
    saveBloqueos(updated)
    
    // Also toggle the corresponding hours as blocked if it matches the text title or ranges
    setBlockTitle("")
    setBlockRange("")
    setShowAddBlock(false)
  }

  // Delete block item
  const handleDeleteBlock = (id: string) => {
    const updated = bloqueos.filter(b => b.id !== id)
    saveBloqueos(updated)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">Mi agenda</h2>
          <p className="text-sm text-muted-foreground">Organiza tus trabajos, horarios y disponibilidad en tiempo real.</p>
        </div>
        <Button size="sm" className="gap-1.5 self-start" onClick={() => setShowAddBlock(true)}>
          <Plus className="size-4" />
          Bloquear horario / Vacaciones
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Hoy */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg font-semibold text-foreground">Trabajos de hoy</h3>
              <Badge className="border-transparent bg-primary/15 text-primary">{trabajosHoy.length}</Badge>
            </div>
            {trabajosHoy.length === 0 ? (
              <Card className="flex items-center justify-center p-8 border-dashed border-border text-muted-foreground text-sm">
                No tienes trabajos asignados para hoy.
              </Card>
            ) : (
              trabajosHoy.map((ev) => (
                <Card key={ev.id} className="flex items-center gap-4 p-4 border-border/60">
                  <div className="flex flex-col items-center justify-center rounded-lg px-3 py-2 bg-primary/10 text-primary">
                    <Clock className="size-4" />
                    <span className="mt-1 text-xs font-semibold">{ev.hora}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate font-medium text-foreground">{ev.titulo}</span>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />
                      <span className="truncate">
                        {ev.cliente} {"·"} {ev.distrito}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Próximos */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-semibold text-foreground">Todos los trabajos programados</h3>
            {AGENDA_REAL.length === 0 ? (
              <Card className="flex items-center justify-center p-8 border-dashed border-border text-muted-foreground text-sm">
                Sin trabajos programados a futuro.
              </Card>
            ) : (
              AGENDA_REAL.map((ev) => (
                <Card key={ev.id} className="flex items-center gap-4 p-4 border-border/60">
                  <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg px-2 py-2 bg-secondary text-muted-foreground">
                    <CalendarDays className="size-4" />
                    <span className="mt-1 text-center text-[11px] font-medium leading-tight">{ev.hora}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate font-medium text-foreground">{ev.titulo}</span>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="truncate">
                        {ev.cliente} {"·"} {ev.distrito}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-3 border-border/60 p-5">
            <div className="flex flex-col">
              <h3 className="font-heading font-semibold text-foreground">Disponibilidad de hoy</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Haz clic sobre un horario libre para bloquearlo.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              {combinedSlots.map((slot) => {
                const isOcupado = slot.estado === "ocupado"
                const isBloqueado = slot.estado === "bloqueado"
                return (
                  <div key={slot.hora} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-sm text-muted-foreground">{slot.hora}</span>
                    <button
                      onClick={() => handleToggleSlot(slot.hora)}
                      disabled={isOcupado}
                      className={`flex h-9 flex-1 items-center justify-between rounded-xl px-3 text-xs font-semibold transition-all ${
                        isOcupado
                          ? "bg-blue-500/10 text-blue-600 border border-blue-200/50 cursor-not-allowed"
                          : isBloqueado
                            ? "bg-orange-500 text-white shadow-sm shadow-orange-500/15"
                            : "border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-slate-50"
                      }`}
                    >
                      <span>
                        {isOcupado ? "Ocupado (Cliente)" : isBloqueado ? "Bloqueado" : "Libre"}
                      </span>
                      {slot.titulo && (
                        <span className="text-[10px] opacity-90 font-normal truncate max-w-[120px]">
                          {slot.titulo}
                        </span>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-blue-500" />
                Trabajo
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-orange-500" />
                Bloqueado
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-dashed border-border" />
                Libre
              </div>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 border-border/60 p-5">
            <h3 className="font-heading font-semibold text-foreground">Bloqueos y vacaciones</h3>
            <div className="flex flex-col gap-3">
              {bloqueos.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">Sin bloqueos programados.</p>
              ) : (
                bloqueos.map((b) => (
                  <div key={b.id} className="group flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                          b.tipo === "vacaciones" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {b.tipo === "vacaciones" ? <Plane className="size-4" /> : <Ban className="size-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{b.titulo}</span>
                        <span className="text-xs text-muted-foreground">{b.rango}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteBlock(b.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Block Modal */}
      {showAddBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="relative w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowAddBlock(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X className="size-4" />
            </button>

            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Bloquear Agenda / Vacaciones</h3>
            <form onSubmit={handleAddBlock} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="block-type">Tipo</Label>
                <select
                  id="block-type"
                  value={blockType}
                  onChange={(e: any) => setBlockType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="bloqueo">Bloqueo Horario / Almuerzo</option>
                  <option value="vacaciones">Período de Vacaciones</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="block-title">Título / Motivo</Label>
                <Input
                  id="block-title"
                  placeholder="Ej. Viaje familiar, Cita médica, Almuerzo"
                  value={blockTitle}
                  onChange={e => setBlockTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="block-range">Fecha / Horario</Label>
                <Input
                  id="block-range"
                  placeholder="Ej. 13:00 - 14:00, 15 - 20 Set"
                  value={blockRange}
                  onChange={e => setBlockRange(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddBlock(false)}>Cancelar</Button>
                <Button type="submit" size="sm">Bloquear Fecha</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
