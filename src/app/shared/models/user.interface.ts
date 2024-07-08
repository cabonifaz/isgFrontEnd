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

export interface UpdateUserRequest {
  idUsuario: number
  usuario: string
  nombres: string
  apellidos: string
  usuarioCreador: string
  idEstado: number
  idRol: number
}

export interface UpdatePasswordRequest {
  idUsuario: number;
  clave: string;
}
