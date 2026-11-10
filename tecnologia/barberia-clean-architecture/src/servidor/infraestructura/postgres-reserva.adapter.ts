import type { ReservaAtomicaGateway } from '../aplicacion/confirmar-reserva.ts';
import type { ContextoUsuario, ResultadoConfirmacion, SolicitudConfirmacion } from '../dominio/reserva.ts';

// Esta interfaz imita la respuesta de una RPC. La demostración no conecta con PostgreSQL.
export type RpcReserva = (parametros: {
  barbershopId: string;
  barberId: string | null;
  items: { serviceId: string; styleId: string | null }[];
  startsAt: string;
  paymentMethod: 'cash' | 'yape';
}) => Promise<{ reservaId?: string; error?: 'OCUPADO' | 'NO_AUTORIZADO' }>;

export class PostgresReservaAdapter implements ReservaAtomicaGateway {
  private readonly rpc: RpcReserva;
  constructor(rpc: RpcReserva) { this.rpc = rpc; }

  async confirmar(solicitud: SolicitudConfirmacion, contexto: ContextoUsuario): Promise<ResultadoConfirmacion> {
    try {
      const resultado = await this.rpc({
        barbershopId: solicitud.barbershopId,
        barberId: solicitud.barberId,
        items: solicitud.items,
        startsAt: solicitud.startsAt,
        paymentMethod: solicitud.paymentMethod,
      });
      if (resultado.error === 'OCUPADO') return { ok: false, codigo: 'HORARIO_OCUPADO', mensaje: 'Ese horario ya está ocupado.' };
      if (resultado.error === 'NO_AUTORIZADO') return { ok: false, codigo: 'NO_AUTORIZADO', mensaje: 'No tienes permiso para reservar.' };
      if (resultado.reservaId) return { ok: true, reservaId: resultado.reservaId, pago: 'pendiente' };
    } catch { /* El detalle interno no se expone al cliente. */ }
    return { ok: false, codigo: 'ERROR_SERVICIO', mensaje: 'Consulta tus citas antes de intentar de nuevo.' };
  }
}
