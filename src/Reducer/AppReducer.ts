import {
  LOGIN, LOGOUT, USERS_LIST, SORTED_USERS,
} from '../Actions/types';

import { IApp } from '../typesTS/storeTypes';
import { AppActionTypes } from '../Actions/actionsTypes';

const initialState:IApp = {
  token: '',
  users: [],
  sorted: [],
  search: [],
};

export const appReducer = (state = initialState, action:AppActionTypes):IApp => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, token: '' };
    case LOGIN:
      return { ...state, token: action.token };
    case USERS_LIST:
      return { ...state, users: action.users, sorted: action.users };
    case SORTED_USERS:
      return { ...state, sorted: action.sortUsers };
    default:
      return state;
  }
};
