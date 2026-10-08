# App Barbería: análisis del sistema y propuesta arquitectónica

| Dato | Información |
|---|---|
| Estudiante | Erwin Brayam Inca Pauccara |
| Curso | Arquitectura de Software - Semestre 2026-II |
| Trabajo base | ENTREGABLE-03: ESTILO ARQUITECTONICO + ENFOQUE ARQUITECTÓNICO |

## Descripción y necesidad

App Barbería es una plataforma para que clientes exploren establecimientos, consulten servicios y profesionales y programen una atención. Los barberos podrán gestionar disponibilidad y agenda; los administradores organizarán catálogo, personal, horarios, políticas y pagos autorizados.

En Ayacucho-Huamanga, acudir sin conocer disponibilidad puede generar esperas y desplazamientos innecesarios. La gestión manual también dificulta coordinar citas y mantener información consistente. La propuesta busca mejorar esa planificación y proteger los datos de cada establecimiento.

La plataforma será SaaS multi-tenant: varias barberías compartirán infraestructura con aislamiento lógico y permisos contextuales. Este alcance no incluye cobros por suscripción.

## Decisión de arquitectura

**Cliente-servidor, tres capas lógicas, módulos por funcionalidades y Supabase como backend administrado.** Se aplicará Clean Architecture de forma gradual para controlar dependencias y encapsular servicios externos.

Se mantendrán Expo/React Native y TypeScript en la presentación, Supabase Auth para identidad y PostgreSQL para persistencia y operaciones transaccionales. Edge Functions se usarán para integraciones de servidor cuando corresponda. No se incorpora una API propia Node.js ni microservicios de negocio en esta propuesta.

Las reglas transaccionales conservadas en PostgreSQL seguirán vinculadas a esa tecnología. Encapsularlas mediante contratos mejora la separación del código, pero no significa independencia completa del backend.

## Vista inicial

![Arquitectura inicial de App Barbería](arquitectura/imagenes/arquitectura-inicial.svg)

La imagen presenta actores, capas, seguridad e integraciones. Las capacidades previstas aparecen en ámbar. Consultar la [explicación de la arquitectura inicial](arquitectura/arquitectura-inicial.md).

## Documentos del proceso arquitectónico

| Etapa | Documento | Contenido |
|---|---|---|
| 1. Necesidad del negocio | [Necesidad del negocio](analisis-de-sistema/00-necesidad-del-negocio.md) | Problema, objetivos, valor y límites. |
| 2. Requisitos | [Actores](analisis-de-sistema/01-actores.md), [historias](analisis-de-sistema/02-historias-de-usuario.md), [requisitos funcionales](analisis-de-sistema/03-requisitos-funcionales.md) y [restricciones](analisis-de-sistema/05-restricciones.md) | Participantes, comportamiento esperado y condiciones de diseño. |
| 3. Atributos de calidad | [Atributos de calidad](analisis-de-sistema/04-atributos-de-calidad.md) | Escenarios, criterios y evaluación propuesta. |
| 4. Drivers arquitectónicos | [Drivers](analisis-de-sistema/06-drivers-arquitectonicos.md) | Necesidades que condicionan decisiones. |
| 5. Decisiones arquitectónicas | [Registros ADR](analisis-de-sistema/07-decisiones-arquitectonicas.md) | Contexto, alternativas, decisiones y consecuencias. |
| 6. Estilo arquitectónico | [Estilo](arquitectura/estilo-arquitectonico.md) | Organización global, servicios y límites de ejecución. |
| Enfoque adicional | [Clean Architecture](arquitectura/enfoque/enfoque-arquitectonico.md) | Responsabilidades, contratos y dependencias internas. |
| Vista general | [Arquitectura inicial](arquitectura/arquitectura-inicial.md) | Capas, módulos, datos y flujo de reserva. |


## Diagramas

| Diagrama | Qué permite entender | Imagen SVG |
|---|---|---|
| Arquitectura inicial | Participantes, tres capas lógicas y colaboración de servicios. | [SVG](arquitectura/imagenes/arquitectura-inicial.svg) |
| Estilo arquitectónico | Cliente, backend administrado y servicios externos. | [SVG](arquitectura/imagenes/estilo-arquitectonico.svg) |
| Clean Architecture | Dependencias del código y un ejemplo de confirmación de reserva. | [SVG](arquitectura/imagenes/enfoque-arquitectonico.svg) |

Los colores distinguen responsabilidades y las etiquetas explican su significado. Las flechas de colaboración y las dependencias del código se muestran en vistas separadas. Los diagramas se muestran directamente en SVG para conservar nitidez al ampliarlos. Este formato mantiene el texto y las formas vectoriales.

## Alcance y estado de la propuesta

El núcleo contempla identidad, perfiles, barberías, catálogo, barberos, horarios, disponibilidad, reservas, atención, pagos, invitaciones, membresías, favoritos, notificaciones e historial. Reseñas, geolocalización y carga multimedia se prevén por etapas.

Efectivo y Yape se registran mediante confirmación manual. La plataforma no transfiere dinero, no integra una pasarela ni emite comprobantes fiscales. Los recordatorios iniciales son internos; push no forma parte de esta versión.

Los documentos expresan comportamiento esperado y decisiones de diseño. La estructura Clean Architecture es un objetivo gradual y los valores de rendimiento y disponibilidad son metas pendientes de medir. No se presentan porcentajes de avance ni se afirma que todas las capacidades estén implementadas o validadas.

La continuación de la Guía 03 es documental: no añade funcionalidades, no requiere un boilerplate y no reestructura el código de la aplicación. La carpeta mantiene su nombre original para continuar el entregable anterior.

## Organización

```text
.
├── README.md
├── .gitignore
├── analisis-de-sistema/
│   ├── 00-necesidad-del-negocio.md
│   ├── 01-actores.md
│   ├── 02-historias-de-usuario.md
│   ├── 03-requisitos-funcionales.md
│   ├── 04-atributos-de-calidad.md
│   ├── 05-restricciones.md
│   ├── 06-drivers-arquitectonicos.md
│   └── 07-decisiones-arquitectonicas.md
└── arquitectura/
    ├── arquitectura-inicial.md
    ├── estilo-arquitectonico.md
    ├── enfoque/
    │   └── enfoque-arquitectonico.md
    └── imagenes/
        ├── arquitectura-inicial.svg
        ├── estilo-arquitectonico.svg
        └── enfoque-arquitectonico.svg
```

