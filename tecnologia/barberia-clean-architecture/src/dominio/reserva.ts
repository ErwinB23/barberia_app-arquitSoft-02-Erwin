export type SolicitudReserva = {
  barberId: string;
  items: { serviceId: string; styleId: string | null }[];
  startsAt: string;
  paymentMethod: 'cash' | 'yape';
};

export type ResultadoReserva =
  | { ok: true; reservaId: string }
  | { ok: false; codigo: 'ENTRADA_INVALIDA' | 'HORARIO_OCUPADO' | 'NO_AUTORIZADO' | 'ERROR_SERVICIO'; mensaje: string };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function objeto(valor: unknown): Record<string, unknown> {
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) {
    throw new Error('La selección debe ser un objeto.');
  }
  return valor as Record<string, unknown>;
}

// Validaciones de entrada. Permisos, precios y disponibilidad se verifican en servidor.
export function normalizarSolicitud(entrada: unknown): SolicitudReserva {
  const valor = objeto(entrada);
  if (typeof valor.barberId !== 'string' || !uuid.test(valor.barberId)) {
    throw new Error('Selecciona un barbero válido.');
  }
  if (!Array.isArray(valor.items) || valor.items.length === 0) {
    throw new Error('Selecciona al menos un servicio.');
  }
  const items = valor.items.map((item: unknown) => {
    const servicio = objeto(item);
    if (typeof servicio.serviceId !== 'string' || !uuid.test(servicio.serviceId)) {
      throw new Error('Selecciona servicios válidos.');
    }
    const styleId = servicio.styleId ?? null;
    if (styleId !== null && (typeof styleId !== 'string' || !uuid.test(styleId))) {
      throw new Error('Selecciona un estilo válido.');
    }
    return { serviceId: servicio.serviceId, styleId };
  });
  if (new Set(items.map(item => item.serviceId)).size !== items.length) {
    throw new Error('No repitas el mismo servicio.');
  }
  if (typeof valor.startsAt !== 'string' || !/(Z|[+-]\d{2}:\d{2})$/i.test(valor.startsAt) || !Number.isFinite(Date.parse(valor.startsAt))) {
    throw new Error('Selecciona un horario con zona horaria.');
  }
  if (valor.paymentMethod !== 'cash' && valor.paymentMethod !== 'yape') {
    throw new Error('Elige efectivo o Yape.');
  }
  // No se incorporan precios, clienteId ni barbershopId enviados por la pantalla.
  return { barberId: valor.barberId, items, startsAt: valor.startsAt, paymentMethod: valor.paymentMethod };
}
