# Estilo arquitectónico

## Estilo seleccionado

**Cliente-servidor con tres capas lógicas, organización modular por funcionalidades y Supabase como backend administrado (BaaS).**

**Diagrama**

![Vista general de los componentes y sus relaciones](../../img/componentes-y-relaciones-estilo.svg)

![Estilo arquitectónico: cliente-servidor modular y capas lógicas](../../img/estilo-arquitectonico-diagrama.svg)

![Estilo arquitectónico y límites de ejecución de App Barbería](../../img/estilo-arquitectonico.svg)

El primer diagrama muestra los módulos principales y cómo colaboran en el flujo de una cita. Las flechas verdes discontinuas representan el intercambio funcional entre módulos; las flechas continuas representan llamadas a servicios. El segundo diagrama presenta la organización cliente-servidor y las tres capas lógicas. El tercero complementa estas vistas con los límites de ejecución y los módulos del negocio.

## Qué significa

| Dimensión | Aplicación en Barbería |
|---|---|
| Cliente-servidor | La aplicación solicita operaciones a los servicios de servidor mediante HTTPS. |
| Capas lógicas | Se distinguen presentación, aplicación/negocio y datos. No representan tres servidores obligatorios. |
| Modularidad | Identidad, barberías, catálogo, horarios, reservas, pagos y comunicación tienen responsabilidades delimitadas. |
| Backend administrado | Supabase aporta Auth, API, PostgreSQL y funciones de servidor; el proyecto define sus reglas y permisos. |
| Multi-tenant | Varias barberías comparten base y esquema con aislamiento por membresía, usuario y recurso. |

## Límites de ejecución

La aplicación cliente, en el dispositivo o navegador, ejecuta la interfaz y coordina las solicitudes. Auth gestiona identidad; la API expone consultas y RPC; PostgreSQL aplica reglas definitivas y transacciones. Las Edge Functions integran servicios como correo cuando se necesita ejecución segura de servidor.

Las funciones SQL pueden combinar negocio y acceso a datos dentro del mismo servicio. Las capas lógicas y los contenedores C4 describen aspectos distintos del sistema.

## Justificación y alternativas

| Alternativa | Evaluación |
|---|---|
| Supabase y módulos funcionales | Seleccionada: concentra el esfuerzo en el negocio y delega parte de la administración de infraestructura. |
| API propia como monolito modular | Añade servidor y despliegue propios; requiere una necesidad que justifique ese trabajo. |
| Microservicios de negocio | Agregan coordinación y operación independientes que el alcance inicial no necesita. |

No se documenta una API Node.js como parte del diseño. Los módulos de Barbería tampoco son microservicios por utilizar servicios de Supabase.

## Crecimiento

Se medirán tiempos, errores y recursos y se optimizarán consultas e índices antes de ampliar capacidad. Las metas se desarrollan en EQ-04, EQ-05 y EQ-06. Una mayor cantidad de usuarios no obliga por sí sola a cambiar el estilo.

ADR-001 define la organización global; ADR-003 la comunicación; ADR-004 y ADR-005 el aislamiento y acceso; ADR-006 las transacciones; ADR-011 el crecimiento.
