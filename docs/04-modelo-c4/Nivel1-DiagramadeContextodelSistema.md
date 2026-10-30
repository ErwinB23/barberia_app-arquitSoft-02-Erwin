# C1. Contexto del sistema

## Alcance

Representa App Barbería como un único sistema de software y muestra quién lo utiliza y con qué sistemas externos se relaciona. El detalle interno se abre en C2.

![C1: contexto y relaciones de App Barbería](../../img/nivel1-contexto.svg)

## Elementos y relaciones

| Elemento | Tipo | Relación con App Barbería |
|---|---|---|
| Cliente | Persona | Consulta oferta y gestiona sus reservas; HU01-HU12. |
| Barbero | Persona | Gestiona su agenda y registra atenciones; HU13-HU16. |
| Administrador | Persona de una barbería | Administra catálogo, personal y pagos autorizados; HU17-HU25. |
| App Barbería | Sistema en estudio | Organiza oferta, disponibilidad, reservas, atención y pagos manuales. |
| Google | Sistema externo | Permite el acceso con una cuenta Google; RF02. |
| Servicio de correo | Sistema externo | Entrega invitaciones y mensajes de acceso; RF01, RF04 y RF34. |
| Servicio de mapas | Sistema externo previsto | Proporcionará mapas y ubicaciones; RF44. |

Las relaciones de cada persona se dibujan por separado para hacer visible su intención. Las flechas expresan uso o dependencia del sistema, no el sentido exclusivo de todos los datos de respuesta.

## Límites y notación

- Azul: personas; verde: sistema en estudio; gris: sistemas externos.
- Ámbar y trazo discontinuo en la relación de mapas: ampliación prevista.
- Una persona puede tener membresías en varias barberías. Cada membresía delimita el acceso privado; no se define un administrador global.
- Efectivo y Yape se registran y confirman manualmente. No se representa una pasarela financiera.

El alcance de App Barbería incluye las aplicaciones y la configuración, funciones y datos del backend administrado. Supabase se detalla en [C2: contenedores](Nivel2-DiagramadeContenedores.md), junto con las mismas dependencias externas.
