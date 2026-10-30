# C4. Código

## Componente que se abre

Se detalla **Coordinación de reservas**, el componente violeta mostrado en C3. El marco violeta contiene la clase CrearReserva y la interfaz que utiliza. Debajo quedan elementos de los componentes vecinos: la función y los tipos del Modelo de reserva, en verde, y la clase del Adaptador de reservas, en ámbar.

![C4: clases, interfaz, tipos y función independiente](../../img/nivel4-codigo.svg)

## Correspondencia con el código

| Elemento | Tipo y ubicación | Responsabilidad |
|---|---|---|
| CrearReserva | Clase de aplicacion/crear-reserva.ts | Recibe el gateway, normaliza la entrada y coordina la confirmación. |
| ReservaTransaccionalGateway | Interfaz de aplicacion/reserva-transaccional.contrato.ts | Define `confirmar(solicitud: SolicitudReserva): Promise<ResultadoReserva>`. |
| SolicitudReserva | Tipo de dominio/reserva.ts | barberId, items, startsAt y paymentMethod. |
| ResultadoReserva | Unión de tipos de dominio/reserva.ts | Éxito con reservaId o fallo con codigo y mensaje. |
| normalizarSolicitud | Función independiente de dominio/reserva.ts | Recibe unknown y devuelve SolicitudReserva o lanza un error de entrada. |
| SupabaseReservaAdapter | Clase del componente Adaptador de reservas | Implementa el gateway y mapea la RPC. |

CrearReserva dispone de un constructor que recibe ReservaTransaccionalGateway. Su método `ejecutar(entrada: unknown)` devuelve `Promise<ResultadoReserva>`. La función normalizarSolicitud no pertenece al tipo SolicitudReserva; se representa por separado.

## Lectura de relaciones

- **CrearReserva usa el contrato:** ReservaTransaccionalGateway define la operación confirmar que necesita el caso de uso. El contrato es una interfaz, no otro servidor.
- **CrearReserva llama a normalizarSolicitud:** la función comprueba formato y datos básicos antes de solicitar la confirmación. Los permisos y la disponibilidad definitiva se comprueban en servidor.
- **SupabaseReservaAdapter implementa el contrato:** la línea discontinua con triángulo apunta a la interfaz que cumple esta clase. Composición construye el adaptador y lo entrega a CrearReserva, como muestra C3.

Las tarjetas SolicitudReserva y ResultadoReserva explican los tipos utilizados en las firmas. `unknown` indica una entrada aún por validar; `Promise<ResultadoReserva>` indica que el resultado se obtiene de forma asíncrona. El diagrama selecciona los elementos relevantes de código; la tabla anterior conserva su ubicación exacta.

## Secuencia complementaria

![Secuencia de llamadas y respuestas de confirmación](../../img/nivel4-secuencia.svg)

La secuencia es una vista dinámica adicional, distinta del diagrama estático de código. Incluye presentación, caso de uso, adaptador, API de datos y PostgreSQL. Conserva los nombres de C2 y C3 y permite seguir la solicitud hasta la función create_reservation.

Una entrada inválida evita la llamada remota. Un conflicto 23P01 informa horario ocupado. Si se pierde la respuesta, se consultan las citas antes de reenviar. La demo simula el servidor; permisos y concurrencia reales se verificarán mediante EQ-01, EQ-02 y EQ-03. Elegir cash o yape no confirma recepción del pago.

El [diseño interno](../03-diseño-de-software/diseño-interno/diseño-interno-de-modulos.md) y la [demostración técnica](../../tecnologia/barberia-clean-architecture/README.md) completan esta vista.
