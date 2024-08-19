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
  idTipoEvento: number;
  nombreModelo: string;
  estado: string;
  idEquipo: number;
  molde: string;
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
  equipoInfo: {
    nombreEquipo: string
    idEquipo: number
    serie: string
    modelo: string
    idTipoEquipo: number
    tipoEquipo: string
    moldeActual: string
  };
  eventos: MachineEvent[];
  total: number;
}

export interface MachineEvent {
  fecha: string
  hora: string
  tipoEvento: string
  molde: string
  cantidad: number
}
