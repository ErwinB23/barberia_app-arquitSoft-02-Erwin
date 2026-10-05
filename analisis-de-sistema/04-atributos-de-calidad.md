# Atributos de calidad

| ID | Atributo | Escenario de calidad | Criterio propuesto |
|---|---|---|---|
| AC01 | Seguridad | Un usuario intenta consultar una reserva ajena o ejecutar una operación administrativa sin permisos. | El servidor rechaza el acceso, no entrega datos privados y valida identidad, membresía y relación con el recurso. La comunicación usa HTTPS. |
| AC02 | Aislamiento entre barberías | Un administrador del establecimiento A intenta gestionar datos privados del establecimiento B. | Las políticas y relaciones por barbería impiden el acceso cruzado, aunque se modifiquen identificadores en la solicitud. |
| AC03 | Integridad transaccional | Dos clientes intentan reservar un mismo intervalo para un barbero al mismo tiempo. | Como máximo se confirma una de las solicitudes que compiten por el mismo intervalo; no quedan reservas ni pagos asociados parcialmente creados. |
| AC04 | Rendimiento | Clientes consultan catálogo, disponibilidad y reservas durante horas de alta demanda. | Objetivo preliminar: el 95 % de las consultas principales responde en un máximo de 3 segundos con 100 usuarios concurrentes en el escenario de prueba definido, excluyendo interacción humana y carga de mapas externos. |
| AC05 | Disponibilidad | Los usuarios requieren consultar y gestionar citas durante el horario de operación. | Objetivo preliminar: disponibilidad mensual del 99,5 % para las funciones principales; medir autenticación y reservas e informar fallos de forma recuperable. Este objetivo depende también de los servicios contratados. |
| AC06 | Escalabilidad | Aumentan el número de barberías, usuarios y solicitudes de disponibilidad. | La capacidad puede ampliarse mediante recursos administrados, índices y optimización de consultas sin crear una aplicación o base independiente por barbería. Se verificarán límites del proveedor y cuellos de botella antes de escalar. |
| AC07 | Confiabilidad | El correo de una invitación falla después de registrar correctamente la operación principal. | El registro se conserva, se comunica el fallo de envío y puede reintentarse de forma controlada. La entrega de correo ocurre fuera de la transacción principal. El fallo del proveedor no revierte una operación ya confirmada; los avisos internos que formen parte de esa transacción conservan su atomicidad. |
| AC08 | Mantenibilidad y modificabilidad | Se incorporan reseñas, un proveedor de mapas o una mejora del catálogo. | El cambio se concentra en el módulo y adaptadores correspondientes, con contratos definidos y pruebas de regresión sobre las funciones afectadas. |
| AC09 | Usabilidad y accesibilidad | Un cliente reserva desde una pantalla móvil pequeña o necesita comprender un error de disponibilidad. | El flujo presenta pasos claros, estados de carga, vacío y error; mantiene controles táctiles adecuados y mensajes comprensibles, y no depende únicamente del color. |
| AC10 | Preservación histórica | Cambian el nombre de un servicio, su precio o las políticas después de confirmar una cita. | La consulta histórica conserva las condiciones registradas para la reserva, sin reemplazarlas silenciosamente por la configuración actual. |

## Condiciones de evaluación

Los valores de AC04 y AC05 son objetivos de diseño pendientes de verificación, no resultados de pruebas ni un SLA contratado. No se deduce una capacidad máxima de usuarios a partir del número de cuentas registradas.

| Atributos | Verificación propuesta |
|---|---|
| AC01, AC02 | Intentar operaciones con un usuario sin sesión, un cliente ajeno, un barbero no asignado y un administrador de otra barbería. La respuesta no debe exponer ni modificar datos privados. |
| AC03 | Ejecutar solicitudes simultáneas sobre intervalos superpuestos e inducir un fallo antes de completar la escritura. Verificar exclusión de intervalos y ausencia de datos parciales. |
| AC04 | Definir datos, recursos contratados, red, consultas y mezcla de operaciones; simular 100 usuarios concurrentes y medir el percentil 95 de extremo a extremo de las consultas principales. Registrar errores y consumo de recursos. |
| AC05 | Medir el tiempo en que un flujo representativo de autenticación y consulta/gestión de reservas está disponible sobre el periodo mensual definido. Registrar ventanas de observación y fallos de dependencias. |
| AC06 | Repetir una carga representativa con mayor volumen de datos y solicitudes; identificar el recurso limitante antes de aumentar capacidad. |
| AC07 | Simular un fallo de correo después de confirmar una invitación. Verificar conservación del registro, resultado de envío y control de reintentos. |
| AC08 | Cambiar un adaptador o añadir una capacidad sin importar el SDK del proveedor desde el dominio; revisar contratos y ejecutar regresión del módulo afectado. |
| AC09 | Evaluar reserva y recuperación de errores en pantallas móviles; comprobar etiquetas, contraste, controles táctiles y navegación. |
| AC10 | Cambiar catálogo y políticas y consultar una reserva previa. Los datos históricos deben conservar las condiciones correspondientes. |

La evaluación propuesta no se ha ejecutado por el hecho de documentarla. La capacidad y disponibilidad dependerán del diseño, configuración y servicios utilizados.
