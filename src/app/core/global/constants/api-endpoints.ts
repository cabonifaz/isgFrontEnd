export const REQUEST_MAPPING = 'isg';
export const LOGIN_UI = 'auth'
export const USER_UI = 'user'
export const MACHINE_LIST_UI = 'equipment'

export const LOGIN_API_ENDPOINTS = {
  LOGIN: `${REQUEST_MAPPING}/${LOGIN_UI}/login`
}

export const USER_API_ENDPOINTS = {
  GET_USERS: `${REQUEST_MAPPING}/${USER_UI}/list`,
  GET_USER_BY_ID: `${REQUEST_MAPPING}/${USER_UI}/get`,
  ADD_USER: `${REQUEST_MAPPING}/${USER_UI}/add`,
  UPDATE_USER: `${REQUEST_MAPPING}/${USER_UI}/edit`,
  UPDATE_PASSWORD: `${REQUEST_MAPPING}/${USER_UI}/edit/password`,
}

export const ROLE_API_ENDPOINTS = {
  GET_ROLES: `${REQUEST_MAPPING}/roles/get`,
}

export const MACHINE_API_ENDPOINTS = {
  GET_MACHINES: `${REQUEST_MAPPING}/${MACHINE_LIST_UI}/list`,
  GET_MACHINE_BY_ID: `${REQUEST_MAPPING}/${MACHINE_LIST_UI}/get`,
  EDIT_MACHINE: `${REQUEST_MAPPING}/${MACHINE_LIST_UI}/edit`,
  DISABLE_MACHINE: `${REQUEST_MAPPING}/${MACHINE_LIST_UI}/disable`,
  GET_MACHINE_EVENTS: `${REQUEST_MAPPING}/event/list`,
}
