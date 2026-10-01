# Atributos de calidad

| ID | Atributo | Escenario de calidad | Criterio propuesto |
|---|---|---|---|
| AC01 | Seguridad | Un usuario intenta consultar una reserva ajena o ejecutar una operación administrativa sin permisos. | El servidor rechaza el acceso, no entrega datos privados y valida identidad, membresía y relación con el recurso. La comunicación usa HTTPS. |
| AC02 | Aislamiento entre barberías | Un administrador del establecimiento A intenta gestionar datos privados del establecimiento B. | Las políticas y relaciones por barbería impiden el acceso cruzado, aunque se modifiquen identificadores en la solicitud. |
| AC03 | Integridad transaccional | Dos clientes intentan reservar un mismo intervalo para un barbero al mismo tiempo. | Solo se confirma una reserva incompatible con ese intervalo; no quedan reservas ni pagos asociados parcialmente creados. |
| AC04 | Rendimiento | Clientes consultan catálogo, disponibilidad y reservas durante horas de alta demanda. | Objetivo preliminar: el 95 % de las consultas principales responde en un máximo de 3 segundos con 100 usuarios concurrentes en el escenario de prueba definido, excluyendo interacción humana y carga de mapas externos. |
| AC05 | Disponibilidad | Los usuarios requieren consultar y gestionar citas durante el horario de operación. | Objetivo preliminar: disponibilidad mensual del 99,5 % para las funciones principales; medir autenticación y reservas e informar fallos de forma recuperable. Este objetivo depende también de los servicios contratados. |
| AC06 | Escalabilidad | Aumentan el número de barberías, usuarios y solicitudes de disponibilidad. | La capacidad puede ampliarse mediante recursos administrados, índices y optimización de consultas sin crear una aplicación o base independiente por barbería. Se verificarán límites del proveedor y cuellos de botella antes de escalar. |
| AC07 | Confiabilidad | El correo de una invitación falla después de registrar correctamente la operación principal. | El registro se conserva, se comunica el fallo de envío y puede reintentarse de forma controlada. Una operación crítica confirmada no se revierte por el fallo de una tarea secundaria. |
| AC08 | Mantenibilidad y modificabilidad | Se incorpora reseñas, un proveedor de mapas o una mejora del catálogo. | El cambio se concentra en el módulo y adaptadores correspondientes, con contratos definidos y pruebas de regresión sobre las funciones afectadas. |
| AC09 | Usabilidad y accesibilidad | Un cliente reserva desde una pantalla móvil pequeña o necesita comprender un error de disponibilidad. | El flujo presenta pasos claros, estados de carga, vacío y error; mantiene controles táctiles adecuados y mensajes comprensibles, y no depende únicamente del color. |
| AC10 | Preservación histórica | Cambian el nombre de un servicio, su precio o las políticas después de confirmar una cita. | La consulta histórica conserva las condiciones registradas para la reserva, sin reemplazarlas silenciosamente por la configuración actual. |


