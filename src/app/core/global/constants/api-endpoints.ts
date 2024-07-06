export const REQUEST_MAPPING = 'isg';
export const LOGIN_UI = 'auth'
export const USER_UI = 'user'

export const LOGIN_API_ENDPOINTS = {
  LOGIN: `${REQUEST_MAPPING}/${LOGIN_UI}/login`
}

export const USER_API_ENDPOINTS = {
  GET_USERS: `${REQUEST_MAPPING}/${USER_UI}/list`,
  GET_USER_BY_ID: `${REQUEST_MAPPING}/${USER_UI}/get`,
  ADD_USER: `${REQUEST_MAPPING}/${USER_UI}/add`,
  EDIT_USER: `${REQUEST_MAPPING}/${USER_UI}/edit`,
}

export const ROLE_API_ENDPOINTS = {
  GET_ROLES: `${REQUEST_MAPPING}/roles/get`,
}
