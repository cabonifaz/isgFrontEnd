export interface Machine {
  id: number,
  name: string,
  state: string,
  events: Event[]
}

interface Event {
  id: number,
  date: string,
  hour: string
}

export interface MachineResponse {
  equipos: Equipo[];
  totalCount: number;
}

export interface Equipo {
  serie: string;
  modelo: string;
  nombreEquipo: string;
  idTipoEquipo: number;
  tipoEquipo: string;
  idEstadoRegistro: number;
  nombreModelo: string;
}
