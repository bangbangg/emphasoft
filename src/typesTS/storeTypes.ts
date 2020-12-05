export interface IAlert {
  Alert: boolean,
  alertStatus: string,
}

export interface IApp {
  token: string,
  users: IResponce[],
  sorted: IResponce[],
  search: IResponce[],
}

export interface IModal {
  modal: boolean,
}

export interface IResponce {
  id: number
  username: string
  first_name: string
  last_name: string
  is_active: boolean
  last_login: null | string
  is_superuser: boolean
}

export type stateType<T> = {
  [n: string]: T;
};