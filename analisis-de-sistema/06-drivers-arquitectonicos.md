# Drivers arquitectónicos

Los drivers son requisitos, atributos de calidad o restricciones cuya influencia obliga a tomar decisiones de arquitectura. No toda función constituye un driver: se seleccionan las que afectan límites, permisos, transacciones, comunicación, organización o evolución.

| ID | Driver arquitectónico | Origen | ¿Por qué influye en la arquitectura? | Respuesta inicial de diseño |
|---|---|---|---|---|
| DA01 | Operar varias barberías con separación de información y permisos contextuales. | RF41, RF42; AC01, AC02; RC04, RC05 | Determina la identificación del establecimiento y la autorización de cada acceso. | Datos relacionados con barbershop_id, membresías, RLS y comprobaciones de servidor. |
| DA02 | Evitar citas superpuestas incluso ante solicitudes concurrentes. | RF11, RF13, RF14; AC03 | La consulta de disponibilidad por sí sola no impide que dos solicitudes compitan por el mismo horario. | Revalidación al confirmar, transacciones y restricciones de exclusión de intervalos en PostgreSQL. |
| DA03 | Calcular disponibilidad a partir de varios calendarios y políticas. | RF10, RF11, RF12, RF22, RF27, RF33; AC04 | Requiere combinar duración, horarios, bloqueos, cierres y reservas de manera coherente. | Funciones de disponibilidad en servidor e índices para sus consultas. |
| DA04 | Mantener un ciclo consistente de atención y pago. | RF19, RF23, RF24, RF25, RF37, RF38; AC03; RC07 | Las operaciones cambian estados relacionados y requieren permisos diferentes. | Casos de uso y funciones transaccionales con validación de estado y rol; registro manual de pagos. |
| DA05 | Conservar las condiciones históricas de cada reserva. | RF17; AC10 | Cambios del catálogo o las políticas no deben alterar la interpretación de una atención pasada. | Copias de los datos relevantes y políticas al confirmar, asociadas a la reserva. |
| DA06 | Proteger identidad, sesiones y secretos en dispositivos cliente. | RF01, RF02, RF03, RF04, RF42; AC01; RC03, RC05, RC06 | El cliente no es una frontera suficiente de autorización y no puede almacenar claves privilegiadas. | Supabase Auth, HTTPS, validación de permisos en servidor y secretos en entornos seguros. |
| DA07 | Separar operaciones principales de comunicaciones secundarias. | RF34, RF39, RF40; AC07; RC12 | Un fallo de correo no debe borrar una invitación o revertir una reserva confirmada. | Notificaciones internas, tareas programadas y envío de correo con tratamiento independiente del fallo y reintentos controlados. |
| DA08 | Responder y crecer conforme aumenten usuarios y establecimientos. | AC04, AC05, AC06; RC02, RC04 | Influye en consultas, recursos, monitoreo y límites de infraestructura. | Servicios administrados, índices, consultas acotadas y mediciones antes de ampliar capacidad. |
| DA09 | Incorporar reseñas y mapas manteniendo módulos cohesionados. | RF43, RF44; AC08; RC09, RC12, RC13 | Las nuevas capacidades y proveedores no deben dispersar dependencias en las pantallas. | Módulos de reseñas y ubicación, adaptador de mapas y persistencia geoespacial prevista. |
| DA10 | Ofrecer una experiencia móvil clara con acceso desde otras plataformas. | RF07, RF09, RF13; AC09; RC01 | Determina componentes, navegación y estados de interfaz para distintos dispositivos. | Expo/React Native, rutas delgadas, componentes compartidos y validación por plataforma. |


