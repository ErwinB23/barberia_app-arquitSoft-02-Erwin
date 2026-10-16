import { crearFlujoReserva } from '../composicion.ts';
import type { ClienteRpc } from '../infraestructura/supabase-reserva.adaptador.ts';

// Respuesta simulada para explicar el recorrido sin credenciales ni red.
function clienteDemostracion(ocupado: boolean): ClienteRpc {
  return {
    async rpc(nombre, parametros) {
      console.log('RPC:', nombre, '| Medio:', parametros.p_payment_method);
      return ocupado
        ? { data: null, error: { code: '23P01' } }
        : { data: '33333333-3333-4333-8333-333333333333', error: null };
    },
  };
}

const solicitud = {
  barberId: '11111111-1111-4111-8111-111111111111',
  items: [{ serviceId: '22222222-2222-4222-8222-222222222222', styleId: null }],
  startsAt: '2026-11-15T15:00:00-05:00',
  paymentMethod: 'cash',
};

for (const ocupado of [false, true]) {
  console.log(ocupado ? '\nCASO 2: horario ocupado' : 'CASO 1: reserva confirmada');
  console.log(await crearFlujoReserva(clienteDemostracion(ocupado)).ejecutar(solicitud));
}
console.log('\nCASO 3: selección incompleta (sin llamada RPC)');
console.log(await crearFlujoReserva(clienteDemostracion(false)).ejecutar({ ...solicitud, items: [] }));
