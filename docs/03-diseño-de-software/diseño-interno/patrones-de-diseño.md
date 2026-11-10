# Patrones de diseño

## Propósito

Aplicar mecanismos concretos para que los casos de uso de Reservas dependan de contratos propios. Cliente y servidor aplican Clean Architecture desde su primera implementación; cada lado conecta sus casos de uso con adaptadores de infraestructura.

| Patrón o mecanismo | Dónde se aplica | Problema que resuelve | Resultado |
|---|---|---|---|
| Adapter | `ReservaHttpAdapter` en el cliente y `PostgresReservaAdapter` en el servidor. | HTTPS y RPC usan formatos, respuestas y errores externos que no deben llegar a los casos de uso. | Cada adaptador traduce entre su contrato interno y el servicio correspondiente. |
| Gateway o puerto | `ReservaRemotaGateway` en el cliente y `ReservaAtomicaGateway` en el servidor. | Cada caso de uso necesita expresar una operación completa sin conocer el proveedor ni dividir la escritura en pasos remotos. | El primer contrato solicita la confirmación al servidor; el segundo solicita la persistencia atómica. |
| Composición | Un punto de conexión en el cliente y otro en el servidor. | La pantalla y la entrada HTTP no deben construir las dependencias del flujo en cada operación. | Cada punto crea o recibe el adaptador concreto y lo entrega al caso de uso que depende del contrato. |

## Cómo colaboran

**Dependencias del código, en cada lado:**

```text
Cliente:  SolicitarReserva  → ReservaRemotaGateway  ← ReservaHttpAdapter
Servidor: ConfirmarReserva → ReservaAtomicaGateway ← PostgresReservaAdapter
```

En estas líneas, el caso de uso conoce el contrato y el adaptador lo implementa. La composición conecta ambos. Las flechas no indican el orden de las llamadas durante una reserva.

**Ejecución de una confirmación:**

```text
Pantalla → SolicitarReserva → ReservaHttpAdapter → Edge Function
        → ConfirmarReserva → PostgresReservaAdapter → PostgREST RPC → PostgreSQL
```

La entrada HTTP de la Edge Function verifica la sesión antes de invocar `ConfirmarReserva`. El resultado vuelve por el mismo recorrido. Los casos de uso no importan los adaptadores concretos.

## Qué traduce cada adaptador

| Adaptador | Traducción que realiza |
|---|---|
| `ReservaHttpAdapter` | Convierte la solicitud propia del cliente en una petición HTTPS con la sesión del usuario; transforma la respuesta del servidor en confirmación, conflicto o error propio de `SolicitarReserva`. |
| `PostgresReservaAdapter` | Convierte la solicitud propia de `ConfirmarReserva` en los parámetros de la función PostgreSQL; transforma el resultado y los errores de la RPC en tipos propios del servidor. |

La firma de la función SQL y sus parámetros se definirán al diseñar el adaptador del servidor; no forman parte del contrato remoto del cliente. Por ejemplo, una restricción de intervalos que rechace una cita superpuesta debe traducirse en un conflicto comprensible, sin exponer un código de error SQL a la pantalla. El adaptador no inventa permisos ni reemplaza las comprobaciones definitivas de PostgreSQL.

## Límite del diseño

La confirmación se solicita como una operación completa. PostgreSQL comprueba permisos y disponibilidad actuales y guarda reserva, condiciones históricas, pago pendiente y avisos internos relacionados en una transacción, o revierte las escrituras. Elegir efectivo o Yape no confirma el pago: el barbero asignado o un administrador autorizado verifica después su recepción. Esta propuesta no incluye pasarela automática.

El [diseño interno](diseño-interno-de-modulos.md) desarrolla responsabilidades, contratos y secuencia. ADR-002, ADR-006 y ADR-010 justifican estos mecanismos. Los nombres de elementos son ejemplos de diseño, no archivos que se afirme ya implementados.
