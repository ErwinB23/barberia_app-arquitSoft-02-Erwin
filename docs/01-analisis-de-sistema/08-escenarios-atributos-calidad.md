# Escenarios de atributos de calidad

Cada escenario concreta un atributo de calidad: quién origina el estímulo, qué ocurre, sobre qué parte, en qué entorno, cómo responde el sistema y con qué medida se evalúa.

Las medidas son metas de diseño por validar; no son resultados de pruebas ni garantías del proveedor. En rendimiento se medirán operaciones y solicitudes concurrentes, no solo cuentas registradas.

## EQ-01. Seguridad: operación protegida

| Elemento | Descripción |
|---|---|
| Atributo | AC01 |
| Fuente del estímulo | Usuario sin sesión o sin permiso. |
| Estímulo | Intenta consultar una reserva ajena o confirmar un pago. |
| Artefacto | Auth, políticas y funciones de reservas/pagos. |
| Entorno | Pruebas con roles y recursos definidos. |
| Respuesta | Rechaza la operación sin datos privados ni cambios. |
| Medida | 100 % de los intentos no autorizados del conjunto de prueba se rechaza; cero datos privados expuestos. |
| Verificación | Comparar respuestas y datos antes/después de las solicitudes. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-02. Aislamiento entre barberías

| Elemento | Descripción |
|---|---|
| Atributo | AC02 |
| Fuente del estímulo | Administrador de la barbería A. |
| Estímulo | Sustituye un identificador para gestionar información privada de B. |
| Artefacto | Membresías, relaciones por barbería y políticas de acceso. |
| Entorno | Dos barberías con usuarios, reservas y pagos diferentes. |
| Respuesta | Verifica barbería y recurso y deniega el acceso cruzado. |
| Medida | Cero lecturas privadas o modificaciones cruzadas en todos los casos definidos. |
| Verificación | Probar identificadores de B con la sesión del administrador de A. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-03. Integridad: reservas simultáneas

| Elemento | Descripción |
|---|---|
| Atributo | AC03 |
| Fuente del estímulo | Dos clientes autenticados. |
| Estímulo | Confirman intervalos superpuestos para el mismo barbero. |
| Artefacto | create_reservation y restricciones de PostgreSQL. |
| Entorno | Solicitudes concurrentes y horario inicialmente libre. |
| Respuesta | Confirma como máximo una solicitud incompatible; rechaza la otra sin datos parciales. |
| Medida | Cero reservas activas superpuestas y cero reservas con escrituras incompletas en las repeticiones acordadas. |
| Verificación | Enviar solicitudes simultáneas e inducir un fallo antes de completar la transacción. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-04. Rendimiento: consulta de disponibilidad

| Elemento | Descripción |
|---|---|
| Atributo | AC04 |
| Fuente del estímulo | Clientes. |
| Estímulo | Consultan catálogo, horarios y reservas al mismo tiempo. |
| Artefacto | Consultas principales y función de disponibilidad. |
| Entorno | 100 usuarios concurrentes; datos, red y recursos de prueba documentados. |
| Respuesta | Devuelve resultados y errores controlados. |
| Medida | Meta por validar: percentil 95 de las consultas ≤ 3 segundos y menos de 1 % de errores técnicos durante 10 minutos. Se excluyen interacción humana y mapas externos. |
| Verificación | Registrar latencia de extremo a extremo, errores y consumo bajo la mezcla de operaciones definida. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-05. Disponibilidad: acceso a citas

| Elemento | Descripción |
|---|---|
| Atributo | AC05 |
| Fuente del estímulo | Usuario. |
| Estímulo | Intenta autenticarse y consultar o gestionar sus citas. |
| Artefacto | Auth y operaciones principales de reservas. |
| Entorno | Servicio publicado y observación mensual con monitoreo. |
| Respuesta | Atiende el flujo o comunica una interrupción recuperable. |
| Medida | Meta por validar: disponibilidad mensual ≥ 99,5 % del flujo supervisado; registrar también mantenimientos e interrupciones. |
| Verificación | Calcular tiempo disponible / tiempo observado y revisar los fallos de cada dependencia. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-06. Escalabilidad: aumento de demanda

| Elemento | Descripción |
|---|---|
| Atributo | AC06 |
| Fuente del estímulo | Mayor cantidad de clientes y barberías. |
| Estímulo | Crece la carga de consultas y confirmaciones. |
| Artefacto | Servicios Supabase, consultas e índices. |
| Entorno | Prueba por etapas de 25, 50 y 100 usuarios concurrentes, con volumen y recursos registrados. |
| Respuesta | Soporta la carga objetivo o identifica qué recurso debe ampliarse. |
| Medida | Meta por validar en la etapa de 100 usuarios: percentil 95 ≤ 3 segundos en consultas, menos de 1 % de errores técnicos y cero pérdidas de integridad. Los rechazos esperados por conflicto no son errores técnicos. |
| Verificación | Comparar tiempos, errores, CPU y conexiones entre etapas; ajustar y repetir si no se cumple. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-07. Confiabilidad: fallo del correo

| Elemento | Descripción |
|---|---|
| Atributo | AC07 |
| Fuente del estímulo | Proveedor de correo. |
| Estímulo | Falla al enviar una invitación después de su registro. |
| Artefacto | Invitaciones y Edge Function de correo. |
| Entorno | Operación principal confirmada y proveedor no disponible. |
| Respuesta | Conserva la invitación e informa que el envío no se completó. |
| Medida | 100 % de las invitaciones confirmadas en la prueba se conserva; un reintento no crea otra invitación. |
| Verificación | Simular un error de envío y revisar registro, resultado y comportamiento del reintento. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-08. Mantenibilidad: cambiar un adaptador

| Elemento | Descripción |
|---|---|
| Atributo | AC08 |
| Fuente del estímulo | Desarrollador. |
| Estímulo | Sustituye el adaptador de reserva por uno de prueba. |
| Artefacto | Caso de uso, contrato y adaptador del módulo Reservas. |
| Entorno | Contrato estable y pruebas del flujo disponibles. |
| Respuesta | El caso de uso funciona sin importar el proveedor concreto. |
| Medida | Cero importaciones de SDK o infraestructura en dominio/aplicación; todas las pruebas del flujo y regresión acordadas aprobadas. |
| Verificación | Inspeccionar importaciones y ejecutar el mismo contrato con los adaptadores de prueba. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-09. Usabilidad: horario ocupado

| Elemento | Descripción |
|---|---|
| Atributo | AC09 |
| Fuente del estímulo | Cliente desde un teléfono. |
| Estímulo | Confirma un horario que acaba de ocuparse. |
| Artefacto | Pantalla y resultado del flujo de reserva. |
| Entorno | Pantalla móvil pequeña y respuesta de conflicto del servidor. |
| Respuesta | Explica el conflicto y permite elegir otro horario conservando la selección de servicios. |
| Medida | Todos los casos definidos muestran un mensaje textual y una acción para continuar, sin depender solo del color ni duplicar la solicitud. |
| Verificación | Revisar el flujo móvil con un conflicto simulado y comprobar navegación y selección. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-10. Historial: cambio de precio

| Elemento | Descripción |
|---|---|
| Atributo | AC10 |
| Fuente del estímulo | Administrador. |
| Estímulo | Modifica precios, nombres o políticas después de una reserva. |
| Artefacto | Datos históricos de la reserva y sus servicios. |
| Entorno | Reserva confirmada antes del cambio. |
| Respuesta | Presenta las condiciones conservadas para esa reserva. |
| Medida | 100 % de los campos históricos definidos mantiene sus valores tras modificar el catálogo o las políticas. |
| Verificación | Comparar reserva y servicios antes/después; revisar también cancelación y reprogramación. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## Resumen

| Escenario | Atributo | Qué se comprueba |
|---|---|---|
| EQ-01 | AC01 - Seguridad | Operaciones protegidas sin accesos indebidos. |
| EQ-02 | AC02 - Aislamiento | Separación de datos privados entre barberías. |
| EQ-03 | AC03 - Integridad | Confirmación atómica sin superposición. |
| EQ-04 | AC04 - Rendimiento | Tiempos de consulta bajo carga definida. |
| EQ-05 | AC05 - Disponibilidad | Continuidad de las operaciones principales. |
| EQ-06 | AC06 - Escalabilidad | Comportamiento al incrementar demanda. |
| EQ-07 | AC07 - Confiabilidad | Conservación del registro ante fallo externo. |
| EQ-08 | AC08 - Mantenibilidad | Sustitución de adaptadores y dependencias controladas. |
| EQ-09 | AC09 - Usabilidad | Recuperación clara ante un horario ocupado. |
| EQ-10 | AC10 - Historial | Conservación de condiciones de la reserva. |

Los atributos se definen en [atributos de calidad](04-atributos-de-calidad.md) y las respuestas de diseño en [decisiones arquitectónicas](07-decisiones-arquitectonicas.md).
