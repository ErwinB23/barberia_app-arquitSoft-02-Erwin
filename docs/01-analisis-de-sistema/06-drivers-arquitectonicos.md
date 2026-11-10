# Drivers arquitectónicos

Los drivers son requisitos, atributos de calidad o restricciones cuya influencia obliga a tomar decisiones de arquitectura. No toda función constituye un driver: se seleccionan las que afectan límites, permisos, transacciones, comunicación, organización o evolución.

| ID | Driver arquitectónico | Origen | ¿Por qué influye en la arquitectura? | Respuesta inicial de diseño |
|---|---|---|---|---|
| DA01 | Operar varias barberías con separación de información y permisos contextuales. | RF25, RF26, RF37, RF41-RF43; AC01, AC02; RC04, RC05 | La confirmación de pagos, la gestión de imágenes y la publicación de reseñas requieren comprobar usuario, recurso y establecimiento; consultar contenido público no concede permiso para modificarlo. | Datos relacionados con barbershop_id, propiedad y membresías; RLS y comprobaciones de autorización en servidor. |
| DA02 | Evitar citas superpuestas incluso ante solicitudes concurrentes. | RF11, RF13, RF14; AC03 | La consulta de disponibilidad por sí sola no impide que dos solicitudes compitan por el mismo horario. | Revalidación al confirmar, transacciones y restricciones de exclusión de intervalos en PostgreSQL. |
| DA03 | Calcular disponibilidad a partir de varios calendarios y políticas. | RF10-RF12, RF22, RF27, RF33; AC04 | Requiere combinar duración, horarios, bloqueos, cierres y reservas de manera coherente. | Caso de uso de disponibilidad en servidor, con consultas e índices de PostgreSQL encapsulados en infraestructura. |
| DA04 | Mantener un ciclo consistente de atención y pago. | RF19, RF23-RF25, RF37, RF38; AC01, AC03; RC05, RC07 | El barbero asignado y el administrador pueden confirmar manualmente efectivo o Yape según permisos distintos; solicitudes simultáneas no deben confirmar dos veces el mismo pago. | Casos de uso de servidor para cambios de estado y pago; verificación de membresía, asignación y estado, con escritura atómica y registro de quién confirmó. |
| DA05 | Conservar las condiciones históricas de cada reserva. | RF17; AC10 | Cambios del catálogo o las políticas no deben alterar la interpretación de una atención pasada. | Copias de los datos relevantes y políticas al confirmar, asociadas a la reserva. |
| DA06 | Proteger identidad, sesiones y secretos en dispositivos cliente. | RF01-RF04, RF42; AC01; RC02, RC03, RC05, RC06 | El cliente no es una frontera suficiente de autorización y no puede almacenar claves privilegiadas. | Supabase Auth, HTTPS, comprobaciones de permisos en los casos de uso y funciones de servidor, y secretos en entornos seguros. |
| DA07 | Separar operaciones principales de comunicaciones secundarias. | RF34, RF39, RF40; AC07; RC12 | Un fallo de correo no debe borrar una invitación o revertir una reserva confirmada. | Conservar avisos internos consistentes y ejecutar el envío externo fuera de la transacción principal; definir reintentos y deduplicación cuando se necesiten. |
| DA08 | Responder y crecer conforme aumenten usuarios y establecimientos. | AC04, AC05, AC06; RC02, RC04 | Influye en consultas, recursos, monitoreo y límites de infraestructura. | Servicios administrados, índices, consultas acotadas y mediciones antes de ampliar capacidad. |
| DA09 | Gestionar reseñas, mapas e imágenes con límites funcionales y permisos definidos. | RF26, RF30, RF31, RF43, RF44; AC02, AC08; RC05, RC09, RC12, RC13 | Estas funciones forman parte del alcance y combinan datos públicos con escrituras autorizadas e integraciones externas. | Casos de uso y reglas de reseñas, ubicación y contenido visual; adaptadores de mapas y almacenamiento, con autorización por usuario y barbería. |
| DA10 | Ofrecer una experiencia móvil clara con acceso desde otras plataformas. | RF07, RF09, RF13; AC09; RC01 | Determina componentes, navegación y estados de interfaz para distintos dispositivos. | Expo/React Native, rutas centradas en navegación, lógica de negocio en casos de uso, componentes compartidos y validación por plataforma. |
| DA11 | Mantener reglas y casos de uso independientes de la interfaz y los proveedores desde el inicio. | AC08; RC02, RC09, RC10 | Las funcionalidades se construirán con Clean Architecture: el SDK, los tipos de persistencia y las pantallas no deben convertirse en dependencias del núcleo. | Dependencias hacia dominio y aplicación, contratos definidos por los casos de uso, adaptadores de cliente y servidor, composición y pruebas de reglas sin servicios externos. |

## Prioridades de diseño

| Prioridad | Drivers | Motivo |
|---|---|---|
| Alta | DA01, DA02, DA04, DA05, DA06, DA11 | Protegen acceso, integridad, estados e historial y fijan desde el inicio las dependencias del núcleo. |
| Media | DA03, DA07, DA08, DA09, DA10 | Orientan disponibilidad, comunicaciones, crecimiento, integraciones y experiencia de uso. |

Las prioridades orientan el orden de diseño y construcción, sin excluir requisitos del alcance. DA06 trata la seguridad de identidad y secretos; DA11 establece la regla de dependencias de Clean Architecture; DA09 incluye reseñas, mapas e imágenes desde la propuesta inicial.

La respuesta completa a cada driver se desarrolla en las [decisiones arquitectónicas](07-decisiones-arquitectonicas.md).
