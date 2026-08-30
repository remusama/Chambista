'use client'

import { BadgeCheck, ShieldCheck } from 'lucide-react'
import type { StepProps } from '../onboarding-wizard'
import { PhotoUpload } from '../photo-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PERU, getProvincias, getDistritos } from '@/lib/peru-locations'

export function StepContacto({ data, update }: StepProps) {
  function verificarCelular() {
    if (data.celular.length < 6) {
      alert('Ingresa un número de celular válido.')
      return
    }
    update({ celularVerificado: true })
    alert('Celular verificado correctamente.')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5">
        <Label className="mb-3 block">Fotografía de perfil</Label>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <PhotoUpload
            circle
            value={data.fotoPerfil}
            onChange={(url) => update({ fotoPerfil: url })}
            label="Subir"
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Usa una foto real y reciente, con buena iluminación y rostro visible. Los perfiles con
            foto reciben hasta 3 veces más solicitudes.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="celular">Número de celular *</Label>
        <div className="flex gap-2">
          <Input
            id="celular"
            inputMode="tel"
            placeholder="Ej. 987 654 321"
            value={data.celular}
            onChange={(e) => update({ celular: e.target.value, celularVerificado: false })}
          />
          <Button
            type="button"
            variant={data.celularVerificado ? 'secondary' : 'default'}
            onClick={verificarCelular}
            disabled={data.celularVerificado}
            className="shrink-0 gap-1"
          >
            {data.celularVerificado ? (
              <>
                <BadgeCheck className="size-4" /> Verificado
              </>
            ) : (
              'Verificar'
            )}
          </Button>
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Verificaremos tu número por SMS para dar más confianza a los clientes.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="correo">Correo electrónico (Confirmado)</Label>
        <Input
          id="correo"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={data.correo}
          disabled
          className="bg-muted opacity-80 cursor-not-allowed"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="departamento">Departamento *</Label>
          <select
            id="departamento"
            value={data.ciudad}
            onChange={(e) => update({ ciudad: e.target.value, provincia: '', distrito: '' })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">Selecciona</option>
            {PERU.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="provincia">Provincia *</Label>
          <select
            id="provincia"
            value={data.provincia || ''}
            onChange={(e) => update({ provincia: e.target.value, distrito: '' })}
            disabled={!data.ciudad}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            required
          >
            <option value="">Selecciona</option>
            {getProvincias(data.ciudad).map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="distrito">Distrito *</Label>
          <select
            id="distrito"
            value={data.distrito}
            onChange={(e) => update({ distrito: e.target.value })}
            disabled={!data.provincia}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            required
          >
            <option value="">Selecciona</option>
            {getDistritos(data.ciudad, data.provincia).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zona">Zona / urbanización *</Label>
        <Input
          id="zona"
          placeholder="Ej. Higuereta"
          value={data.zona}
          onChange={(e) => update({ zona: e.target.value })}
        />
      </div>
    </div>
  )
}
