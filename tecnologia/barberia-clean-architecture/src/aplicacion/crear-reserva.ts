import { normalizarSolicitud } from '../dominio/reserva.ts';
import type { ResultadoReserva, SolicitudReserva } from '../dominio/reserva.ts';
import type { ReservaTransaccionalGateway } from './reserva-transaccional.contrato.ts';

export class CrearReserva {
  private readonly gateway: ReservaTransaccionalGateway;

  constructor(gateway: ReservaTransaccionalGateway) {
    this.gateway = gateway;
  }

  async ejecutar(entrada: unknown): Promise<ResultadoReserva> {
    let solicitud: SolicitudReserva;
    try {
      solicitud = normalizarSolicitud(entrada);
    } catch (error) {
      return { ok: false, codigo: 'ENTRADA_INVALIDA', mensaje: error instanceof Error ? error.message : 'Revisa la selección.' };
    }
    return this.gateway.confirmar(solicitud);
  }
}
