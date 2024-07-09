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
  idEquipo: number;
}

export interface EquipoById {
  descripcionTipoEquipo: string;
  idEquipo: number;
  idTipoEquipo: number;
  modelo: string;
  nombreEquipo: string;
  serie: string;
}

export interface EditMachineResponse {
  message: string;
}

export interface MachineEventsResponse {
  fecha: string;
  hora: string;
}
