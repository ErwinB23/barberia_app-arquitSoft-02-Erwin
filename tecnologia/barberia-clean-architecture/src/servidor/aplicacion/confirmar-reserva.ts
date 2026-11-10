import type { ContextoUsuario, ResultadoConfirmacion, SolicitudConfirmacion } from '../dominio/reserva.ts';

export interface ReservaAtomicaGateway {
  confirmar(solicitud: SolicitudConfirmacion, contexto: ContextoUsuario): Promise<ResultadoConfirmacion>;
}

export class ConfirmarReserva {
  private readonly gateway: ReservaAtomicaGateway;
  constructor(gateway: ReservaAtomicaGateway) { this.gateway = gateway; }

  async ejecutar(solicitud: SolicitudConfirmacion, contexto: ContextoUsuario): Promise<ResultadoConfirmacion> {
    // La autorización definitiva y la exclusión concurrente deben ejecutarse en PostgreSQL.
    return this.gateway.confirmar(solicitud, contexto);
  }
}
