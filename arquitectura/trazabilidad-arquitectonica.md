# Trazabilidad arquitectónica

## Propósito

Relacionar la necesidad del negocio, los requisitos y atributos de calidad con las decisiones y su evidencia esperada. Esta matriz permite comprobar por qué se eligió una solución y qué se deberá evaluar después.

## Drivers y decisiones

| Driver | Origen principal | Decisiones que responden | Evidencia propuesta |
|---|---|---|---|
| DA01: aislamiento por barbería | RF41, RF42; AC01, AC02 | ADR-004, ADR-005 | Accesos cruzados rechazados y membresías contextualizadas. |
| DA02: reservas concurrentes | RF11, RF13, RF14; AC03 | ADR-006 | Sin reservas activas superpuestas ante solicitudes simultáneas. |
| DA03: disponibilidad combinada | RF10-RF12, RF22, RF27, RF33; AC04 | ADR-006, ADR-011 | Casos de calendarios, políticas y medición de consultas. |
| DA04: atención y pago consistentes | RF19, RF23-RF25, RF37, RF38; AC03 | ADR-006, ADR-008 | Cambios de estado autorizados y ausencia de datos parciales. |
| DA05: historial | RF17; AC10 | ADR-007 | Reservas previas conservan sus condiciones. |
| DA06: identidad y secretos | RF01-RF04, RF42; AC01 | ADR-003, ADR-005 | Sesiones verificadas y secretos fuera del cliente. |
| DA07: comunicaciones secundarias | RF34, RF39, RF40; AC07 | ADR-009 | Fallo externo no revierte evento confirmado; recordatorios sin duplicación. |
| DA08: respuesta y crecimiento | AC04-AC06 | ADR-001, ADR-011 | Carga representativa, métricas y revisión de recursos y costos. |
| DA09: capacidades previstas | RF43, RF44; AC08 | ADR-001, ADR-002, ADR-010 | Contratos y módulos previstos sin dispersión del proveedor. |
| DA10: experiencia móvil | RF07, RF09, RF13; AC09 | ADR-003 | Flujos y errores comprensibles en plataformas validadas. |
| DA11: mantenibilidad del núcleo | AC08; RC09, RC10 | ADR-001, ADR-002, ADR-010 | Dependencias revisadas y adaptadores sustituibles en pruebas. |

## Cobertura del alcance funcional

| Capacidad | Requisitos | Módulo o colaboración | Decisiones relacionadas |
|---|---|---|---|
| Identidad y perfil | RF01-RF05 | Identidad y perfil; Auth | ADR-003, ADR-005 |
| Exploración y favoritos | RF06-RF08 | Exploración y favoritos; Barberías | ADR-001, ADR-003, ADR-004 |
| Selección y disponibilidad | RF09-RF12 | Catálogo, Barberos, Horarios y Reservas | ADR-006, ADR-011 |
| Confirmación y pago elegido | RF13-RF15 | Reservas y Pagos | ADR-006, ADR-008 |
| Historial y cambios de reserva | RF16-RF19 | Reservas y Pagos | ADR-006, ADR-007, ADR-008 |
| Agenda, disponibilidad y atención | RF20-RF25 | Barberos, Horarios, Atención y Pagos | ADR-005, ADR-006, ADR-008 |
| Configuración y publicación | RF26-RF29 | Barberías y administración | ADR-004, ADR-005 |
| Catálogo y recursos | RF30-RF33 | Catálogo, Barberos y Horarios | ADR-001, ADR-005, ADR-006 |
| Invitaciones | RF34, RF35 | Invitaciones y membresías; Correo | ADR-005, ADR-009, ADR-010 |
| Supervisión y pagos | RF36-RF38 | Agenda administrativa y Pagos | ADR-005, ADR-006, ADR-008 |
| Avisos y recordatorios | RF39, RF40 | Notificaciones; tareas programadas | ADR-009 |
| Contexto y autorización | RF41, RF42 | Membresías y todos los módulos protegidos | ADR-004, ADR-005 |
| Reseñas y ubicación, previsto | RF43, RF44 | Reseñas y Ubicación | ADR-001, ADR-002, ADR-010 |

## Estado de las capacidades y evaluación

| Categoría | Interpretación |
|---|---|
| Diseño adoptado | Supabase, módulos por funcionalidad, datos compartidos, aislamiento contextual y transacciones críticas. |
| Organización objetivo | Contratos, casos de uso y adaptadores con dependencias internas controladas mediante Clean Architecture. |
| Capacidades previstas | Reseñas, mapas, búsqueda por proximidad y carga multimedia. |
| Mecanismos por evaluar | Envíos externos persistentes con reintentos, caché, réplicas y ampliación de recursos según mediciones. |
| Objetivos pendientes de medir | Rendimiento, disponibilidad y capacidad bajo carga de AC04-AC06. |

No se deduce implementación o validación a partir de un requisito, ADR o imagen. Los diagramas representan la propuesta y distinguen ampliaciones; no son evidencia de pruebas de producción.
