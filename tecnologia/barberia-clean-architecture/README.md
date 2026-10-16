# Demostración de Clean Architecture: crear una reserva

Ejemplo mínimo del flujo de App Barbería. Muestra entrada, caso de uso, contrato, adaptador y resultado. No contiene una aplicación móvil completa.

## Ejecutar

Requiere Node.js 22.18 o superior y npm. Node ejecuta la demostración y las pruebas; no es una API propia del proyecto.

```bash
npm ci
npm run check
npm test
npm run demo
```

La demo funciona sin credenciales ni red: simula la respuesta RPC para mostrar confirmación, conflicto de horario y entrada incompleta.

## Organización del código

| Archivo | Qué explica |
|---|---|
| src/dominio/reserva.ts | Tipos y validación de entrada sin SDK. |
| src/aplicacion/crear-reserva.ts | Coordinación del flujo mediante un contrato. |
| src/aplicacion/reserva-transaccional.contrato.ts | Operación completa que necesita el caso de uso. |
| src/infraestructura/supabase-reserva.adaptador.ts | Mapeo a create_reservation y resultados controlados. |
| src/composicion.ts | Conexión entre contrato e implementación. |
| src/presentacion/demo.ts | Entrada y presentación de los tres resultados. |
| pruebas/reserva.test.mjs | Validación, sustitución, mapeo, errores y dependencias. |

## Contrato de servidor

La RPC create_reservation recibe p_barber_id, p_items, p_starts_at y p_payment_method, y devuelve el UUID de la reserva. p_items contiene service_id y style_id. El cliente autenticado y la barbería se resuelven y validan en servidor; los precios no se aceptan desde la pantalla.

Para integrar el adaptador se entrega un cliente Supabase configurado con la sesión del usuario mediante crearFlujoReserva(cliente). Esa instancia debe disponer del esquema y de la función con sus permisos y restricciones. No se incluyen credenciales ni una migración incompleta para desplegar una base.

PostgreSQL debe revalidar disponibilidad, estados y permisos y guardar reserva, servicios, pago pendiente y condiciones históricas en una transacción. Un conflicto devuelve 23P01; una respuesta perdida requiere consultar las citas antes de reenviar.

## Qué demuestran las pruebas

Comprueban el código del ejemplo y su contrato remoto. La RPC simulada no demuestra permisos reales, concurrencia de PostgreSQL ni rendimiento: esos aspectos se evaluarán en los escenarios EQ-01 a EQ-06.

Elegir efectivo o Yape no confirma recepción del pago. El resultado de la demo confirma únicamente la reserva simulada.
