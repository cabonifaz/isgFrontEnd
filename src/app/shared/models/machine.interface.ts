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
  tipoEvento: string;
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
    nombreEquipo: string;
    modelo: string;
    serie: string;
    molde: string;
  };
  eventos: MachineEvent[];
  total: number;
}

export interface MachineEvent {
  fecha: Date;
  hora: string;
  tipoEvento: string;
}
