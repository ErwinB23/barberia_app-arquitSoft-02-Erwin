import type { ReservaTransaccionalGateway } from '../aplicacion/reserva-transaccional.contrato.ts';
import type { ResultadoReserva, SolicitudReserva } from '../dominio/reserva.ts';

// Superficie mínima de rpc(). La composición recibe un cliente con sesión válida.
export type ClienteRpc = {
  rpc(nombre: 'create_reservation', parametros: {
    p_barber_id: string;
    p_items: { service_id: string; style_id: string | null }[];
    p_starts_at: string;
    p_payment_method: 'cash' | 'yape';
  }): PromiseLike<{ data: unknown; error: { code?: string; message?: string } | null }>;
};

export class SupabaseReservaAdapter implements ReservaTransaccionalGateway {
  private readonly cliente: ClienteRpc;

  constructor(cliente: ClienteRpc) {
    this.cliente = cliente;
  }

  async confirmar(solicitud: SolicitudReserva): Promise<ResultadoReserva> {
    try {
      const { data, error } = await this.cliente.rpc('create_reservation', {
        p_barber_id: solicitud.barberId,
        p_items: solicitud.items.map(item => ({ service_id: item.serviceId, style_id: item.styleId })),
        p_starts_at: solicitud.startsAt,
        p_payment_method: solicitud.paymentMethod,
      });
      if (error?.code === '23P01') {
        return { ok: false, codigo: 'HORARIO_OCUPADO', mensaje: 'Ese horario ya no está disponible. Elige otro.' };
      }
      if (error?.code === '42501' || error?.code === '28000') {
        return { ok: false, codigo: 'NO_AUTORIZADO', mensaje: 'Verifica tu sesión y permisos para realizar la reserva.' };
      }
      if (error || typeof data !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data)) {
        return { ok: false, codigo: 'ERROR_SERVICIO', mensaje: 'No pudimos confirmar la reserva. Revisa tus citas antes de volver a enviarla.' };
      }
      return { ok: true, reservaId: data };
    } catch {
      // Ante una interrupción no se reintenta automáticamente una escritura.
      return { ok: false, codigo: 'ERROR_SERVICIO', mensaje: 'No se recibió la confirmación. Consulta tus citas antes de volver a enviar.' };
    }
  }
}
