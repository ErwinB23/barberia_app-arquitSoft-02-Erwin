import { CrearReserva } from './aplicacion/crear-reserva.ts';
import { SupabaseReservaAdapter } from './infraestructura/supabase-reserva.adaptador.ts';
import type { ClienteRpc } from './infraestructura/supabase-reserva.adaptador.ts';

export function crearFlujoReserva(cliente: ClienteRpc): CrearReserva {
  const adaptador = new SupabaseReservaAdapter(cliente);
  return new CrearReserva(adaptador);
}
