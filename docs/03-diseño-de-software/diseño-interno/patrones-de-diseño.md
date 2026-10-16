# Patrones de diseño

## Propósito

Aplicar soluciones concretas para separar el caso de uso de los servicios externos. Se seleccionan únicamente los mecanismos que necesita el flujo CrearReserva.

| Patrón o mecanismo | Dónde se aplica | Problema que resuelve | Resultado |
|---|---|---|---|
| Adapter | SupabaseReservaAdapter | La RPC utiliza nombres de campos y errores propios del proveedor. | Convierte SolicitudReserva a parámetros RPC y devuelve ResultadoReserva. |
| Gateway transaccional | ReservaTransaccionalGateway | El caso de uso necesita una operación de negocio completa sin gestionar escrituras remotas separadas. | Un contrato confirmar(solicitud) representa la confirmación atómica de servidor. |
| Función fábrica y composición | crearFlujoReserva | La presentación no debe construir y conectar todas las dependencias del flujo. | La función crea el adaptador y lo entrega a CrearReserva mediante el constructor. |

## Cómo colaboran

```text
CrearReserva → ReservaTransaccionalGateway ← SupabaseReservaAdapter
                                                    ↓
                                          RPC create_reservation
```

La flecha desde el adaptador al contrato significa que lo implementa. La llamada de ejecución llega al adaptador conectado por composición. El caso de uso no importa la implementación concreta.

## Ejemplo de Adapter

| Modelo interno | Formato de la RPC |
|---|---|
| barberId | p_barber_id |
| items con serviceId y styleId | p_items con service_id y style_id |
| startsAt | p_starts_at |
| paymentMethod | p_payment_method |
| Conflicto 23P01 | Resultado HORARIO_OCUPADO con mensaje comprensible. |

El adaptador oculta detalles del proveedor, pero no inventa permisos ni reemplaza la validación definitiva. Si se conecta una implementación diferente, debe respetar el significado y los resultados del contrato.

## Límite del diseño

No se divide la reserva en llamadas independientes para guardar cita, servicios y pago. Esa división perdería la garantía transaccional. Tampoco se incorporan caché, pasarela automática o un bus de eventos sin una necesidad del alcance.

El [diseño interno](diseño-interno-de-modulos.md) muestra las clases y la secuencia. ADR-002, ADR-006 y ADR-010 justifican estos mecanismos.
