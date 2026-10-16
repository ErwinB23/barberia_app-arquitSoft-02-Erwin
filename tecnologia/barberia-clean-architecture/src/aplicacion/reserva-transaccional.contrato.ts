import type { ResultadoReserva, SolicitudReserva } from '../dominio/reserva.ts';

export interface ReservaTransaccionalGateway {
  // La implementación debe representar una sola operación de servidor.
  confirmar(solicitud: SolicitudReserva): Promise<ResultadoReserva>;
}
