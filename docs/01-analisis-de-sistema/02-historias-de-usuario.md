# Historias de usuario

| ID | Historia de usuario |
|---|---|
| HU01 | Como cliente, quiero crear una cuenta y confirmar mi correo, para acceder a la plataforma con una identidad verificable. |
| HU02 | Como cliente, quiero iniciar sesión con contraseña o Google y cerrar mi sesión, para acceder de forma controlada a mi cuenta. |
| HU03 | Como cliente, quiero recuperar y restablecer mi contraseña, para volver a acceder cuando olvide mis credenciales. |
| HU04 | Como cliente, quiero consultar y actualizar mi perfil, para mantener mis datos personales correctos. |
| HU05 | Como cliente, quiero buscar barberías y consultar sus servicios, estilos y profesionales, para elegir un establecimiento adecuado. |
| HU06 | Como cliente, quiero guardar barberías favoritas y definir una preferida, para encontrar rápidamente mis establecimientos habituales. |
| HU07 | Como cliente, quiero seleccionar servicios, estilos y un barbero específico o cualquiera disponible, para personalizar la atención que deseo reservar. |
| HU08 | Como cliente, quiero consultar fechas y horarios disponibles, para elegir una cita sin conflictos de atención. |
| HU09 | Como cliente, quiero confirmar una reserva y elegir efectivo o Yape, para programar mi atención y conocer el medio de pago registrado. |
| HU10 | Como cliente, quiero consultar mis próximas reservas, sus detalles y mi historial, para conocer mis citas y las condiciones de cada atención. |
| HU11 | Como cliente, quiero reprogramar una reserva conforme a las políticas, para adaptar mi cita a un cambio de disponibilidad. |
| HU12 | Como cliente, quiero cancelar una reserva y conocer las condiciones de reembolso, para liberar el horario y comprender el efecto de la cancelación. |
| HU13 | Como barbero, quiero consultar mi agenda, próximas atenciones e historial, para organizar mi jornada de trabajo. |
| HU14 | Como barbero, quiero gestionar mi perfil profesional, horarios y bloqueos, para mantener actualizada mi información y disponibilidad. |
| HU15 | Como barbero, quiero iniciar y completar una atención o registrar una inasistencia, para mantener actualizado el estado de las citas asignadas. |
| HU16 | Como barbero asignado a una cita, quiero verificar y confirmar manualmente la recepción de efectivo o Yape, para registrar correctamente el pago de esa atención. |
| HU17 | Como administrador de barbería, quiero registrar y actualizar los datos e imágenes de mi establecimiento y configurar sus políticas, para presentar su oferta y organizar su operación. |
| HU18 | Como administrador de barbería, quiero publicar, pausar, reanudar o retirar la publicación de mi barbería, para controlar su visibilidad y recepción de nuevas reservas. |
| HU19 | Como administrador de barbería, quiero gestionar servicios y estilos con precios, duración e imágenes que pueda cargar y actualizar, para mantener completo el catálogo de mi establecimiento. |
| HU20 | Como administrador de barbería, quiero gestionar barberos y asignarles servicios, para organizar al personal y las atenciones que puede realizar. |
| HU21 | Como administrador de barbería, quiero configurar horarios generales y cierres excepcionales, para delimitar cuándo puede operar la barbería. |
| HU22 | Como administrador de barbería, quiero invitar usuarios como barberos o administradores y cancelar invitaciones pendientes, para incorporar personal con los permisos adecuados. |
| HU23 | Como usuario invitado, quiero consultar, aceptar o rechazar una invitación, para decidir si me incorporo a una barbería. |
| HU24 | Como administrador de barbería, quiero consultar y filtrar la agenda del establecimiento, para supervisar reservas y estados de atención y pago. |
| HU25 | Como administrador de barbería, quiero configurar los datos de Yape, verificar y confirmar manualmente pagos en efectivo o Yape y registrar reembolsos autorizados, para controlar los pagos de las reservas de mi establecimiento. |
| HU26 | Como usuario, quiero consultar notificaciones, marcarlas como leídas y ocultarlas, para mantenerme informado sobre mis reservas e invitaciones. |
| HU27 | Como usuario con membresía, quiero acceder al espacio de cada barbería según mi responsabilidad, para operar con los permisos que me corresponden en cada establecimiento. |
| HU28 | Como cliente, quiero valorar una atención propia completada y consultar reseñas publicadas, para compartir mi experiencia y ayudar a otros clientes. |
| HU29 | Como cliente, quiero consultar barberías en un mapa y buscarlas por proximidad usando una ubicación que proporcione o autorice, para identificar establecimientos cercanos. |

## Consideraciones de alcance

Todas las historias forman parte del alcance de la propuesta, incluidas reseñas, mapas y carga de imágenes. El desarrollo puede organizarse por etapas sin que estas funciones se consideren opcionales. Las historias expresan necesidades de los usuarios; no afirman que las funciones ya estén implementadas o validadas.

En HU16, el barbero debe tener una membresía activa y estar asignado a la cita. HU16 y HU25 describen una comprobación y confirmación manual de la recepción del dinero; elegir el medio en HU09 no equivale a pagar. La aplicación no realiza ni verifica automáticamente transferencias de Yape. Los reembolsos de HU25 también registran una operación realizada fuera de la plataforma.

Los servicios externos apoyan las historias de los usuarios: Google interviene en HU02, el correo en HU01, HU03 y HU22, y mapas/geocodificación en HU29.
