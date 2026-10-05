# Restricciones


| ID | Restricción | Descripción | Tipo |
|---|---|---|---|
| RC01 | Aplicación móvil y acceso web | La presentación se desarrollará con Expo, React Native y TypeScript. Se priorizará Android; el acceso web y la incorporación de iOS se validarán por etapas. | Decisión técnica y alcance |
| RC02 | Backend administrado | Se mantendrá Supabase para autenticación y acceso a datos, funciones PostgreSQL para operaciones transaccionales y Edge Functions para integraciones de servidor cuando corresponda. Una API propia Node.js no forma parte de esta arquitectura inicial. | Decisión técnica |
| RC03 | Comunicación segura | La aplicación accederá a los servicios mediante HTTPS, utilizando el SDK de Supabase y las interfaces REST/RPC disponibles. No se conectará directamente a PostgreSQL con credenciales administrativas. | Técnica |
| RC04 | Persistencia compartida | Se utilizará PostgreSQL con base y esquema compartidos; los datos de cada establecimiento se relacionarán con su barbería. No se creará una base de datos por establecimiento en esta versión. | Técnica y alcance |
| RC05 | Autorización contextual | Los permisos profesionales y administrativos dependerán de la membresía activa y del recurso de la barbería. Se aplicarán RLS y validaciones seguras de servidor. | Seguridad |
| RC06 | Separación de secretos | La aplicación solo contendrá configuración pública adecuada para el cliente. Las claves privilegiadas y credenciales de correo se mantendrán exclusivamente en entornos de servidor. | Seguridad |
| RC07 | Medios de pago | Se admitirán efectivo y Yape con registro y confirmación manual por personal autorizado. No se integrará una pasarela financiera para cobros ni reembolsos automáticos. | Alcance |
| RC08 | Sin facturación ni ERP | No se incluye emisión fiscal, integración tributaria, contable ni con un ERP. Un resumen de reserva no equivale a un comprobante fiscal. | Alcance |
| RC09 | Diseño modular inicial | Se mantendrán módulos por funcionalidades y tres capas lógicas, con adopción gradual de Clean Architecture. No se adoptarán microservicios de negocio ni despliegue multirregional en esta primera propuesta. | Arquitectónica y alcance |
| RC10 | Versionamiento | Los documentos, código y migraciones se gestionarán con Git y un repositorio GitHub. Los cambios de esquema y permisos deberán quedar versionados. | Proyecto |
| RC11 | Contexto temporal y monetario | Los horarios de atención se interpretarán en America/Lima y los precios se expresarán en soles (PEN). Se almacenarán instantes de forma consistente para evitar conversiones ambiguas. | Negocio y técnica |
| RC12 | Integraciones delimitadas | Se contemplan Google para identidad, correo para invitaciones y acceso, y un proveedor de mapas por definir. Toda integración usará un punto de acceso controlado. | Alcance |
| RC13 | Evolución gradual | Reseñas, geolocalización y almacenamiento multimedia se incorporarán mediante módulos y adaptadores. Los requisitos de reseñas y mapas son parte del alcance previsto; push queda como posible evolución adicional. | Planificación |

## Interpretación de las restricciones

RC02 y RC09 son decisiones técnicas de esta propuesta, no obligaciones externas inmutables. Su revisión futura requerirá una necesidad comprobada y una actualización de los ADR relacionados.

Los recursos del proyecto Supabase y los límites de sus servicios se seleccionarán según carga, costo y operación. El uso de un proveedor administrado no elimina la responsabilidad de definir permisos, reglas, índices, transacciones y pruebas.

La dirección elegida sustituye la referencia a un backend propio Node.js de la propuesta original. Esta precisión se incorpora a la documentación del laboratorio; no presupone una modificación del PDF presentado anteriormente.
