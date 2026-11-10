import { normalizarSolicitud } from '../dominio/reserva.ts';
import type { ResultadoReserva, SolicitudReserva } from '../dominio/reserva.ts';

export interface ReservaRemotaGateway {
  confirmar(solicitud: SolicitudReserva): Promise<ResultadoReserva>;
}

export class SolicitarReserva {
  private readonly gateway: ReservaRemotaGateway;
  constructor(gateway: ReservaRemotaGateway) { this.gateway = gateway; }

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
