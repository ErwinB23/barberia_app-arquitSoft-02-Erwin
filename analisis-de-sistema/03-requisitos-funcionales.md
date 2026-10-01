# Requisitos funcionales

## Requisitos funcionales del sistema

| ID | Requisito funcional | Historia de origen |
|---|---|---|
| RF01 | El sistema debe permitir el registro mediante correo y contraseña y la confirmación del correo. | HU01 |
| RF02 | El sistema debe permitir iniciar sesión mediante correo y contraseña o Google y cerrar la sesión. | HU02 |
| RF03 | El sistema debe mantener la sesión mientras sea válida y gestionar su renovación o finalización. | HU02 |
| RF04 | El sistema debe permitir solicitar recuperación de acceso y restablecer la contraseña. | HU03 |
| RF05 | El sistema debe permitir consultar y actualizar los datos del perfil personal. | HU04 |
| RF06 | El sistema debe permitir listar y buscar barberías visibles mediante criterios de búsqueda. | HU05 |
| RF07 | El sistema debe permitir consultar el detalle de una barbería, su catálogo, estilos, barberos y horarios publicados. | HU05 |
| RF08 | El sistema debe permitir agregar y quitar barberías favoritas y establecer una como preferida. | HU06 |
| RF09 | El sistema debe permitir seleccionar uno o varios servicios y un estilo opcional asociado a cada servicio. | HU07 |
| RF10 | El sistema debe permitir elegir un barbero específico o cualquiera disponible que realice todos los servicios seleccionados. | HU07 |
| RF11 | El sistema debe calcular y mostrar disponibilidad considerando horarios generales e individuales, cierres, bloqueos, reservas activas, duración de los servicios y separación entre citas. | HU08 |
| RF12 | El sistema debe aplicar anticipación mínima, horizonte máximo y límite de reservas futuras activas antes de confirmar una cita. | HU08, HU09 |
| RF13 | El sistema debe crear una reserva para el cliente autenticado después de validar nuevamente la disponibilidad, los servicios y el barbero seleccionado. | HU09 |
| RF14 | El sistema debe impedir la superposición de reservas activas de un mismo barbero, incluso ante solicitudes simultáneas. | HU08, HU09, HU11 |
| RF15 | El sistema debe permitir seleccionar efectivo o Yape y mostrar los datos de pago que correspondan, sin procesar automáticamente el cobro. | HU09 |
| RF16 | El sistema debe permitir consultar próximas reservas, detalle, estado de atención, estado de pago e historial del cliente. | HU10 |
| RF17 | El sistema debe conservar en cada reserva los nombres, precios, duración y políticas relevantes vigentes al confirmarla para preservar su historial. | HU10 |
| RF18 | El sistema debe permitir reprogramar una reserva validando disponibilidad, límites de reprogramación y condiciones aplicables. | HU11 |
| RF19 | El sistema debe permitir cancelar una reserva, identificar cancelaciones tardías y determinar la elegibilidad de reembolso según la política conservada. | HU12 |
| RF20 | El sistema debe permitir al barbero consultar su agenda diaria, próximas citas, historial, detalle operativo y resumen de actividad. | HU13 |
| RF21 | El sistema debe permitir actualizar el perfil profesional propio dentro de los permisos de la membresía. | HU14 |
| RF22 | El sistema debe permitir gestionar intervalos de trabajo y bloqueos del barbero respetando los horarios de la barbería y las reservas comprometidas. | HU14 |
| RF23 | El sistema debe permitir iniciar y completar atenciones asignadas y registrar inasistencia después del tiempo de tolerancia establecido. | HU15 |
| RF24 | El sistema debe validar las transiciones entre confirmada, en atención, completada, cancelada y no asistió, y rechazar cambios incompatibles con el ciclo de la reserva. | HU15 |
| RF25 | El sistema debe permitir al barbero autorizado confirmar pagos en efectivo de las reservas que le corresponden. | HU16 |
| RF26 | El sistema debe permitir registrar una barbería y actualizar sus datos generales. | HU17 |
| RF27 | El sistema debe permitir configurar políticas de reserva, separación entre citas, reprogramación, cancelación y tolerancia de inasistencia. | HU17 |
| RF28 | El sistema debe permitir publicar, pausar, reanudar y retirar la publicación de una barbería; una barbería pausada podrá seguir visible, pero no admitirá nuevas reservas. | HU18 |
| RF29 | El sistema debe validar los datos y recursos mínimos de operación antes de publicar: contacto, dirección, horario general, servicio activo y barbero activo con horario. | HU18 |
| RF30 | El sistema debe permitir registrar, actualizar y desactivar servicios, indicando nombre, descripción, precio y duración. | HU19 |
| RF31 | El sistema debe permitir registrar, actualizar y desactivar estilos asociados a los servicios, con descripción e imagen de referencia. | HU19 |
| RF32 | El sistema debe permitir gestionar perfiles de barberos asociados a membresías y asignar o retirar servicios con protección de las reservas comprometidas. | HU20 |
| RF33 | El sistema debe permitir gestionar los intervalos generales de atención y registrar cierres excepcionales del establecimiento. | HU21 |
| RF34 | El sistema debe permitir enviar invitaciones a barberos o administradores, consultar su estado y cancelar las pendientes; el canal podrá ser interno o correo. | HU22 |
| RF35 | El sistema debe permitir al destinatario consultar, aceptar o rechazar invitaciones válidas y actualizar su membresía al aceptarlas. | HU23 |
| RF36 | El sistema debe permitir consultar la agenda administrativa y filtrar reservas por barbero, estado de atención y estado de pago. | HU24 |
| RF37 | El sistema debe permitir configurar los datos de Yape y confirmar pagos en efectivo o Yape por el administrador autorizado. | HU25 |
| RF38 | El sistema debe permitir registrar reembolsos autorizados y mantener estados de pago pendiente, pagado, reembolsado o fallido, según corresponda. | HU25 |
| RF39 | El sistema debe generar notificaciones internas ante eventos de reservas e invitaciones y recordatorios próximos a la atención. | HU26 |
| RF40 | El sistema debe permitir consultar el centro de notificaciones, marcar lectura, ocultar avisos y navegar al contexto relacionado cuando exista permiso. | HU26 |
| RF41 | El sistema debe permitir que un usuario participe en varias barberías y acceda a sus espacios según las membresías activas. | HU27 |
| RF42 | El sistema debe autorizar cada operación profesional o administrativa según usuario, recurso y barbería, e impedir accesos a información privada de otros establecimientos. | HU27 |
| RF43 | El sistema debe permitir registrar una reseña y calificación vinculada a una atención completada del propio cliente y consultar las valoraciones publicadas. | HU28 |
| RF44 | El sistema debe permitir registrar la ubicación del establecimiento, visualizarla en un mapa y buscar barberías por proximidad usando una ubicación proporcionada o autorizada por el cliente. | HU29 |

## Relación entre historias y requisitos funcionales

| Historia de usuario | Requisitos funcionales relacionados |
|---|---|
| HU01 | RF01 |
| HU02 | RF02, RF03 |
| HU03 | RF04 |
| HU04 | RF05 |
| HU05 | RF06, RF07 |
| HU06 | RF08 |
| HU07 | RF09, RF10 |
| HU08 | RF11, RF12, RF14 |
| HU09 | RF12, RF13, RF14, RF15 |
| HU10 | RF16, RF17 |
| HU11 | RF14, RF18 |
| HU12 | RF19 |
| HU13 | RF20 |
| HU14 | RF21, RF22 |
| HU15 | RF23, RF24 |
| HU16 | RF25 |
| HU17 | RF26, RF27 |
| HU18 | RF28, RF29 |
| HU19 | RF30, RF31 |
| HU20 | RF32 |
| HU21 | RF33 |
| HU22 | RF34 |
| HU23 | RF35 |
| HU24 | RF36 |
| HU25 | RF37, RF38 |
| HU26 | RF39, RF40 |
| HU27 | RF41, RF42 |
| HU28 | RF43 |
| HU29 | RF44 |

## Delimitaciones

- RF43 y RF44 describen reseñas y geolocalización como capacidades previstas para una incorporación gradual.
- La confirmación y el reembolso de pagos registran una operación realizada por el personal; no transfieren dinero ni constituyen facturación electrónica.
- Los recordatorios se plantean inicialmente como notificaciones internas. Push no es un requisito de esta primera versión.
- La elección de cualquier barbero disponible debe producir una reserva asignada a un profesional concreto al confirmar.

