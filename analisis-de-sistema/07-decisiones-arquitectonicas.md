# Decisiones arquitectónicas

## Alcance y estado

Estas decisiones definen la propuesta de arquitectura de App Barbería para el laboratorio. Están **adoptadas para el diseño**; su presencia en el documento no implica que todos los mecanismos estén implementados o validados.

Un ADR (Architecture Decision Record) registra el contexto, la decisión, las alternativas y sus consecuencias. Se conserva su identificador cuando evoluciona y se documenta por qué se revisa.

La elección central es mantener Supabase, organizar por funcionalidades y aplicar Clean Architecture gradualmente. No se plantea construir una API Node.js para reproducir el ejemplo de clase.

## Resumen

| ID | Decisión | Drivers principales |
|---|---|---|
| [ADR-001](#adr-001) | Organización modular con Supabase como backend. | DA08, DA09, DA11 |
| [ADR-002](#adr-002) | Clean Architecture con adopción gradual. | DA09, DA11 |
| [ADR-003](#adr-003) | Presentación Expo y comunicación HTTPS mediante REST/RPC. | DA06, DA10 |
| [ADR-004](#adr-004) | Base y esquema compartidos con aislamiento por barbería. | DA01 |
| [ADR-005](#adr-005) | Identidad y autorización contextual en servidor. | DA01, DA06 |
| [ADR-006](#adr-006) | Reservas y cambios críticos mediante operaciones transaccionales. | DA02, DA03, DA04 |
| [ADR-007](#adr-007) | Preservación de condiciones históricas. | DA05 |
| [ADR-008](#adr-008) | Pagos manuales con permisos y estados definidos. | DA04 |
| [ADR-009](#adr-009) | Entrega externa separada y avisos internos consistentes. | DA07 |
| [ADR-010](#adr-010) | Contratos y adaptadores para las integraciones. | DA09, DA11 |
| [ADR-011](#adr-011) | Crecimiento y rendimiento guiados por mediciones. | DA03, DA08 |

<a id="adr-001"></a>

## ADR-001: Organización modular con Supabase como backend

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA08, DA09, DA11; AC06, AC08; RC02, RC09.

**Contexto.** Las capacidades de Barbería deben evolucionar con límites claros y una infraestructura operable por el proyecto.

**Decisión.** Conservar Supabase, organizar el código por funcionalidades y delimitar responsabilidades. No se introducirán microservicios de negocio ni una API propia Node.js en esta etapa.

**Alternativas consideradas.** API propia como monolito modular: permitiría centralizar reglas en un servidor propio, pero agrega despliegue y mantenimiento sin una necesidad identificada. Microservicios: agregan coordinación distribuida, comunicaciones y operación independientes que el alcance inicial no exige.

**Consecuencias.** Se aprovechan PostgreSQL, Auth y las funciones del backend. La modularidad debe demostrarse mediante contratos y límites, no solo carpetas. Existe dependencia de las interfaces y configuración del proveedor.

**Verificación y criterio de revisión.** Contratos de módulo definidos; accesos remotos encapsulados; ninguna operación requiere desplegar un microservicio nuevo. Revisar esta decisión si una necesidad concreta de proceso, control u operación no puede resolverse razonablemente con la estructura elegida.

<a id="adr-002"></a>

## ADR-002: Clean Architecture con adopción gradual

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA09, DA11; AC08; RC09.

**Contexto.** Las pantallas y los formatos de persistencia pueden acoplarse a las reglas si las funcionalidades crecen sin controlar importaciones.

**Decisión.** Organizar dominio, aplicación, presentación e infraestructura por módulo. Definir contratos en el interior e implementarlos con adaptadores. El dominio TypeScript no importará React Native, el SDK ni los tipos generados de Supabase.

**Alternativas consideradas.** Mantener llamadas y reglas en componentes: simplifica un primer flujo, pero mezcla responsabilidades. Reestructurar todo inmediatamente: añade riesgo y trabajo sin validar antes los contratos.

**Consecuencias.** La transición será por funcionalidades. Las reglas transaccionales que se mantengan en SQL siguen vinculadas a PostgreSQL; el enfoque no implica independencia tecnológica completa del backend. Los adaptadores transforman tipos externos a tipos internos sin crear fuentes contradictorias.

**Verificación y criterio de revisión.** Revisión de dependencias y pruebas de reglas puras, casos de uso y adaptadores. Revisar la estructura si añade capas sin una responsabilidad concreta.

<a id="adr-003"></a>

## ADR-003: Presentación Expo y comunicación HTTPS mediante REST/RPC

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA06, DA10; AC01, AC09; RC01, RC03.

**Contexto.** Clientes, barberos y administradores necesitan interfaces móviles y operaciones seguras sobre servicios remotos.

**Decisión.** Mantener Expo, React Native, Expo Router y TypeScript. La aplicación usará el SDK de Supabase encapsulado y sus interfaces HTTPS: consultas REST, RPC para funciones PostgreSQL e invocación de Edge Functions cuando corresponda.

**Alternativas consideradas.** Aplicaciones nativas separadas: duplican esfuerzo para el alcance actual. Conexión directa del dispositivo a PostgreSQL con credenciales administrativas: expone permisos incompatibles con un cliente público. API Node.js intermedia: requiere una justificación adicional.

**Consecuencias.** Android es la prioridad inicial; web e iOS se validan por etapas. La aplicación necesita manejar latencia, sesión, carga y errores. No se supone funcionamiento completo sin conexión.

**Verificación y criterio de revisión.** Los flujos presentan resultados recuperables y no contienen claves privilegiadas. Validar cada plataforma prevista antes de declararla soportada.

<a id="adr-004"></a>

## ADR-004: Base y esquema compartidos con aislamiento por barbería

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA01; AC02, AC06; RC04, RC05.

**Contexto.** Varios establecimientos deben operar en la misma plataforma sin acceder a la información privada de otros.

**Decisión.** Usar PostgreSQL compartido. Vincular datos de establecimiento a barbershop_id de forma directa o mediante relaciones verificables; validar también propiedad por usuario cuando corresponda.

**Alternativas consideradas.** Base por barbería: incrementa administración y migraciones. Esquema por barbería: multiplica objetos y coordinación. Son alternativas futuras solo si se justifican por aislamiento u operación.

**Consecuencias.** Las consultas y políticas deben verificar el contexto correcto. Un perfil global o una notificación personal no requiere artificialmente un barbershop_id; se protege mediante propiedad y relaciones. El catálogo público se distingue de datos privados.

**Verificación y criterio de revisión.** Pruebas de acceso cruzado, cambios de identificador y membresías en varios establecimientos; el administrador de A no obtiene privilegios sobre B.

<a id="adr-005"></a>

## ADR-005: Identidad y autorización contextual en servidor

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA01, DA06; AC01, AC02; RC05, RC06.

**Contexto.** La identidad autenticada no determina por sí sola qué reservas, pagos o barberías puede gestionar una persona.

**Decisión.** Utilizar Supabase Auth para identidad y sesión. Autorizar con usuario, recurso, membresía activa, rol y barbería. Aplicar permisos de tablas, RLS y comprobaciones en las funciones de servidor. Mantener secretos exclusivamente en entornos seguros.

**Alternativas consideradas.** Autorización solo en pantallas: el usuario puede modificar solicitudes. Rol administrativo global: no representa el alcance por establecimiento. Confiar solo en RLS dentro de funciones privilegiadas: no cubre automáticamente ejecuciones que eviten dichas políticas.

**Consecuencias.** Las funciones SECURITY DEFINER deben verificar identidad y autorización explícitamente, limitar permisos de ejecución y usar un search_path seguro. Google participa en identidad, no decide membresías. Es necesario revisar reglas al añadir recursos.

**Verificación y criterio de revisión.** Matriz de pruebas por rol y propiedad, llamadas sin sesión y usuarios de otra barbería. La negativa de acceso no revela datos privados.

<a id="adr-006"></a>

## ADR-006: Reservas y cambios críticos mediante operaciones transaccionales

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA02, DA03, DA04; AC03; RC02.

**Contexto.** Entre consultar disponibilidad y confirmar, otro cliente puede ocupar el mismo intervalo. Una reserva comprende varias escrituras relacionadas.

**Decisión.** Ejecutar confirmación, reprogramación, cancelación y cambios críticos mediante funciones de PostgreSQL con revalidación de permisos, estado y condiciones. Aplicar transacciones, bloqueos apropiados y restricciones de exclusión para intervalos activos, incluida la separación entre citas.

**Alternativas consideradas.** Validación únicamente en cliente: no resuelve concurrencia. Varias escrituras remotas independientes: pueden dejar reservas o pagos incompletos. Distribuir el flujo entre servicios: exige coordinación adicional para preservar consistencia.

**Consecuencias.** El servidor es la autoridad definitiva. El contrato de confirmación representa una operación atómica completa; no se divide en repositorios que escriben por separado desde el cliente. Las reglas conservadas en SQL requieren pruebas de integración.

**Verificación y criterio de revisión.** Solicitudes concurrentes y fallos inducidos: no se aceptan intervalos incompatibles ni escrituras parciales. Las consultas de disponibilidad son orientativas hasta la confirmación.

<a id="adr-007"></a>

## ADR-007: Preservación de condiciones históricas

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA05; AC10; RF17.

**Contexto.** El catálogo y las políticas pueden cambiar después de una reserva y alterar la interpretación de su precio o cancelación.

**Decisión.** Guardar las condiciones relevantes al confirmar: datos descriptivos, precios, duración, separación y políticas aplicables. Una reprogramación conserva o actualiza únicamente los datos que la regla de negocio permita.

**Alternativas consideradas.** Reconstruir todo desde el catálogo actual: modifica silenciosamente el historial. Versionar cada entidad completa: añade complejidad que no es necesaria para conservar las condiciones de una reserva.

**Consecuencias.** Existe duplicación intencional de datos históricos. Se definen reglas de actualización para no convertir estos valores en una copia sincronizada del catálogo; una corrección operativa debe estar justificada.

**Verificación y criterio de revisión.** Modificar servicios y políticas y consultar una reserva anterior; verificar sus condiciones y la conducta de reprogramación y cancelación.

<a id="adr-008"></a>

## ADR-008: Pagos manuales con permisos y estados definidos

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA04; AC03; RF15, RF25, RF37, RF38; RC07, RC08.

**Contexto.** El alcance admite efectivo y Yape, pero no un procesador financiero integrado.

**Decisión.** Registrar medio y estado de pago, confirmar recepción por personal autorizado y registrar reembolsos realizados fuera de la plataforma. Validar transición, reserva y permiso de quien actúa.

**Alternativas consideradas.** Pasarela automática: requiere integración, conciliación y manejo de operaciones externas fuera del alcance. Estado de pago libremente editable: pierde consistencia y control.

**Consecuencias.** Una selección de Yape o la visualización de un QR no confirma recepción. La plataforma no transfiere dinero ni emite comprobantes fiscales. El barbero solo confirma efectivo de atenciones propias autorizadas; el administrador gestiona las operaciones que le correspondan.

**Verificación y criterio de revisión.** Casos de confirmación duplicada, usuario no autorizado, cambios incompatibles y elegibilidad de reembolso. Una pasarela futura exigiría una decisión nueva.

<a id="adr-009"></a>

## ADR-009: Entrega externa separada y avisos internos consistentes

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA07; AC07; RF34, RF39, RF40; RC12.

**Contexto.** La comunicación con un proveedor puede fallar aunque la reserva o invitación sea válida.

**Decisión.** Ejecutar el envío de correo externo fuera de la transacción principal. Conservar los avisos internos que requieran consistencia con el evento y generar recordatorios mediante tareas programadas con deduplicación. Definir seguimiento y reintentos de entrega según la necesidad.

**Alternativas consideradas.** Enviar correo antes de confirmar: aumenta latencia y puede comunicar una operación que luego falla. Suponer que todos los avisos son asíncronos: no representa los registros internos que se escriben transaccionalmente.

**Consecuencias.** Los avisos internos incluidos en una transacción pueden hacerla fallar si no se guardan correctamente; esa atomicidad se mantiene. Una cola persistente de pendientes u outbox para entrega externa es una evolución propuesta, no una capacidad que se afirme implementada. Los reintentos deben evitar envíos repetidos.

**Verificación y criterio de revisión.** Simular un fallo del proveedor tras confirmar; verificar conservación del evento, resultado de envío y deduplicación de recordatorios. Un envío aceptado por la API no garantiza lectura del destinatario.

<a id="adr-010"></a>

## ADR-010: Contratos y adaptadores para las integraciones

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA09, DA11; AC08; RC12, RC13.

**Contexto.** Supabase, correo y mapas tienen interfaces y formatos propios que pueden cambiar.

**Decisión.** Definir contratos internos para operaciones necesarias y adaptadores concretos para servicios externos. Mantener los tipos generados y la configuración del proveedor en infraestructura. Incorporar reseñas, ubicación y archivos por etapas.

**Alternativas consideradas.** Importar proveedores desde cada pantalla o regla: dispersa dependencias. Abstraer todas las llamadas con interfaces genéricas sin casos de uso: añade complejidad sin un límite útil.

**Consecuencias.** Los contratos se basan en necesidades del negocio, como confirmar una reserva de forma atómica. El proveedor de mapas y la solución geoespacial quedan por evaluar; no se presenta PostGIS ni carga multimedia como implementados. Los adaptadores reducen el impacto de cambio, pero no eliminan todas las diferencias de proveedor.

**Verificación y criterio de revisión.** Cambiar un adaptador de prueba sin modificar el dominio; revisar conversiones de entrada, resultado y error. Las funcionalidades previstas deben conservar permisos y reglas propias.

<a id="adr-011"></a>

## ADR-011: Crecimiento y rendimiento guiados por mediciones

**Estado:** adoptada para la propuesta de diseño.

**Origen:** DA03, DA08; AC04, AC05, AC06; RC02, RC04.

**Contexto.** La carga depende de solicitudes simultáneas, consultas, volumen de datos y recursos; las cuentas registradas no bastan para estimarla.

**Decisión.** Medir tiempos, errores, consumo y consultas. Optimizar índices, filtros, paginación y políticas antes de aumentar recursos. Evaluar capacidad contratada y costos; considerar caché o réplicas solo para necesidades comprobadas.

**Alternativas consideradas.** Añadir caché desde el inicio: requiere invalidación y puede mostrar disponibilidad obsoleta. Adoptar microservicios por crecimiento supuesto: no corrige automáticamente consultas ni límites de la base. Prometer una cantidad de usuarios sin pruebas: no aporta evidencia.

**Consecuencias.** Los objetivos preliminares de AC04 y AC05 requieren validación. Las réplicas de lectura pueden tener retraso y no reciben escrituras; la confirmación y revalidación de reservas se realizan sobre la base principal. Escalar requiere recursos y presupuesto adecuados.

**Verificación y criterio de revisión.** Prueba de carga documentada con mezcla de operaciones y volumen representativos; medir percentil 95 y errores. Revisar la decisión cuando se identifique un cuello de botella que no se resuelva razonablemente con esta estrategia.

## Documentos relacionados

- [Drivers arquitectónicos](06-drivers-arquitectonicos.md).
- [Arquitectura inicial](../arquitectura/arquitectura-inicial.md).
- [Estilo arquitectónico](../arquitectura/estilo-arquitectonico.md).
- [Clean Architecture](../arquitectura/enfoque/enfoque-arquitectonico.md).
- [Trazabilidad y criterios de evaluación](../arquitectura/trazabilidad-arquitectonica.md).

## Sustento técnico

Las interfaces de servidor elegidas se apoyan en la [API de Supabase](https://supabase.com/docs/guides/api). Las [funciones de base de datos](https://supabase.com/docs/guides/database/functions) permiten encapsular operaciones cercanas a los datos; su configuración de seguridad exige revisar identidad y permisos.

Las tácticas de concurrencia se sustentan en las [restricciones de PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html). La dirección de dependencias se toma de la [referencia original de Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

El crecimiento se evaluará con la [guía de producción de Supabase](https://supabase.com/docs/guides/deployment/going-into-prod) y las características de sus [réplicas de lectura](https://supabase.com/docs/guides/platform/read-replicas); esto no constituye una garantía de capacidad del proyecto.
