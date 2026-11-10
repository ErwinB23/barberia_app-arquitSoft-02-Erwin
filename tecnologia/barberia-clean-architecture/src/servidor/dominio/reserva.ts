export type ContextoUsuario = { usuarioId: string };
export type SolicitudConfirmacion = {
  barbershopId: string;
  barberId: string | null;
  items: { serviceId: string; styleId: string | null }[];
  startsAt: string;
  paymentMethod: 'cash' | 'yape';
};
export type ResultadoConfirmacion =
  | { ok: true; reservaId: string; pago: 'pendiente' }
  | { ok: false; codigo: 'HORARIO_OCUPADO' | 'NO_AUTORIZADO' | 'ERROR_SERVICIO'; mensaje: string };

// El servidor valida de nuevo, sin confiar en la validación del cliente.
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function esSolicitudConfirmacion(valor: unknown): valor is SolicitudConfirmacion {
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) return false;
  const s = valor as Record<string, unknown>;
  if (typeof s.barbershopId !== 'string' || !uuid.test(s.barbershopId)) return false;
  if (s.barberId !== null && (typeof s.barberId !== 'string' || !uuid.test(s.barberId))) return false;
  if (!Array.isArray(s.items) || s.items.length === 0) return false;
  const ids = new Set<string>();
  for (const item of s.items) {
    if (!item || typeof item !== 'object') return false;
    const i = item as Record<string, unknown>;
    if (typeof i.serviceId !== 'string' || !uuid.test(i.serviceId) || ids.has(i.serviceId)) return false;
    ids.add(i.serviceId);
    if (i.styleId !== null && (typeof i.styleId !== 'string' || !uuid.test(i.styleId))) return false;
  }
  return typeof s.startsAt === 'string' && /(Z|[+-]\d{2}:\d{2})$/i.test(s.startsAt)
    && Number.isFinite(Date.parse(s.startsAt))
    && (s.paymentMethod === 'cash' || s.paymentMethod === 'yape');
}
