# Componentes arquitectónicos

## Alcance

Los módulos funcionales de la [arquitectura inicial](arquitectura-inicial.md) delimitan capacidades del negocio. Esta vista técnica selecciona el flujo de confirmación de una reserva dentro de la Aplicación móvil. No pretende enumerar todos los componentes del sistema.

![Componentes de la aplicación móvil para confirmar una reserva](../../img/nivel3-componentes.svg)

## Responsabilidades

| Componente | Responsabilidad | Elementos que lo representan |
|---|---|---|
| Presentación de reservas | Selección y comunicación de resultados. | Pantalla propuesta; entrada/salida de demo.ts en el ejemplo técnico. |
| Coordinación de reservas | Normalizar entrada y solicitar confirmación mediante un contrato. | CrearReserva y ReservaTransaccionalGateway. |
| Modelo de reserva | Tipos y validación pura de entrada. | SolicitudReserva, ResultadoReserva y normalizarSolicitud. |
| Adaptador de reservas | Conversión e integración de la RPC. | SupabaseReservaAdapter. |
| Composición | Construcción e inyección de dependencias. | crearFlujoReserva. |

Los componentes se ejecutan dentro de la aplicación cliente. La API de datos, servicio PostgREST de C2, se ejecuta en Supabase y queda fuera de ese límite.

## Relaciones y reglas

La presentación invoca el caso de uso. La coordinación usa los tipos de dominio y define un contrato que implementa el adaptador. La composición los conecta. El SDK queda en infraestructura; el dominio y la aplicación no importan implementaciones concretas.

El adaptador solicita create_reservation mediante HTTPS/RPC. PostgreSQL verifica identidad, membresía, disponibilidad, políticas y precios y conserva las escrituras relacionadas dentro de una transacción. La consulta previa de disponibilidad es orientativa hasta confirmar.

Esta vista apoya RF09-RF15, RF17 y RF42 y DA01, DA02, DA04, DA06 y DA11. El desglose forma parte de [C3](../04-modelo-c4/Nivel3-Diagrama-de-Componentes.md); su componente **Coordinación de reservas** se abre en [C4](../04-modelo-c4/Nivel4-DiagramadeCodigo.md).
