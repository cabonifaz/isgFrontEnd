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
  tipoEvento: string;
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

export interface MachineEventResponse {
  eventos: MachineEvent[];
  total: number;
}

export interface MachineEvent {
  fecha: Date;
  hora: string;
}
