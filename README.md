# App Barbería: análisis del caso y arquitectura inicial

## Estudiante

Erwin Brayam Inca Pauccara

## Curso

Arquitectura de Software - Semestre 2026-II

## Entregable

ENTREGABLE-02: ANALISIS DE CASO-ARQUITECTURA

## Descripción del proyecto

App Barbería es una plataforma para que los clientes exploren barberías, consulten servicios y profesionales y reserven una atención. Los barberos podrán organizar su disponibilidad y atender sus citas, mientras que los administradores podrán gestionar la operación de cada establecimiento.

La solución se plantea como una plataforma SaaS multi-tenant: diferentes barberías utilizarán una infraestructura compartida, con separación lógica de su información y permisos definidos para cada establecimiento. Este modelo no implica incluir cobros por suscripción dentro del alcance del presente entregable.

## Problema que se busca resolver

En Ayacucho-Huamanga, los clientes pueden acudir a una barbería sin conocer la disponibilidad de los profesionales. Esto genera tiempos de espera, desplazamientos innecesarios y dificultad para elegir un servicio o barbero. La gestión manual de citas también dificulta organizar horarios, evitar cruces de atención y controlar las reservas y pagos.

## Objetivo

Proponer una solución que permita programar la atención y mejorar la administración de las barberías, manteniendo la integridad de las reservas y la protección de la información de cada establecimiento.

## Alcance del análisis

Se consideran identidad y acceso, perfiles, exploración de barberías, favoritos, catálogo de servicios y estilos, gestión de barberos, horarios, disponibilidad, reservas, atención, pagos, invitaciones, membresías, notificaciones e información histórica. Reseñas y geolocalización también forman parte del alcance propuesto y se prevé incorporarlas de manera gradual.

El pago se realizará por efectivo o Yape y se registrará mediante confirmación del personal autorizado. No se contempla procesar cobros automáticamente mediante pasarelas, emitir comprobantes fiscales ni integrarse con un ERP.

## Enfoque del entregable

Los documentos describen las necesidades del sistema y una propuesta inicial de diseño, sin presentar porcentajes de avance ni afirmar que las funcionalidades están terminadas. Los requisitos expresan el comportamiento esperado, y las decisiones tecnológicas orientan su construcción y evolución.

La arquitectura propuesta utiliza tres capas lógicas: presentación, aplicación y negocio, y datos. Se considera Expo/React Native para la interfaz, Supabase para los servicios de backend y PostgreSQL para la persistencia y las reglas transaccionales. La organización interna será modular por funcionalidades.

## Organización de los documentos

```text
.
├── README.md
├── .gitignore
├── analisis-de-sistema/
│   ├── 01-actores.md
│   ├── 02-historias-de-usuario.md
│   ├── 03-requisitos-funcionales.md
│   ├── 04-atributos-de-calidad.md
│   ├── 05-restricciones.md
│   └── 06-drivers-arquitectonicos.md
└── arquitectura/
    └── arquitectura-inicial.md
```

| Documento | Propósito |
|---|---|
| [Actores](analisis-de-sistema/01-actores.md) | Identificar quiénes interactúan con la solución. |
| [Historias de usuario](analisis-de-sistema/02-historias-de-usuario.md) | Expresar necesidades desde la perspectiva de los usuarios. |
| [Requisitos funcionales](analisis-de-sistema/03-requisitos-funcionales.md) | Definir funciones y relacionarlas con las historias. |
| [Atributos de calidad](analisis-de-sistema/04-atributos-de-calidad.md) | Definir cómo debe comportarse el sistema. |
| [Restricciones](analisis-de-sistema/05-restricciones.md) | Establecer condiciones de diseño y alcance. |
| [Drivers arquitectónicos](analisis-de-sistema/06-drivers-arquitectonicos.md) | Identificar necesidades que influyen en la arquitectura. |
| [Arquitectura inicial](arquitectura/arquitectura-inicial.md) | Describir capas, módulos, dependencias e integraciones. |

