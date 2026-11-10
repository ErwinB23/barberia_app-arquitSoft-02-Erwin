# Restricciones

| ID | Restricción | Descripción | Tipo |
|---|---|---|---|
| RC01 | Aplicación móvil y acceso web | La presentación se desarrollará con Expo, React Native y TypeScript. Se priorizará Android; el acceso web y la incorporación de iOS se validarán por etapas. | Decisión técnica y alcance |
| RC02 | Backend administrado | Se utilizará Supabase Auth para identidad, Edge Functions para los casos de uso que requieren ejecución en servidor y las integraciones seguras, y PostgreSQL para persistencia, permisos y operaciones atómicas. Las funciones SQL protegerán la integridad de los datos. No se desplegará una API propia Node.js. | Decisión técnica |
| RC03 | Comunicación segura | El cliente se comunicará mediante HTTPS a través de adaptadores: autenticación con Supabase Auth, consultas autorizadas mediante la API REST y operaciones críticas mediante Edge Functions. Estas podrán invocar funciones PostgreSQL por RPC para efectuar escrituras atómicas. El cliente no se conectará directamente a PostgreSQL ni utilizará credenciales administrativas. | Técnica |
| RC04 | Persistencia compartida | Se utilizará PostgreSQL con base y esquema compartidos; los datos de cada establecimiento se relacionarán con su barbería. No se creará una base de datos por establecimiento en esta versión. | Técnica y alcance |
| RC05 | Autorización contextual | Los permisos profesionales y administrativos dependerán de la membresía activa, el recurso y la barbería. El barbero solo podrá confirmar pagos de citas que tenga asignadas; el administrador actuará sobre su establecimiento. Reseñas e imágenes también tendrán controles de propiedad y acceso. Se aplicarán RLS y validaciones seguras de servidor. | Seguridad |
| RC06 | Separación de secretos | La aplicación solo contendrá configuración pública adecuada para el cliente. Las claves privilegiadas y credenciales de correo se mantendrán exclusivamente en entornos de servidor. | Seguridad |
| RC07 | Medios de pago | Se admitirán efectivo y Yape. El barbero con membresía activa y asignado a la cita, o un administrador autorizado de la barbería, verificará y confirmará manualmente la recepción. Elegir el medio no confirma el pago; los reembolsos solo registrarán operaciones realizadas fuera de la plataforma. No se integrará una pasarela financiera ni una verificación automática de transferencias. | Alcance |
| RC08 | Sin facturación ni ERP | No se incluye emisión fiscal, integración tributaria, contable ni con un ERP. Un resumen de reserva no equivale a un comprobante fiscal. | Alcance |
| RC09 | Clean Architecture desde el inicio | Cada funcionalidad separará desde su primera implementación las reglas y casos de uso de la presentación y los adaptadores que necesite, con dependencias de código hacia el núcleo. Los módulos por funcionalidad organizan esas responsabilidades dentro del estilo cliente-servidor y sus tres capas lógicas. No se adoptarán microservicios de negocio ni despliegue multirregional en la propuesta inicial. | Arquitectónica y alcance |
| RC10 | Versionamiento | Los documentos, código y migraciones se gestionarán con Git y un repositorio GitHub. Los cambios de esquema y permisos deberán quedar versionados. | Proyecto |
| RC11 | Contexto temporal y monetario | Los horarios de atención se interpretarán en America/Lima y los precios se expresarán en soles (PEN). Se almacenarán instantes de forma consistente para evitar conversiones ambiguas. | Negocio y técnica |
| RC12 | Integraciones delimitadas | Se contemplan Google para identidad, correo para invitaciones y acceso, almacenamiento de imágenes y un proveedor de mapas por definir. Cada integración se realizará mediante adaptadores; sus credenciales privadas permanecerán en servidor. | Alcance |
| RC13 | Alcance funcional completo | Reseñas, ubicación y búsqueda en mapas, y carga y gestión de imágenes forman parte de la propuesta. Su entrega puede planificarse por etapas, manteniendo Clean Architecture en cada funcionalidad desde su primera implementación. Las notificaciones push no están incluidas; los recordatorios previstos son internos. | Planificación |

## Interpretación de las restricciones

RC02 y RC09 son decisiones técnicas de esta propuesta, no obligaciones externas inmutables. Su revisión futura requerirá una necesidad comprobada y una actualización de los ADR relacionados.

Las Edge Functions coordinarán los casos de uso de servidor; PostgreSQL mantendrá las restricciones, políticas y operaciones atómicas indispensables para proteger los datos, incluidas las reservas concurrentes. La organización por funcionalidades no introduce un segundo enfoque arquitectónico.

Los recursos del proyecto Supabase y los límites de sus servicios se seleccionarán según carga, costo y operación. El uso de un proveedor administrado no elimina la responsabilidad de definir permisos, reglas, índices, transacciones y pruebas.
