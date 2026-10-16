# Principios de diseño: SOLID

## Aplicación al flujo de reserva

SOLID orienta la separación de responsabilidades y el uso de contratos. No exige convertir todo el código en clases; los tipos y las funciones puras también tienen un lugar en el diseño.

| Principio | Aplicación en Barbería | Ejemplo |
|---|---|---|
| S - Responsabilidad única | Separar entrada, coordinación y comunicación externa. | normalizarSolicitud valida forma; CrearReserva coordina; SupabaseReservaAdapter integra la RPC. |
| O - Abierto/cerrado | Añadir otra implementación del contrato sin cambiar el caso de uso. | Conectar un gateway de prueba mediante composición. |
| L - Sustitución de Liskov | Las implementaciones respetan entrada, resultados y significado del contrato. | Éxito contiene un id válido; fallo contiene código y mensaje; una implementación real debe conservar la operación atómica. |
| I - Segregación de interfaces | El caso de uso recibe solo la operación que necesita. | ReservaTransaccionalGateway expone confirmar, sin métodos de perfiles, mapas o catálogo. |
| D - Inversión de dependencias | El caso de uso depende de un contrato interno, no del SDK. | CrearReserva recibe el gateway en su constructor; el adaptador implementa la interfaz. |

## Ejemplo: cambiar el proveedor del caso de uso

La composición entrega una implementación a CrearReserva. En una prueba puede entregar un gateway controlado. El caso de uso mantiene su coordinación y devuelve el mismo tipo de resultado.

Que dos implementaciones tengan métodos con el mismo nombre no basta para cumplir Liskov: deben conservar también sus condiciones y comportamiento. La simulación permite probar el cliente; no demuestra las garantías de una base de datos real.

## Reglas que se revisarán

- Dominio y aplicación no importan el SDK ni archivos de infraestructura.
- La presentación no decide precios ni concede permisos.
- Un cambio de formato RPC se concentra en el adaptador.
- La composición conecta implementaciones; el resto del flujo usa contratos.
- Los cambios mantienen aprobadas las pruebas del módulo y la regresión acordada.

Estas reglas concretan AC08 y DA11. Los escenarios EQ-01 a EQ-03 preservan además seguridad e integridad durante los cambios. El diagrama y los elementos se explican en [diseño interno de módulos](diseño-interno-de-modulos.md).
