# C1. Contexto del sistema

## Objetivo

Mostrar App Barbería como un sistema completo: quién lo utiliza y con qué sistemas externos se comunica. Esta vista explica el negocio sin detallar tecnologías, bases de datos ni módulos internos.

![Contexto de App Barbería](../../img/nivel1-contexto.svg)

## Personas

| Persona | Qué necesita | Origen |
|---|---|---|
| Cliente | Explorar barberías, reservar, consultar y gestionar sus citas. | HU01-HU12 |
| Barbero | Organizar disponibilidad, consultar agenda y registrar atención y efectivo autorizado. | HU13-HU16 |
| Administrador de barbería | Gestionar establecimiento, oferta, personal, agenda y pagos autorizados. | HU17-HU25 |

Un usuario puede ser cliente y participar en varias barberías mediante membresías. No se define un administrador global de la plataforma.

## Sistema en alcance y externos

| Elemento | Responsabilidad | Relación con Barbería |
|---|---|---|
| App Barbería | Coordinar oferta, disponibilidad, reservas, atención y pagos manuales. | Sistema que se diseña. |
| Google | Proporcionar identidad externa. | Permite iniciar sesión mediante el servicio de autenticación; RF02. |
| Correo electrónico | Entregar mensajes al destinatario. | Invitaciones y comunicaciones de acceso; RF01, RF04, RF34. |
| Mapas, previsto | Mostrar ubicación y facilitar proximidad. | Ampliación de RF44; proveedor por definir. |

## Límites

La configuración y los datos del backend administrado forman parte de la solución y se detallan en C2. Google, la entrega de correo y mapas son servicios externos.

La elección de Yape no representa una integración con una pasarela: se registra y confirma manualmente junto con efectivo. Tampoco se incluyen ERP ni facturación fiscal.

La línea discontinua y el color ámbar identifican la integración prevista. El siguiente nivel es [C2: contenedores](Nivel2-DiagramadeContenedores.md).
