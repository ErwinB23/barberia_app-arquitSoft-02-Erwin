import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SolicitarReserva } from '../src/cliente/aplicacion/solicitar-reserva.ts';
import { ReservaHttpAdapter } from '../src/cliente/infraestructura/reserva-http.adapter.ts';
import { ConfirmarReserva } from '../src/servidor/aplicacion/confirmar-reserva.ts';
import { crearEntradaHttp } from '../src/servidor/presentacion/entrada-http.ts';
import { crearFlujoReserva } from '../src/composicion.ts';

const solicitud = {
  barbershopId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  barberId: null,
  items: [{ serviceId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', styleId: null }],
  startsAt: '2026-11-15T15:00:00-05:00',
  paymentMethod: 'yape',
};
const reservaId = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const verificar = token => token === 'sesion-valida' ? { usuarioId: 'cliente-autenticado' } : null;

test('el caso de uso del cliente acepta un gateway de prueba y valida sin red', async () => {
  let llamadas = 0;
  const caso = new SolicitarReserva({ confirmar: async s => { llamadas++; assert.equal(s.barberId, null); return { ok: true, reservaId, pago: 'pendiente' }; } });
  assert.equal((await caso.ejecutar(solicitud)).ok, true);
  for (const entrada of [null, { ...solicitud, items: [] }, { ...solicitud, paymentMethod: 'tarjeta' }]) {
    assert.equal((await caso.ejecutar(entrada)).codigo, 'ENTRADA_INVALIDA');
  }
  assert.equal(llamadas, 1);
});

test('el adaptador cliente envía sesión por el transporte y no hace RPC', async () => {
  let peticion;
  const adapter = new ReservaHttpAdapter(async p => { peticion = p; return { ok: true, reservaId, pago: 'pendiente' }; }, () => 'sesion-valida');
  assert.equal((await adapter.confirmar(solicitud)).ok, true);
  assert.deepEqual(peticion, { sesion: 'sesion-valida', cuerpo: solicitud });
});

test('la entrada HTTP rechaza sesión o cuerpo inválidos antes de invocar el caso', async () => {
  let llamadas = 0;
  const caso = new ConfirmarReserva({ confirmar: async () => { llamadas++; return { ok: true, reservaId, pago: 'pendiente' }; } });
  const entrada = crearEntradaHttp(caso, verificar);
  assert.equal((await entrada({ sesion: 'falsa', cuerpo: solicitud })).codigo, 'NO_AUTORIZADO');
  assert.equal((await entrada({ sesion: 'sesion-valida', cuerpo: { items: [] } })).codigo, 'ENTRADA_INVALIDA');
  assert.equal((await entrada({ sesion: 'sesion-valida', cuerpo: { ...solicitud, startsAt: 'mañana' } })).codigo, 'ENTRADA_INVALIDA');
  assert.equal((await entrada({ sesion: 'sesion-valida', cuerpo: { ...solicitud, items: [{ serviceId: 'inventado', styleId: null }] } })).codigo, 'ENTRADA_INVALIDA');
  assert.equal(llamadas, 0);
});

test('el caso de uso servidor recibe identidad verificada y usa su contrato propio', async () => {
  let contexto;
  const caso = new ConfirmarReserva({ confirmar: async (_solicitud, c) => { contexto = c; return { ok: true, reservaId, pago: 'pendiente' }; } });
  assert.equal((await caso.ejecutar(solicitud, { usuarioId: 'cliente-autenticado' })).ok, true);
  assert.deepEqual(contexto, { usuarioId: 'cliente-autenticado' });
});

test('la composición recorre cliente y servidor; el pago Yape queda pendiente', async () => {
  let parametros;
  const rpc = async p => { parametros = p; return { reservaId }; };
  const resultado = await crearFlujoReserva(rpc, verificar, 'sesion-valida').ejecutar(solicitud);
  assert.deepEqual(resultado, { ok: true, reservaId, pago: 'pendiente' });
  assert.equal(parametros.barberId, null);
  assert.equal(parametros.paymentMethod, 'yape');
  assert.deepEqual(parametros.items, solicitud.items);
});

test('un conflicto se traduce y no se confirma una reserva', async () => {
  const resultado = await crearFlujoReserva(async () => ({ error: 'OCUPADO' }), verificar, 'sesion-valida').ejecutar(solicitud);
  assert.equal(resultado.codigo, 'HORARIO_OCUPADO');
});

test('una respuesta perdida no desencadena un reintento de escritura', async () => {
  let llamadas = 0;
  const caso = crearFlujoReserva(async () => { llamadas++; throw new Error('red'); }, verificar, 'sesion-valida');
  const resultado = await caso.ejecutar(solicitud);
  assert.equal(resultado.codigo, 'ERROR_SERVICIO');
  assert.equal(llamadas, 1);
});

test('los casos de uso y dominios no importan infraestructura', () => {
  const rutas = [
    'cliente/dominio/reserva.ts', 'cliente/aplicacion/solicitar-reserva.ts',
    'servidor/dominio/reserva.ts', 'servidor/aplicacion/confirmar-reserva.ts',
  ];
  for (const ruta of rutas) {
    const codigo = readFileSync(new URL('../src/' + ruta, import.meta.url), 'utf8');
    assert.doesNotMatch(codigo, /from ['"][^'"]*infraestructura/);
  }
});
