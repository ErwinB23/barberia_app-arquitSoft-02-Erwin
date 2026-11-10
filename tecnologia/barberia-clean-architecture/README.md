# Demostración técnica: reserva con Clean Architecture

Ejemplo pequeño del diseño propuesto para App Barbería. Separa código de **cliente** y **servidor** desde el inicio. Todos los servicios externos se simulan en memoria: no requiere credenciales, conexión de red ni un proyecto Supabase.

## Recorrido

1. `SolicitarReserva` valida la forma de la selección y usa el contrato `ReservaRemotaGateway`.
2. `ReservaHttpAdapter` representa la solicitud HTTPS a una Edge Function y adjunta la sesión. En esta demo, un transporte en memoria entrega la petición a la entrada del servidor.
3. La entrada del servidor verifica una sesión simulada y vuelve a validar la solicitud. La identidad proviene de esa verificación, no de los datos enviados por la pantalla.
4. `ConfirmarReserva` usa su propio contrato `ReservaAtomicaGateway`. `PostgresReservaAdapter` representa la llamada RPC a PostgreSQL mediante una función inyectada; no hay base de datos real.
5. La respuesta regresa al cliente. La reserva puede quedar confirmada con el **pago pendiente**, o rechazarse por horario ocupado. Efectivo y Yape solo registran el medio elegido; la recepción del pago se confirmará manualmente por el barbero asignado o un administrador autorizado.

La validación local orienta al usuario. En el sistema real, los permisos, la disponibilidad y las escrituras relacionadas se decidirán en PostgreSQL dentro de una transacción. Esta demo no implementa ni verifica esas reglas de base de datos.

## Archivos

| Ruta | Responsabilidad |
|---|---|
| `src/cliente/dominio/` | Tipos de solicitud y resultado; validación de forma sin framework ni SDK. |
| `src/cliente/aplicacion/` | Caso de uso `SolicitarReserva` y contrato para confirmar a distancia. |
| `src/cliente/infraestructura/` | Adaptador del transporte que representa HTTPS. |
| `src/servidor/dominio/` | Tipos propios y validación de entrada del servidor. |
| `src/servidor/aplicacion/` | Caso de uso `ConfirmarReserva` y contrato de operación atómica. |
| `src/servidor/presentacion/` | Entrada que verifica la sesión y entrega identidad confiable al caso de uso. |
| `src/servidor/infraestructura/` | Adaptador que representa la llamada RPC y traduce su resultado. |
| `src/composicion.ts` | Conecta casos de uso y adaptadores con dobles en memoria. |
| `src/presentacion/demo.ts` | Muestra confirmación, horario ocupado y selección incompleta. |
| `pruebas/reserva.test.mjs` | Prueba sustitución de contratos, fronteras, errores y dependencias. |

## Ejecutar

Dentro de esta carpeta, con Node.js 22.18 o superior y npm:

```bash
npm ci
npm run check
npm test
npm run demo
```

`check` revisa tipos, `test` ejecuta las pruebas locales y `demo` imprime tres resultados. Node se usa para la demostración y las pruebas; no se propone un backend Node.js para la aplicación.

## Límite de la evidencia

Las pruebas comprueban el comportamiento de este ejemplo con dobles. No prueban HTTPS real, Auth, Edge Functions, RLS, exclusión de horarios, transacciones SQL, entrega de correo ni carga. Esos aspectos requieren implementar el backend y ejecutar los [escenarios de calidad](../../docs/01-analisis-de-sistema/08-escenarios-atributos-calidad.md). La forma definitiva de la RPC y de los datos se fijará al implementar la operación de servidor.
