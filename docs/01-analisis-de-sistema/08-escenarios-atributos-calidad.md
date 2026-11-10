# Escenarios de atributos de calidad

Cada escenario concreta un atributo de calidad: quién origina una situación (fuente), qué ocurre (estímulo), qué parte del sistema se evalúa (artefacto), en qué condiciones (entorno), cómo debe actuar (respuesta) y qué resultado se medirá. Por ejemplo, dos clientes intentan reservar el mismo horario y se verifica que no queden citas superpuestas.

El percentil 95 (p95) es el tiempo dentro del cual responde el 95 % de las consultas medidas. Un p95 de 3 segundos significa que el 95 % respondió en 3 segundos o menos. Las medidas son metas de diseño por validar; no son resultados de pruebas ni garantías del proveedor. En rendimiento se medirán operaciones y solicitudes concurrentes, no solo cuentas registradas.

## Cómo se evaluarán los atributos

El atributo expresa una cualidad esperada; el escenario establece una situación y una medida para comprobarla. La herramienta ayuda a ejecutar la prueba y recoger evidencia. Por ejemplo, k6 puede generar consultas simultáneas y registrar cuánto tardan; el criterio de aceptación determina si esos tiempos cumplen la meta.

Este documento es un **plan de evaluación**. Las herramientas indicadas se proponen para las pruebas futuras; su inclusión aquí no significa que estén instaladas o que los escenarios ya se hayan ejecutado. La demostración de `tecnologia/barberia-clean-architecture` contiene pruebas locales con respuestas simuladas, que aportan evidencia limitada sobre el código del ejemplo.

### Herramientas y métodos, explicados

| Herramienta o método | ¿Para qué sirve? | Uso propuesto en App Barbería |
|---|---|---|
| k6 | Genera carga mediante usuarios virtuales que envían solicitudes. Registra tiempos de respuesta, cantidad de solicitudes y errores; permite definir límites para aprobar o rechazar una prueba. | Medir rendimiento con 100 usuarios y comparar etapas de carga en EQ-04 y EQ-06. Se probarán las API; no simula personas tocando pantallas. |
| pgTAP, ejecutado con Supabase CLI | Permite escribir comprobaciones SQL automáticas en PostgreSQL. La CLI de Supabase puede ejecutarlas contra la base local de pruebas y mostrar cuáles pasan o fallan. | Comprobar políticas RLS (seguridad a nivel de fila), funciones y datos en EQ-01, EQ-02, EQ-03 y EQ-10. Se complementa con solicitudes reales al backend para evaluar sesión y permisos. |
| Scripts de integración con Node.js y el cliente de Supabase | Son programas de prueba que llaman a los servicios con usuarios preparados y comparan respuestas y datos con el resultado esperado. Una prueba de integración comprueba la colaboración entre partes del sistema. | Probar Auth, Edge Functions, API de datos y PostgreSQL en permisos, reservas y pagos simultáneos, fallos de correo e historial. Node ejecuta las pruebas; no se añade una API Node al proyecto. |
| Pruebas locales con `node:test` y revisión de dependencias | El ejecutor de pruebas de Node permite comprobar funciones y casos de uso. Revisar dependencias consiste en verificar qué módulos importa cada archivo. | Probar reglas y casos de uso de cliente y servidor con adaptadores de prueba y comprobar sus dependencias en EQ-08. La demo de `tecnologia/` muestra esta separación con servicios simulados. |
| Grafana Synthetic Monitoring | Ejecuta comprobaciones programadas desde fuera del sistema y guarda éxitos, fallos y tiempos. Permite observar si una operación sigue disponible a lo largo del tiempo. | Supervisar autenticación, consulta de citas y una operación controlada de reservas en EQ-05; no basta comprobar que carga la página principal. |
| Maestro | Automatiza acciones sobre una aplicación móvil, como pulsar botones, introducir datos y comprobar mensajes. Permite probar recorridos completos del usuario (E2E). | Evaluar en Android los recorridos de reserva y consulta de ubicación de EQ-09. |
| Playwright | Automatiza recorridos y comprobaciones en un navegador web. Puede abrir la aplicación, completar formularios y comprobar el resultado mostrado. | Evaluar el mismo flujo en la versión web cuando se valide esa plataforma. Probar una web con tamaño de pantalla móvil no sustituye la prueba de la aplicación nativa. |
| Evaluación con usuarios y revisión manual de accesibilidad | Consiste en observar a personas realizando una tarea y revisar comprensión, controles, lectura y navegación. Complementa lo que comprueban los scripts. | Evaluar si se entiende el conflicto de horario y se puede continuar en EQ-09. |

### Preparación y evidencia común

- Utilizar un entorno de pruebas con dos barberías, clientes, barberos asignados y no asignados, administradores, reservas completadas e imágenes y reseñas de establecimientos distintos. Los accesos que se evalúan usan la sesión del usuario correspondiente; una clave administrativa no representa esos permisos.
- Registrar fecha, versión del sistema, datos iniciales, configuración y pasos. Para carga, indicar recursos, volumen de datos, duración, mezcla de operaciones y ritmo de solicitudes de cada usuario virtual.
- Comparar resultado esperado y observado. Guardar el reporte y las comprobaciones de datos, sin contraseñas, tokens ni información personal real.
- Marcar el escenario como validado solo cuando se ejecute y exista evidencia. Aprobar los casos definidos demuestra ese alcance de prueba; no garantiza ausencia de cualquier fallo posible.

## EQ-01. Seguridad: operación protegida

| Elemento | Descripción |
|---|---|
| Atributo | AC01 |
| Fuente del estímulo | Usuario sin sesión o sin permiso. |
| Estímulo | Intenta consultar una reserva ajena o confirmar un pago de una cita que no tiene asignada o de otra barbería. |
| Artefacto | Auth, Edge Functions, políticas y operaciones de reservas y pagos en PostgreSQL. |
| Entorno | Pruebas con roles y recursos definidos. |
| Respuesta | Rechaza la operación sin datos privados ni cambios. |
| Medida | 100 % de los intentos no autorizados del conjunto de prueba se rechaza; cero datos privados expuestos y cero pagos modificados por usuarios sin permiso. |
| Herramienta propuesta | Scripts de integración con Node.js y Supabase; pgTAP para las políticas y funciones. |
| Procedimiento | 1. Preparar dos clientes, un barbero asignado, otro no asignado y un administrador de la barbería. 2. Intentar leer una reserva ajena y confirmar su pago sin sesión, con otro cliente, con el barbero no asignado y desde otra barbería. 3. En casos separados con pagos pendientes, verificar que el barbero asignado y el administrador autorizado sí pueden confirmar manualmente efectivo o Yape. 4. Comparar respuestas, estado y registro de quién confirmó antes y después. |
| Evidencia | Matriz de casos permitidos y rechazados, resultados de pgTAP y comprobación de que no hubo lecturas privadas ni modificaciones indebidas. Una lectura bloqueada puede devolver cero filas; se verifica el contenido, no solo el código HTTP. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-02. Aislamiento entre barberías

| Elemento | Descripción |
|---|---|
| Atributo | AC02 |
| Fuente del estímulo | Administrador de la barbería A o cliente sin una atención propia completada. |
| Estímulo | Sustituye identificadores para gestionar datos o imágenes de B, o publicar una reseña vinculada a una atención ajena. |
| Artefacto | Membresías, propiedad de reservas, imágenes, reseñas, Edge Functions y políticas de acceso. |
| Entorno | Dos barberías con usuarios, reservas completadas, imágenes y reseñas diferentes. |
| Respuesta | Verifica barbería, usuario y recurso; deniega escrituras ajenas sin impedir la consulta de información publicada. |
| Medida | Cero lecturas privadas o modificaciones ajenas en todos los casos definidos; las lecturas públicas previstas siguen disponibles. |
| Herramienta propuesta | Scripts de integración con Node.js y Supabase, y pgTAP para RLS. |
| Procedimiento | 1. Crear datos privados, imágenes y atenciones completadas en A y B. 2. Con la sesión del administrador de A, cambiar identificadores para intentar leer datos privados y modificar imágenes de B. 3. Con un cliente distinto del dueño de una atención completada, intentar publicar una reseña para ella. 4. Verificar accesos legítimos del administrador en A, la reseña del cliente dueño y la consulta pública de contenido publicado. |
| Evidencia | Matriz de accesos A/B y propiedad, respuestas y comparación de datos e imágenes. Los intentos ajenos no deben modificar recursos ni exponer datos privados; las operaciones autorizadas deben funcionar. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-03. Integridad: reservas y pagos simultáneos

| Elemento | Descripción |
|---|---|
| Atributo | AC03 |
| Fuente del estímulo | Dos clientes autenticados; en otra prueba, barbero asignado y administrador autorizado. |
| Estímulo | Los clientes intentan reservar intervalos superpuestos; el barbero y el administrador intentan confirmar simultáneamente el mismo pago pendiente. |
| Artefacto | Casos de uso de servidor, operaciones atómicas de reserva y pago, y restricciones de PostgreSQL. |
| Entorno | Solicitudes concurrentes, horario inicialmente libre y, por separado, una reserva con pago pendiente. |
| Respuesta | Confirma como máximo una reserva incompatible y una sola transición del pago a pagado; rechaza la solicitud competidora sin escrituras parciales. |
| Medida | Cero reservas activas superpuestas, cero escrituras incompletas y exactamente una confirmación registrada por pago en las repeticiones acordadas. |
| Herramienta propuesta | Scripts de integración con Node.js y sesiones distintas de Supabase; pgTAP y consultas SQL para comprobar estado e integridad. |
| Procedimiento | 1. Preparar un intervalo libre y dos clientes. 2. Enviar solicitudes concurrentes mediante la Edge Function de reserva y repetir los casos acordados. 3. Preparar otra reserva con pago pendiente y enviar a la vez dos solicitudes de confirmación, una del barbero asignado y otra del administrador autorizado. 4. Provocar por separado un fallo controlado durante una escritura y verificar su reversión completa. |
| Evidencia | Respuestas de las solicitudes, reservas activas, estado e historial del pago y datos relacionados. Debe existir como máximo una reserva incompatible y una sola confirmación del pago; el fallo inducido no debe dejar escrituras parciales. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-04. Rendimiento: consulta de disponibilidad

| Elemento | Descripción |
|---|---|
| Atributo | AC04 |
| Fuente del estímulo | Clientes. |
| Estímulo | Consultan catálogo, horarios y reservas al mismo tiempo. |
| Artefacto | Consultas principales y caso de uso de disponibilidad en servidor. |
| Entorno | 100 usuarios concurrentes; datos, red y recursos de prueba documentados. |
| Respuesta | Devuelve resultados y errores controlados. |
| Medida | Meta por validar: percentil 95 de las consultas de como máximo 3 segundos y menos de 1 % de errores técnicos durante 10 minutos. Se excluyen interacción humana y mapas externos. |
| Herramienta propuesta | k6, para generar solicitudes y medir tiempos y errores; métricas del backend para explicar el consumo. |
| Procedimiento | 1. Definir consultas de catálogo, disponibilidad y reservas con datos representativos. 2. Preparar sesiones y una etapa de calentamiento. 3. Mantener 100 usuarios virtuales durante 10 minutos de medición. 4. Comparar el percentil 95 y la proporción de errores técnicos con la meta. Medir por cada operación principal para que una consulta rápida no oculte otra lenta. |
| Evidencia | Script y reporte de k6 con usuarios, solicitudes, percentil 95, errores y configuración. Registrar el tiempo completo observado por el cliente de prueba, incluidos conexión y recepción; http_req_duration por sí solo no incluye todo el establecimiento de conexión. La prueba mide la API, no el tiempo de renderizado de la pantalla. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-05. Disponibilidad: acceso a citas

| Elemento | Descripción |
|---|---|
| Atributo | AC05 |
| Fuente del estímulo | Usuario. |
| Estímulo | Intenta autenticarse y consultar o gestionar sus citas. |
| Artefacto | Auth, consultas de citas y Edge Function de reserva. |
| Entorno | Servicio publicado y observación mensual con monitoreo. |
| Respuesta | Atiende el flujo o comunica una interrupción recuperable. |
| Medida | Meta por validar: disponibilidad mensual de al menos 99,5 % del flujo supervisado; registrar también mantenimientos e interrupciones. |
| Herramienta propuesta | Grafana Synthetic Monitoring, con comprobaciones programadas del flujo de acceso y consulta. |
| Procedimiento | 1. Configurar una cuenta y una barbería de prueba para comprobar autenticación, consulta y una operación controlada de reservas, con limpieza de sus datos y límite de respuesta documentado. 2. Ejecutar comprobaciones programadas durante un mes completo. 3. Registrar interrupciones y mantenimientos. 4. Estimar tiempo disponible a partir de los intervalos supervisados y calcular tiempo disponible dividido entre tiempo observado, multiplicado por 100. Informar por separado los intervalos sin datos. |
| Evidencia | Historial de comprobaciones, periodo e intervalos de observación, interrupciones y cálculo mensual. La meta es al menos 99,5 %. Una ejecución aislada o una prueba de pocos minutos no valida el objetivo mensual. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-06. Escalabilidad: aumento de demanda

| Elemento | Descripción |
|---|---|
| Atributo | AC06 |
| Fuente del estímulo | Mayor cantidad de clientes y barberías. |
| Estímulo | Crece la carga de consultas y confirmaciones. |
| Artefacto | Edge Functions, API de datos, PostgreSQL, consultas e índices. |
| Entorno | Prueba por etapas de 25, 50 y 100 usuarios concurrentes, con volumen y recursos registrados. |
| Respuesta | Soporta la carga objetivo o identifica qué recurso debe ampliarse. |
| Medida | Meta por validar en la etapa de 100 usuarios: percentil 95 de como máximo 3 segundos en consultas, menos de 1 % de errores técnicos y cero pérdidas de integridad. Los rechazos esperados por conflicto no son errores técnicos. |
| Herramienta propuesta | k6 para aumentar la carga; métricas de CPU, conexiones y consultas disponibles en el backend. |
| Procedimiento | 1. Ejecutar etapas de 25, 50 y 100 usuarios virtuales con la misma mezcla de operaciones y ritmo por usuario. 2. Medir 10 minutos por etapa después del calentamiento. 3. Comparar tiempos, errores y recursos. 4. Si no se cumple la meta, optimizar consultas o ampliar recursos y repetir la carga equivalente. 5. Comprobar que las reservas siguen siendo consistentes. |
| Evidencia | Tabla comparativa por etapa y, si hay ajustes, antes y después; reportes de carga y consultas de integridad. Separar conflictos de horario esperados de errores técnicos. Llegar a 100 usuarios demuestra la capacidad ensayada, no crecimiento ilimitado. |
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
| Herramienta propuesta | Script de integración con Node.js y un fallo controlado en el adaptador de correo. |
| Procedimiento | 1. Registrar una invitación. 2. Hacer que el envío devuelva un error en el entorno de pruebas. 3. Consultar la invitación y el resultado comunicado. 4. Reintentar el envío de esa misma invitación. 5. Verificar que no se crea otro registro. |
| Evidencia | Identificador de la invitación antes y después, respuesta del envío y recuento de registros tras el reintento. Un fallo simulado evalúa el comportamiento del sistema; la entrega real del correo requiere otra prueba con el proveedor. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-08. Mantenibilidad: reglas y adaptadores independientes

| Elemento | Descripción |
|---|---|
| Atributo | AC08 |
| Fuente del estímulo | Desarrollador. |
| Estímulo | Sustituye el adaptador HTTP de reservas del cliente o el de persistencia del servidor por implementaciones de prueba; también cambia una regla de reseñas o un proveedor de mapas. |
| Artefacto | Dominio, casos de uso, contratos y adaptadores de funcionalidades del cliente y del servidor. |
| Entorno | Funcionalidades construidas con contratos y pruebas de regresión disponibles. |
| Respuesta | Las reglas y casos de uso funcionan sin importar SDK, interfaz, base de datos ni proveedor concreto; el cambio se concentra en la funcionalidad y el adaptador correspondientes. |
| Medida | Cero importaciones de presentación, SDK o infraestructura en dominio y aplicación de las funcionalidades revisadas; todas sus pruebas y las de regresión acordadas aprobadas. |
| Herramienta propuesta | node:test para pruebas unitarias de reglas y casos de uso, y revisión automatizada de importaciones de cliente y servidor. |
| Procedimiento | 1. Probar `SolicitarReserva` con una implementación de prueba de `ReservaRemotaGateway`, sin HTTP ni Supabase. 2. Probar `ConfirmarReserva` con una implementación de prueba de `ReservaAtomicaGateway`, sin PostgreSQL. 3. Sustituir un adaptador de mapas o imágenes y comprobar que las reglas correspondientes no cambian. 4. Revisar las importaciones de las funcionalidades construidas y ejecutar sus pruebas de regresión. |
| Evidencia | Reportes separados de pruebas del cliente y del servidor, adaptadores de prueba y listado de importaciones revisadas. La demo de `tecnologia/` prueba los casos de uso y contratos de ejemplo, pero no sustituye las pruebas de los componentes reales ni demuestra permisos o transacciones en Supabase. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## EQ-09. Usabilidad: horario ocupado y consulta de ubicación

| Elemento | Descripción |
|---|---|
| Atributo | AC09 |
| Fuente del estímulo | Cliente desde un teléfono. |
| Estímulo | Confirma un horario que acaba de ocuparse o consulta barberías cercanas sin autorizar la ubicación del dispositivo. |
| Artefacto | Pantallas de reserva y exploración por ubicación. |
| Entorno | Pantalla móvil pequeña, respuesta de conflicto del servidor o ubicación no autorizada. |
| Respuesta | Explica el conflicto y permite elegir otro horario conservando los servicios; en el mapa, ofrece consultar ubicaciones o introducir una referencia sin exigir acceso a la ubicación del dispositivo. |
| Medida | Todos los casos definidos muestran información textual y una acción para continuar, sin depender solo del color, duplicar la reserva ni exigir un permiso de ubicación. |
| Herramienta propuesta | Maestro para Android; Playwright para la versión web cuando corresponda; observación con usuarios y revisión manual de accesibilidad. |
| Procedimiento | 1. Forzar una respuesta de horario ocupado y comprobar mensaje, conservación de servicios y opción de elegir otro horario sin reenvío automático. 2. Denegar el permiso de ubicación y comprobar que se pueden consultar las barberías con información textual y una ubicación proporcionada por el cliente. 3. Automatizar ambos recorridos y pedir a participantes definidos que continúen sin ayuda. 4. Revisar controles táctiles, lectura con ayudas de accesibilidad y significado independiente del color. |
| Evidencia | Reportes y capturas o grabaciones de ambos flujos, comprobación de solicitudes y ficha de observación. Registrar cuántos participantes comprenden los mensajes y completan las tareas, con sus dificultades. La muestra y el umbral de esa evaluación se definirán antes de ejecutarla; la automatización por sí sola no demuestra facilidad de uso. |
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
| Herramienta propuesta | Script de integración con Node.js y Supabase; pgTAP o consultas SQL para comparar los datos históricos. |
| Procedimiento | 1. Confirmar una reserva y guardar sus condiciones. 2. Cambiar nombre, precio y políticas del catálogo. 3. Consultar la reserva con la sesión autorizada. 4. Comparar los campos históricos definidos. 5. Evaluar cancelación y reprogramación conforme a las reglas de conservación. |
| Evidencia | Comparación de los valores originales y posteriores de la reserva y sus servicios, con reporte de pruebas. Deben conservarse todos los campos históricos definidos, aunque el catálogo muestre valores nuevos. |
| Estado | Propuesto; pendiente de definir el conjunto final de pruebas y validar la medida. |

## Resumen

| Escenario | Atributo | Qué se comprueba |
|---|---|---|
| EQ-01 | AC01 - Seguridad | Operaciones protegidas sin accesos indebidos. |
| EQ-02 | AC02 - Aislamiento | Separación de datos privados entre barberías. |
| EQ-03 | AC03 - Integridad | Reservas sin superposición y pago confirmado una sola vez. |
| EQ-04 | AC04 - Rendimiento | Tiempos de consulta bajo carga definida. |
| EQ-05 | AC05 - Disponibilidad | Continuidad de las operaciones principales. |
| EQ-06 | AC06 - Escalabilidad | Comportamiento al incrementar demanda. |
| EQ-07 | AC07 - Confiabilidad | Conservación del registro ante fallo externo. |
| EQ-08 | AC08 - Mantenibilidad | Reglas y casos de uso independientes de proveedores en cliente y servidor. |
| EQ-09 | AC09 - Usabilidad | Recuperación ante horario ocupado y ubicación accesible sin permiso del dispositivo. |
| EQ-10 | AC10 - Historial | Conservación de condiciones de la reserva. |

Los atributos se definen en [atributos de calidad](04-atributos-de-calidad.md) y las respuestas de diseño en [decisiones arquitectónicas](07-decisiones-arquitectonicas.md).

## Referencias de las herramientas

- [k6: criterios de aprobación de pruebas de carga](https://grafana.com/docs/k6/latest/using-k6/thresholds/).
- [Supabase: pruebas de políticas RLS con pgTAP](https://supabase.com/docs/guides/database/postgres/testing-row-level-security).
- [Grafana: monitoreo mediante comprobaciones programadas](https://grafana.com/docs/grafana-cloud/observe-and-act/testing/synthetic-monitoring/introduction/).
- [Expo: pruebas E2E con Maestro](https://docs.expo.dev/eas/workflows/examples/e2e-tests/).
- [Playwright: pruebas E2E para aplicaciones web](https://playwright.dev/docs/intro).
