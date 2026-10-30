# C2. Contenedores

## Sistema que se abre

Esta vista abre **App Barbería**, el sistema de C1. Muestra aplicaciones, servicios gestionados y almacenamiento con límites de ejecución definidos. Un contenedor C4 puede ser una aplicación o almacén; no implica Docker ni microservicios de negocio.

![C2: aplicaciones, servicios gestionados y datos](../../img/nivel2-contenedores.svg)

Para leerlo, sigue las líneas azules desde móvil y las violetas desde web. Ambos clientes utilizan las conexiones **1: acceso e identidad**, **2: consultas y reservas** y **3: invitaciones**, explicadas debajo del diagrama. Son identificadores de relaciones, no pasos consecutivos. Los puentes indican que dos líneas se cruzan sin conectarse. El backend y sus integraciones se leen de izquierda a derecha; mapas queda separado como ampliación prevista.

## Contenedores y servicios

| Nombre del diagrama | Tecnología | Responsabilidad |
|---|---|---|
| Aplicación móvil | Expo, React Native, TypeScript | Presentación y coordinación por rol. Se prioriza Android. |
| Aplicación web | Expo / React Native Web, TypeScript | Acceso desde navegador, con validación por etapas. |
| Supabase Auth | Supabase Auth | Identidad, acceso y sesiones. |
| API de datos | PostgREST administrado por Supabase | Consultas REST y RPC con el contexto autorizado. |
| Función de correo | Supabase Edge Functions, TypeScript | Verifica la invitación y la autorización e integra su envío. |
| Base de datos | PostgreSQL y SQL | Datos de aplicación, reglas, transacciones, permisos y restricciones. |

Móvil y web pueden compartir código, pero se representan por separado porque se ejecutan en entornos diferentes. Los servicios Supabase pertenecen al alcance técnico de la solución y se agrupan como infraestructura administrada. La vista no pretende describir todos los procesos internos del proveedor.

## Relaciones principales

| Origen | Destino | Intención e interfaz |
|---|---|---|
| Ambos clientes | Supabase Auth | Autenticación y sesión por HTTPS. |
| Ambos clientes | API de datos | Consultar y confirmar operaciones mediante HTTPS, REST/RPC y sesión del usuario. |
| API de datos | Base de datos | Ejecutar SQL y funciones transaccionales. |
| Ambos clientes | Función de correo | Solicitar el envío de una invitación registrada por HTTPS. |
| Función de correo | API de datos | Consultar invitación, membresía y establecimiento antes de enviar. |
| Supabase Auth | Google | Delegar identidad mediante OAuth/HTTPS. |
| Supabase Auth | Servicio de correo | Enviar confirmación y recuperación por el mecanismo de correo configurado. |
| Función de correo | Servicio de correo | Enviar invitaciones con Resend mediante HTTPS. |
| Aplicación móvil, por etapas | Servicio de mapas | Consultar mapas y ubicaciones autorizadas por HTTPS. |

Los tres roles de C1 utilizan los clientes según sus permisos. La API rechaza accesos indebidos y PostgreSQL confirma la reserva y sus escrituras relacionadas dentro de una transacción. No se añaden API propia Node.js, pasarela automática ni caché inicial.

Los marcos discontinuos delimitan grupos. El acceso web se valida por etapas; mapas aparece en ámbar como ampliación. El siguiente nivel abre únicamente la [Aplicación móvil](Nivel3-Diagrama-de-Componentes.md).
