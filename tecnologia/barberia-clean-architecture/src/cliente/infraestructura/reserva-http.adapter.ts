import type { ReservaRemotaGateway } from '../aplicacion/solicitar-reserva.ts';
import type { ResultadoReserva, SolicitudReserva } from '../dominio/reserva.ts';

// El transporte inyectado permite simular HTTPS; aquí no se hace una llamada de red real.
export type TransporteHttp = (peticion: { sesion: string; cuerpo: SolicitudReserva }) => Promise<unknown>;

export class ReservaHttpAdapter implements ReservaRemotaGateway {
  private readonly transporte: TransporteHttp;
  private readonly sesion: () => string;
  constructor(transporte: TransporteHttp, sesion: () => string) { this.transporte = transporte; this.sesion = sesion; }

  async confirmar(solicitud: SolicitudReserva): Promise<ResultadoReserva> {
    try {
      const respuesta = await this.transporte({ sesion: this.sesion(), cuerpo: solicitud });
      if (esResultado(respuesta)) return respuesta;
    } catch { /* Una respuesta perdida no autoriza el reintento automático. */ }
    return { ok: false, codigo: 'ERROR_SERVICIO', mensaje: 'Consulta tus citas antes de volver a enviar la reserva.' };
  }
}

function esResultado(valor: unknown): valor is ResultadoReserva {
  if (!valor || typeof valor !== 'object') return false;
  const v = valor as Record<string, unknown>;
  if (v.ok === true) return typeof v.reservaId === 'string' && v.pago === 'pendiente';
  return v.ok === false && ['ENTRADA_INVALIDA', 'HORARIO_OCUPADO', 'NO_AUTORIZADO', 'ERROR_SERVICIO'].includes(String(v.codigo)) && typeof v.mensaje === 'string';
}
