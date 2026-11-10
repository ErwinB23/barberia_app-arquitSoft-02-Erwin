import type { ConfirmarReserva } from '../aplicacion/confirmar-reserva.ts';
import { esSolicitudConfirmacion } from '../dominio/reserva.ts';
import type { ContextoUsuario } from '../dominio/reserva.ts';

export type PeticionReserva = { sesion: string; cuerpo: unknown };

// La sesión se resuelve en el servidor; el cliente no decide su identidad.
export function crearEntradaHttp(caso: ConfirmarReserva, verificarSesion: (sesion: string) => ContextoUsuario | null) {
  return async ({ sesion, cuerpo }: PeticionReserva) => {
    const contexto = verificarSesion(sesion);
    if (!contexto) return { ok: false as const, codigo: 'NO_AUTORIZADO' as const, mensaje: 'Inicia sesión.' };
    if (!esSolicitudConfirmacion(cuerpo)) return { ok: false as const, codigo: 'ENTRADA_INVALIDA' as const, mensaje: 'Revisa la selección.' };
    return caso.ejecutar(cuerpo, contexto);
  };
}
