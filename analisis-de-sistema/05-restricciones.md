# Restricciones


| ID | Restricción | Descripción | Tipo |
|---|---|---|---|
| RC01 | Aplicación móvil y acceso web | La presentación se desarrollará con Expo, React Native y TypeScript. Se priorizará Android; el acceso web y la incorporación de iOS se validarán por etapas. | Decisión técnica y alcance |
| RC02 | Backend administrado | Se empleará Supabase para autenticación y acceso a datos, funciones PostgreSQL para operaciones transaccionales y Edge Functions cuando se necesite lógica de servidor para integraciones. | Decisión técnica |
| RC03 | Comunicación segura | La aplicación accederá a los servicios mediante HTTPS, utilizando el SDK de Supabase y las interfaces REST/RPC disponibles. No se conectará directamente a PostgreSQL con credenciales administrativas. | Técnica |
| RC04 | Persistencia compartida | Se utilizará PostgreSQL con base y esquema compartidos; los datos de cada establecimiento se relacionarán con su barbería. No se creará una base de datos por establecimiento en esta versión. | Técnica y alcance |
| RC05 | Autorización contextual | Los permisos profesionales y administrativos dependerán de la membresía activa y del recurso de la barbería. Se aplicarán RLS y validaciones seguras de servidor. | Seguridad |
| RC06 | Separación de secretos | La aplicación solo contendrá configuración pública adecuada para el cliente. Las claves privilegiadas y credenciales de correo se mantendrán exclusivamente en entornos de servidor. | Seguridad |
| RC07 | Medios de pago | Se admitirán efectivo y Yape con registro y confirmación manual por personal autorizado. No se integrará una pasarela financiera para cobros ni reembolsos automáticos. | Alcance |
| RC08 | Sin facturación ni ERP | No se incluye emisión fiscal, integración tributaria, contable ni con un ERP. Un resumen de reserva no equivale a un comprobante fiscal. | Alcance |
| RC09 | Diseño modular inicial | Se mantendrá una organización por funcionalidades y tres capas lógicas. No se adoptarán microservicios independientes ni despliegue multirregional en esta primera propuesta. | Arquitectónica y alcance |
| RC10 | Versionamiento | Los documentos, código y migraciones se gestionarán con Git y un repositorio GitHub. Los cambios de esquema y permisos deberán quedar versionados. | Proyecto |
| RC11 | Contexto temporal y monetario | Los horarios de atención se interpretarán en America/Lima y los precios se expresarán en soles (PEN). Se almacenarán instantes de forma consistente para evitar conversiones ambiguas. | Negocio y técnica |
| RC12 | Integraciones delimitadas | Se contemplan Google para identidad, correo para invitaciones y acceso, y un proveedor de mapas por definir. Toda integración usará un punto de acceso controlado. | Alcance |
| RC13 | Evolución gradual | Reseñas, geolocalización y almacenamiento multimedia se incorporarán mediante módulos y adaptadores. Los requisitos de reseñas y mapas son parte del alcance previsto; push queda como posible evolución adicional. | Planificación |


