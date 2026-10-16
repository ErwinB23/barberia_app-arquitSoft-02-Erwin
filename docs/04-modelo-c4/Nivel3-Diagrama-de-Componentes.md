# C3. Componentes

## Contenedor seleccionado

Se detalla la **aplicación Expo/React Native** de C2. Los componentes son responsabilidades internas; los servicios Supabase permanecen fuera de ese contenedor. El flujo principal es crear una reserva.

![Componentes de la aplicación y colaboración con el backend](../../img/nivel3-componentes.svg)

## Componentes internos

| Componente | Responsabilidad | Requisitos relacionados |
|---|---|---|
| Presentación y navegación | Pantallas, entradas y resultados por rol. | RF07, RF09, RF16, RF20, RF36 |
| Identidad y contexto | Sesión, perfil y espacio de barbería según membresía. | RF01-RF05, RF41, RF42 |
| Reservas y agenda | Selección, disponibilidad, confirmación, cambios y atención. | RF09-RF14, RF16-RF24 |
| Gestión de barbería | Configuración, publicación, catálogo, profesionales y horarios. | RF26-RF36 |
| Adaptadores de servicios | Traducir solicitudes y resultados a las interfaces de Supabase y correo. | ADR-003, ADR-010 |

Favoritos, invitaciones, pagos manuales y notificaciones apoyan estos flujos. El [documento de componentes](../02-arquitectura-software/componentes-arquitectonicos.md) conserva la misma vista y describe su cobertura funcional.

## Colaboración

| Origen | Destino | Acción |
|---|---|---|
| Presentación | Componente funcional | Invoca el caso de uso correspondiente. |
| Caso de uso | Contrato interno | Solicita una operación con entrada y resultado definidos. |
| Adaptador | Servicios Supabase | Ejecuta consultas, RPC o integración autorizada por HTTPS. |
| Servicios Supabase | Adaptador y presentación | Devuelve resultados y errores que se transforman a mensajes comprensibles. |

## Reglas

Las funcionalidades colaboran mediante interfaces definidas y no importan detalles internos de otra. El SDK queda fuera del dominio y de la aplicación. La validación del cliente no sustituye autorización o disponibilidad definitiva del servidor.

Las operaciones críticas se mantienen completas en PostgreSQL: dividirlas en varias escrituras desde el dispositivo rompería su garantía. Este límite responde a DA01, DA02, DA04, DA06 y DA11.

El siguiente nivel desarrolla [CrearReserva, su contrato y su adaptador](Nivel4-DiagramadeCodigo.md).
