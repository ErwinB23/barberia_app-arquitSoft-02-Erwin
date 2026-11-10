import { SolicitarReserva } from './cliente/aplicacion/solicitar-reserva.ts';
import { ReservaHttpAdapter } from './cliente/infraestructura/reserva-http.adapter.ts';
import { ConfirmarReserva } from './servidor/aplicacion/confirmar-reserva.ts';
import { PostgresReservaAdapter } from './servidor/infraestructura/postgres-reserva.adapter.ts';
import { crearEntradaHttp } from './servidor/presentacion/entrada-http.ts';
import type { TransporteHttp } from './cliente/infraestructura/reserva-http.adapter.ts';
import type { RpcReserva } from './servidor/infraestructura/postgres-reserva.adapter.ts';

export function crearFlujoReserva(rpcSimulada: RpcReserva, verificarSesion: (sesion: string) => { usuarioId: string } | null, sesion: string) {
  const casoServidor = new ConfirmarReserva(new PostgresReservaAdapter(rpcSimulada));
  const entradaServidor = crearEntradaHttp(casoServidor, verificarSesion);
  // Transporte en memoria: conserva la frontera cliente-servidor, sin red real.
  const transporte: TransporteHttp = async peticion => entradaServidor(peticion);
  return new SolicitarReserva(new ReservaHttpAdapter(transporte, () => sesion));
}
