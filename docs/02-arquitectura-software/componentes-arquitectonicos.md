# Componentes arquitectónicos

## Propósito

Definir responsabilidades y colaboraciones de App Barbería. Los módulos representan capacidades del negocio; no servicios desplegados por separado.

## Diagrama

![Componentes internos de la aplicación Barbería y su relación con Supabase](../../img/nivel3-componentes.svg)

La vista detalla la aplicación Expo/React Native y mantiene los servicios de servidor fuera de ese contenedor. Es la misma vista que se desarrollará en el nivel C3, para no mantener dos diagramas distintos de los mismos componentes.

## Responsabilidades y origen

| Componente o grupo | Responsabilidad | Requisitos |
|---|---|---|
| Presentación y navegación | Mostrar pantallas por rol, recoger entradas y comunicar resultados. | RF07, RF09, RF16, RF20, RF36 |
| Identidad y contexto | Gestionar sesión, perfil y selección del espacio de barbería autorizado. | RF01-RF05, RF41, RF42 |
| Reservas y agenda | Coordinar disponibilidad, confirmación, cambios y atención de citas. | RF09-RF14, RF16-RF24 |
| Gestión de barbería | Administrar datos, publicación, catálogo, barberos, horarios e invitaciones. | RF26-RF36 |
| Capacidades de apoyo | Exploración, favoritos, pagos manuales, avisos e invitaciones del destinatario. | RF06-RF08, RF15, RF25, RF34, RF35, RF37-RF40 |
| Adaptadores de servicios | Convertir solicitudes y resultados entre contratos internos y Supabase o correo. | ADR-002, ADR-003, ADR-010 |
| Backend Supabase | Autenticar y ejecutar reglas definitivas, operaciones transaccionales y acceso protegido. | RF13, RF14, RF17, RF24, RF42 |

Los grupos simplifican la vista. Dentro de ellos se mantienen los módulos definidos en la [arquitectura inicial](arquitectura-inicial.md). Reseñas y ubicación se incorporarán como ampliaciones de RF43 y RF44.

## Colaboración principal

1. La pantalla de reserva recoge servicios, barbero, horario y medio de pago.
2. El caso de uso coordina la solicitud mediante un contrato.
3. El adaptador invoca la función de servidor con la sesión del usuario.
4. PostgreSQL verifica permisos y disponibilidad y confirma la operación completa.
5. La pantalla muestra confirmación, conflicto de horario o error recuperable.

## Reglas de colaboración

- Las pantallas no contienen SQL ni credenciales privilegiadas.
- Los casos de uso dependen de contratos; el SDK queda en los adaptadores.
- El servidor deriva el cliente de la sesión y la barbería del recurso autorizado.
- Reserva, servicios, condiciones históricas y datos de pago relacionados se guardan de forma atómica.
- Un fallo de correo externo no revierte una operación confirmada. Los avisos internos transaccionales conservan su atomicidad.

Estas reglas responden especialmente a DA01, DA02, DA04, DA06, DA07 y DA11.
