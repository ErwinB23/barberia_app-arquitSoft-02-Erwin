import { crearFlujoReserva } from '../composicion.ts';
import type { RpcReserva } from '../servidor/infraestructura/postgres-reserva.adapter.ts';

const barberia = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const barbero = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const servicio = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const reserva = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const solicitud = {
  barbershopId: barberia, barberId: barbero,
  items: [{ serviceId: servicio, styleId: null }],
  startsAt: '2026-11-15T15:00:00-05:00', paymentMethod: 'yape',
};
const verificarSesion = (sesion: string) => sesion === 'sesion-valida' ? { usuarioId: 'cliente-1' } : null;
function flujo(ocupado: boolean, sesion = 'sesion-valida') {
  const rpc: RpcReserva = async p => {
    console.log('RPC simulada en servidor:', p.barbershopId, '| medio:', p.paymentMethod);
    return ocupado ? { error: 'OCUPADO' } : { reservaId: reserva };
  };
  return crearFlujoReserva(rpc, verificarSesion, sesion);
}

console.log('1. Reserva confirmada; pago pendiente');
console.log(await flujo(false).ejecutar(solicitud));
console.log('2. Horario ocupado');
console.log(await flujo(true).ejecutar(solicitud));
console.log('3. Selección incompleta: no llega al servidor');
console.log(await flujo(false).ejecutar({ ...solicitud, items: [] }));
