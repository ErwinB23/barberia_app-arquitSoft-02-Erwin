import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CrearReserva } from '../src/aplicacion/crear-reserva.ts';
import { crearFlujoReserva } from '../src/composicion.ts';

const id = '33333333-3333-4333-8333-333333333333';
const solicitud = {
  barberId: '11111111-1111-4111-8111-111111111111',
  items: [{ serviceId: '22222222-2222-4222-8222-222222222222', styleId: null }],
  startsAt: '2026-11-15T15:00:00-05:00',
  paymentMethod: 'cash',
};

test('el caso de uso funciona con otro gateway y no necesita Supabase', async () => {
  const caso = new CrearReserva({ confirmar: async () => ({ ok: true, reservaId: id }) });
  assert.deepEqual(await caso.ejecutar(solicitud), { ok: true, reservaId: id });
});

test('rechaza entradas inválidas sin ejecutar la operación remota', async () => {
  let llamadas = 0;
  const caso = new CrearReserva({ confirmar: async () => { llamadas++; return { ok: true, reservaId: id }; } });
  for (const entrada of [null, [], { ...solicitud, items: [] }, { ...solicitud, paymentMethod: 'tarjeta' }, { ...solicitud, startsAt: '2026-11-15T15:00:00' }, { ...solicitud, barberId: '' }, { ...solicitud, items: [...solicitud.items, ...solicitud.items] }]) {
    const resultado = await caso.ejecutar(entrada);
    assert.equal(resultado.ok, false);
    assert.equal(resultado.codigo, 'ENTRADA_INVALIDA');
  }
  assert.equal(llamadas, 0);
});

test('envía una sola RPC con los campos del contrato y sin precios ni identidad suministrados', async () => {
  const llamadas = [];
  const cliente = { rpc: async (nombre, parametros) => { llamadas.push({ nombre, parametros }); return { data: id, error: null }; } };
  const entrada = { ...solicitud, clienteId: 'otro-usuario', barbershopId: 'otra-barberia', precio: 1 };
  assert.equal((await crearFlujoReserva(cliente).ejecutar(entrada)).ok, true);
  assert.deepEqual(llamadas, [{ nombre: 'create_reservation', parametros: { p_barber_id: solicitud.barberId, p_items: [{ service_id: solicitud.items[0].serviceId, style_id: null }], p_starts_at: solicitud.startsAt, p_payment_method: 'cash' } }]);
});

test('Yape se envía como medio elegido, sin generar una confirmación de pago', async () => {
  let medio;
  const cliente = { rpc: async (_, parametros) => { medio = parametros.p_payment_method; return { data: id, error: null }; } };
  const resultado = await crearFlujoReserva(cliente).ejecutar({ ...solicitud, paymentMethod: 'yape' });
  assert.deepEqual(resultado, { ok: true, reservaId: id });
  assert.equal(medio, 'yape');
  assert.equal('pagado' in resultado, false);
});

test('convierte un conflicto de PostgreSQL en un resultado comprensible', async () => {
  const cliente = { rpc: async () => ({ data: null, error: { code: '23P01', message: 'detalle interno' } }) };
  const resultado = await crearFlujoReserva(cliente).ejecutar(solicitud);
  assert.equal(resultado.codigo, 'HORARIO_OCUPADO');
  assert.equal(resultado.mensaje.includes('detalle interno'), false);
});

test('rechaza una operación sin autorización sin exponer el mensaje del proveedor', async () => {
  for (const code of ['42501', '28000']) {
    const cliente = { rpc: async () => ({ data: null, error: { code, message: 'detalle privado' } }) };
    const resultado = await crearFlujoReserva(cliente).ejecutar(solicitud);
    assert.equal(resultado.codigo, 'NO_AUTORIZADO');
    assert.equal(resultado.mensaje.includes('detalle privado'), false);
  }
});

test('no declara confirmación ante una respuesta inválida', async () => {
  for (const data of [null, {}, '', 'identificador-invalido']) {
    const resultado = await crearFlujoReserva({ rpc: async () => ({ data, error: null }) }).ejecutar(solicitud);
    assert.equal(resultado.codigo, 'ERROR_SERVICIO');
  }
});

test('una interrupción no provoca un reintento automático de escritura', async () => {
  let llamadas = 0;
  const cliente = { rpc: async () => { llamadas++; throw new Error('red interrumpida'); } };
  const resultado = await crearFlujoReserva(cliente).ejecutar(solicitud);
  assert.equal(resultado.codigo, 'ERROR_SERVICIO');
  assert.equal(llamadas, 1);
  assert.match(resultado.mensaje, /Consulta tus citas/);
});

test('dominio y aplicación mantienen sus dependencias hacia el interior', () => {
  for (const ruta of ['dominio/reserva.ts', 'aplicacion/crear-reserva.ts', 'aplicacion/reserva-transaccional.contrato.ts']) {
    const texto = readFileSync(new URL('../src/' + ruta, import.meta.url), 'utf8');
    for (const [, destino] of texto.matchAll(/from ['"]([^'"]+)['"]/g)) {
      assert.ok(!destino.includes('infraestructura') && destino.startsWith('.'), destino);
    }
  }
});
