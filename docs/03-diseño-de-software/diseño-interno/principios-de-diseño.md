# Principios de diseño: SOLID

## Aplicación al flujo de reserva

SOLID ayuda a asignar responsabilidades y definir contratos pequeños. Se aplica dentro del enfoque [Clean Architecture](../../02-arquitectura-software/enfoque-arquitectonico.md), tanto en el cliente como en el servidor. No exige convertir todo el código en clases: los tipos propios y las funciones puras también expresan reglas del dominio.

| Principio | Aplicación en Barbería | Ejemplo en Reservas |
|---|---|---|
| S - Responsabilidad única | Separar la interacción, la coordinación de la operación y la comunicación con servicios externos. | La pantalla recoge la selección; `SolicitarReserva` coordina la solicitud; `ReservaHttpAdapter` realiza la llamada HTTPS. En el servidor, `ConfirmarReserva` coordina la confirmación y `PostgresReservaAdapter` accede a la persistencia. |
| O - Abierto/cerrado | Incorporar una implementación de un contrato sin modificar el caso de uso que lo necesita. | En una prueba se conecta un adaptador controlado a `ReservaRemotaGateway` o `ReservaAtomicaGateway`; los casos de uso conservan sus reglas. |
| L - Sustitución de Liskov | Toda implementación debe respetar la entrada, los resultados y el significado de su contrato. | Un adaptador de `ReservaAtomicaGateway` debe representar una confirmación completa: informa éxito solo cuando la operación termina; ante conflicto no deja escrituras parciales. Un doble de prueba conserva esos resultados, pero no demuestra por sí solo la transacción real. |
| I - Segregación de interfaces | Cada caso de uso depende de las operaciones que necesita, sin recibir servicios generales con métodos ajenos. | `ReservaRemotaGateway` representa la solicitud remota del cliente; `ReservaAtomicaGateway` representa la persistencia atómica del servidor. Ninguno incluye métodos de perfiles, mapas o catálogo. |
| D - Inversión de dependencias | Los casos de uso dependen de contratos definidos en Aplicación; Infraestructura los implementa. | `SolicitarReserva` conoce `ReservaRemotaGateway`, no `ReservaHttpAdapter`. `ConfirmarReserva` conoce `ReservaAtomicaGateway`, no `PostgresReservaAdapter`. La composición conecta cada par. |

## Ejemplo: sustituir un adaptador

Para probar `SolicitarReserva`, la composición puede entregarle un adaptador controlado que responda con confirmación, conflicto o error. Para probar `ConfirmarReserva`, puede entregarle otro que represente el resultado de una operación atómica. En ambos casos, el caso de uso conserva sus reglas y no importa la implementación concreta.

Una prueba del caso de uso verifica su coordinación y tratamiento de resultados. Las garantías de autorización, concurrencia y ausencia de escrituras parciales se verifican además con pruebas de integración de la Edge Function, el adaptador y PostgreSQL. Tener métodos con el mismo nombre no basta para cumplir sustitución: también debe conservarse el comportamiento acordado.

## Reglas que se revisarán

- El dominio y la aplicación del cliente no importan React Native, el SDK de Supabase ni detalles HTTP; los del servidor no importan detalles de Edge Functions, SDK, RPC o SQL.
- La pantalla ayuda a corregir la entrada, pero no decide precios, permisos ni disponibilidad definitiva.
- Los cambios de formatos HTTP y RPC se concentran en sus adaptadores respectivos.
- La composición de cada lado conoce el caso de uso y el adaptador concreto; el caso de uso conoce únicamente su contrato.
- Se prueban por separado las reglas y los casos de uso; las garantías dependientes del estado vigente y de transacciones se prueban por integración.

Estas reglas concretan AC08 y DA11. Los escenarios EQ-01 a EQ-03 verifican además seguridad e integridad. El [diseño interno de módulos](diseño-interno-de-modulos.md) desarrollará los elementos y las relaciones del flujo de reserva.
