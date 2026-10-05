# Necesidad del negocio

## Contexto y problema

En Ayacucho-Huamanga, la atención en las barberías puede organizarse mediante llegada presencial, mensajes o registros manuales. El cliente no siempre conoce los horarios disponibles, los servicios ofrecidos ni qué profesional puede atenderlo. Esta situación genera esperas, desplazamientos innecesarios y dificultad para planificar una cita.

Para el establecimiento, la información dispersa dificulta coordinar horarios, gestionar cambios, evitar citas superpuestas y conocer el estado de atención y pago. Cuando participan varios profesionales, se necesita una agenda común con permisos definidos para cada responsabilidad.

App Barbería propone centralizar esta gestión y permitir que varios establecimientos utilicen una misma plataforma, conservando el aislamiento de sus datos privados.

## Objetivo general

Facilitar la programación de atenciones y la administración de barberías mediante una plataforma que permita consultar la oferta, reservar horarios y gestionar la operación de cada establecimiento con información consistente y acceso autorizado.

## Objetivos específicos

| ID | Objetivo | Beneficio esperado | Requisitos relacionados |
|---|---|---|---|
| ON01 | Facilitar la elección de barbería, servicio y profesional. | El cliente dispone de información antes de desplazarse. | RF06-RF10; RF43, RF44 como ampliaciones. |
| ON02 | Permitir reservar y gestionar citas con disponibilidad verificada. | Mejor planificación de la atención y menor riesgo de cruces. | RF11-RF14, RF18, RF19. |
| ON03 | Organizar la agenda y los recursos del establecimiento. | El personal conoce sus citas y el administrador coordina la operación. | RF20-RF24, RF26-RF36. |
| ON04 | Mantener información consistente de pagos e historial. | Se pueden consultar estados y condiciones de cada atención. | RF15-RF17, RF25, RF37, RF38. |
| ON05 | Proteger la información y los permisos de cada barbería. | Varios establecimientos comparten la plataforma sin acceso privado cruzado. | RF01-RF05, RF41, RF42. |
| ON06 | Informar a los participantes sobre eventos relevantes. | Se facilita el seguimiento de citas e invitaciones. | RF34, RF35, RF39, RF40. |

Los beneficios son resultados esperados del negocio. Este análisis no afirma una reducción de esperas o una mejora de ingresos ya medida.

## Participantes y valor

| Participante | Valor que recibe |
|---|---|
| Cliente | Consulta de oferta y disponibilidad, reserva y seguimiento de sus citas. |
| Barbero | Agenda organizada, gestión de disponibilidad y registro de atención. |
| Administrador de barbería | Gestión del establecimiento, personal, catálogo, horarios y pagos autorizados. |

Un usuario puede participar en más de una barbería. Los permisos se determinan por su relación activa con cada establecimiento; no se concede un rol global de administrador.

## Alcance y límites

El núcleo comprende identidad, perfiles, barberías, catálogo, barberos, horarios, reservas, atención, pagos manuales, membresías, invitaciones, favoritos y notificaciones internas. Las reseñas, mapas y carga de archivos se incorporarán por etapas.

Se admitirán efectivo y Yape con confirmación manual. La plataforma registra estas operaciones, pero no transfiere dinero ni emite comprobantes fiscales. No se incluyen una pasarela de pago, facturación electrónica, ERP o cobros por suscripción en esta versión.

El modelo SaaS multi-tenant describe el uso compartido de la plataforma por varios establecimientos; no supone que todos los datos sean visibles para todos.

## Cómo evaluar el resultado

| Aspecto | Evidencia que se propone recoger |
|---|---|
| Programación de citas | Reservas completadas y causas de abandono o rechazo del horario. |
| Conflictos de agenda | Intentos concurrentes rechazados y ausencia de reservas activas superpuestas. |
| Gestión operativa | Capacidad de cada rol para completar sus tareas en una evaluación del flujo. |
| Información histórica | Conservación de condiciones al modificar servicios o políticas. |
| Protección de datos | Pruebas de permisos por usuario, rol y establecimiento. |

Los criterios técnicos se detallan en [atributos de calidad](04-atributos-de-calidad.md). Los actores, historias y requisitos desarrollan esta necesidad del negocio sin confundir objetivos con garantías ya alcanzadas.