# Actores del sistema

## Actores

| Actor | ¿Qué necesita realizar? |
|---|---|
| Cliente | Crear y gestionar su cuenta, explorar barberías y sus ubicaciones en el mapa, consultar servicios, profesionales y reseñas, administrar favoritas, reservar, reprogramar o cancelar citas, elegir efectivo o Yape, consultar pagos e historial, recibir avisos y valorar sus atenciones completadas. |
| Barbero | Consultar su agenda, gestionar su perfil profesional, horarios y bloqueos, iniciar y finalizar atenciones, registrar inasistencias y verificar y confirmar manualmente pagos en efectivo o Yape de las citas que tiene asignadas, con membresía activa. |
| Administrador de barbería | Registrar y administrar su establecimiento, gestionar catálogo, imágenes de la oferta y personal, asignar servicios, configurar horarios y políticas, administrar invitaciones, consultar reservas y verificar y confirmar manualmente pagos en efectivo o Yape, además de registrar reembolsos autorizados de su barbería. |

## Servicios externos

| Actor externo | Interacción con el sistema | Consideración |
|---|---|---|
| Proveedor de identidad Google | Permitir el inicio de sesión mediante una cuenta Google. | Se integrará a través del servicio de autenticación. |
| Servicio de correo electrónico | Enviar invitaciones y comunicaciones por correo que correspondan. | Se contempla Resend para invitaciones y el mecanismo de correo de autenticación para confirmación y recuperación de acceso. |
| Servicio de mapas y geocodificación | Mostrar ubicaciones y facilitar la búsqueda de barberías por proximidad. | Forma parte del alcance del sistema; el proveedor concreto queda por definir. La ubicación del cliente se usa cuando la proporciona o autoriza. |

## Roles y contexto de barbería

Un usuario podrá actuar como cliente y participar como barbero o administrador en uno o varios establecimientos. Las capacidades profesionales y administrativas dependerán de una membresía activa en la barbería correspondiente; no se asumirá que un rol concede acceso a toda la plataforma.

La visibilidad pública de una barbería y su catálogo se distinguirá del acceso a datos privados, como pagos, agenda operativa y membresías. Los administradores descritos pertenecen a establecimientos; este alcance no define un administrador global de la plataforma.

La confirmación de un pago exige comprobar la recepción del dinero: seleccionar Yape o efectivo al reservar no cambia por sí solo el estado a pagado. Un barbero solo podrá confirmar pagos de citas que tenga asignadas; el administrador actuará sobre las reservas de su barbería según sus permisos. El cliente podrá publicar una reseña únicamente de una atención propia completada.
