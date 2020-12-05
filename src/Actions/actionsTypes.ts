import {
  HIDE_ALERT, SHOW_ALERT, LOGIN, LOGOUT, ALERT_STATUS,
  DELETE_ALERT, USERS_LIST, SORTED_USERS, MODAL
} from './types';

import { IResponce } from '../typesTS/storeTypes';


//Alert
interface IHideAlert {
  type: typeof HIDE_ALERT,
}

interface IAlertStatus {
  type: typeof ALERT_STATUS,
  alert: string
}

interface IDeleteAlert {
  type: typeof DELETE_ALERT,
}

interface IShowAlert {
  type: typeof SHOW_ALERT,
}

export type AlertActionTypes = IDeleteAlert | IShowAlert | IHideAlert | IAlertStatus;
//Modal

export type Modal = {
  type: typeof MODAL,
  modal: boolean,
}

//App

interface ILogin {
  type: typeof LOGIN,
  token: string,
}

interface ILogout {
  type: typeof LOGOUT,
}

interface IUsersList {
  type: typeof USERS_LIST,
  users: IResponce[],
}

interface ISortedUsers {
  type: typeof SORTED_USERS,
  sortUsers: IResponce[],
}


export type AppActionTypes = ILogin | ILogout | ISortedUsers | IUsersList ;

// global action type

export type AllAppTypes = AppActionTypes | AlertActionTypes | Modal;