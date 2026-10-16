# C4. Código

## Componente seleccionado

Se detalla el flujo CrearReserva del componente Reservas y agenda de C3. Se muestran sus tipos, clases, interfaz y colaboración.

## Estructura

![Tipos, contrato y adaptador de CrearReserva](../../img/nivel4-codigo.svg)

| Elemento | Tipo | Responsabilidad |
|---|---|---|
| SolicitudReserva | Tipo de dominio | Datos seleccionados por el cliente. |
| normalizarSolicitud | Función de dominio | Normalizar y validar la forma de entrada; no comprueba permisos ni disponibilidad. |
| ResultadoReserva | Tipo de dominio | Éxito con id o fallo con código y mensaje. |
| CrearReserva | Clase de aplicación | Coordinar validación y llamada al contrato. |
| ReservaTransaccionalGateway | Interfaz de aplicación | Definir confirmar(solicitud) como una operación completa. |
| SupabaseReservaAdapter | Clase de infraestructura | Implementar el contrato con create_reservation por RPC. |
| crearFlujoReserva | Función de composición | Construir el adaptador y entregarlo al caso de uso. |

Las flechas continuas representan referencias; las discontinuas, uso de tipos. El triángulo hueco identifica implementación de una interfaz. normalizarSolicitud es una función independiente del mismo archivo de tipos, no un método de SolicitudReserva.

## Secuencia

![Secuencia de confirmación de reserva](../../img/nivel4-secuencia.svg)

| Paso | Acción |
|---|---|
| 1 | Presentación entrega servicios, barbero, horario y medio de pago a CrearReserva. |
| 2 | El caso de uso normaliza la entrada y usa ReservaTransaccionalGateway. |
| 3 | SupabaseReservaAdapter mapea los campos e invoca create_reservation con la sesión del usuario. |
| 4 | PostgreSQL revalida permisos, disponibilidad y políticas y ejecuta las escrituras relacionadas. |
| 5 | El adaptador convierte el UUID devuelto en éxito o el conflicto 23P01 en HORARIO_OCUPADO. |
| 6 | Presentación informa el resultado y permite continuar. |

Una entrada inválida se rechaza sin llamada remota. Ante falta de autorización se deniega la operación. Si se pierde la respuesta, se consultan las citas antes de reenviar; la escritura no se reintenta automáticamente.

## Qué se demuestra

El diseño hace visible Adapter, el contrato transaccional, la composición y la inversión de dependencias. La reserva se confirma en servidor; elegir cash o yape no confirma recepción del pago.

La demostración simula respuestas de la RPC para explicar el recorrido. La concurrencia y los permisos reales requieren pruebas de PostgreSQL según EQ-01, EQ-02 y EQ-03. El [diseño interno](../03-diseño-de-software/diseño-interno/diseño-interno-de-modulos.md) desarrolla responsabilidades y errores.
