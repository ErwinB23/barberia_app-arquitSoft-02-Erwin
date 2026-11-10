export type SolicitudReserva = {
  barbershopId: string;
  barberId: string | null;
  items: { serviceId: string; styleId: string | null }[];
  startsAt: string;
  paymentMethod: 'cash' | 'yape';
};

export type ResultadoReserva =
  | { ok: true; reservaId: string; pago: 'pendiente' }
  | { ok: false; codigo: 'ENTRADA_INVALIDA' | 'HORARIO_OCUPADO' | 'NO_AUTORIZADO' | 'ERROR_SERVICIO'; mensaje: string };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const registro = (v: unknown): Record<string, unknown> => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('Solicitud inválida.');
  return v as Record<string, unknown>;
};

// Solo forma de entrada. Identidad, permisos y disponibilidad se verifican en servidor.
export function normalizarSolicitud(entrada: unknown): SolicitudReserva {
  const v = registro(entrada);
  if (typeof v.barbershopId !== 'string' || !uuid.test(v.barbershopId)) throw new Error('Selecciona una barbería.');
  if (v.barberId !== null && (typeof v.barberId !== 'string' || !uuid.test(v.barberId))) throw new Error('Selecciona un barbero válido.');
  if (!Array.isArray(v.items) || !v.items.length) throw new Error('Selecciona un servicio.');
  const items = v.items.map(item => {
    const i = registro(item);
    if (typeof i.serviceId !== 'string' || !uuid.test(i.serviceId)) throw new Error('Selecciona servicios válidos.');
    const styleId = i.styleId ?? null;
    if (styleId !== null && (typeof styleId !== 'string' || !uuid.test(styleId))) throw new Error('Selecciona un estilo válido.');
    return { serviceId: i.serviceId as string, styleId };
  });
  if (new Set(items.map(i => i.serviceId)).size !== items.length) throw new Error('No repitas servicios.');
  if (typeof v.startsAt !== 'string' || !/(Z|[+-]\d{2}:\d{2})$/i.test(v.startsAt) || !Number.isFinite(Date.parse(v.startsAt))) throw new Error('Indica un horario con zona horaria.');
  if (v.paymentMethod !== 'cash' && v.paymentMethod !== 'yape') throw new Error('Elige efectivo o Yape.');
  return { barbershopId: v.barbershopId, barberId: v.barberId, items, startsAt: v.startsAt, paymentMethod: v.paymentMethod };
}
