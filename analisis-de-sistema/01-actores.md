# Actores del sistema

## Actores

| Actor | ¿Qué necesita realizar? |
|---|---|
| Cliente | Crear y gestionar su cuenta, explorar barberías, consultar servicios y profesionales, administrar favoritas, reservar, reprogramar o cancelar citas, consultar pagos e historial, recibir avisos y valorar una atención completada. |
| Barbero | Consultar su agenda, gestionar su perfil profesional, horarios y bloqueos, iniciar y finalizar atenciones, registrar inasistencias y confirmar pagos en efectivo de sus propias atenciones cuando tenga autorización. |
| Administrador de barbería | Registrar y administrar el establecimiento, gestionar catálogo y personal, asignar servicios, configurar horarios y políticas, administrar invitaciones, consultar reservas y confirmar pagos y reembolsos autorizados. |

## Servicios externos

| Actor externo | Interacción con el sistema | Consideración |
|---|---|---|
| Proveedor de identidad Google | Permitir el inicio de sesión mediante una cuenta Google. | Se integrará a través del servicio de autenticación. |
| Servicio de correo electrónico | Enviar invitaciones y comunicaciones por correo que correspondan. | Se contempla Resend para invitaciones y el mecanismo de correo de autenticación para confirmación y recuperación de acceso. |
| Servicio de mapas y geocodificación | Proporcionar mapas y convertir ubicaciones para facilitar la búsqueda de barberías. | Integración prevista; el proveedor queda por definir. |

## Roles y contexto de barbería

Un usuario podrá actuar como cliente y participar como barbero o administrador en uno o varios establecimientos. Las capacidades profesionales y administrativas dependerán de una membresía activa en la barbería correspondiente; no se asumirá que un rol concede acceso a toda la plataforma.

La visibilidad pública de una barbería y su catálogo se distinguirá del acceso a datos privados, como pagos, agenda operativa y membresías. Los administradores descritos pertenecen a establecimientos; este alcance no define un administrador global de la plataforma.