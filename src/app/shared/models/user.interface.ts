export interface UserRequest {
  nombres: string;
  apellidos: string;
  usuario: string;
  clave: string;
  usuarioCreador: string;
  idRol: number;
}

export interface UserResponse {
  id: number;
  nombres: string;
  apellidos: string;
  usuario: string;
  idEstado: number;
  idRol: number;
  rol: string;
}

export interface PartialUserResponse {
  idUsuario: number;
  usuario: string;
  idEstado: number;
  idRol: number;
  rol: string;
}

export interface UsersResponse {
  usuarios: PartialUserResponse[];
  total: number;
}

export interface UserFilterRequest {
  usuario: string | "";
  idRol: number | 0;
}
