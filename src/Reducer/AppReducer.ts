import {
  LOGIN, LOGOUT, USERS_LIST, SORTED_USERS, SHOW_MORE, TEN_USERS
} from '../Actions/types';

import { IApp } from '../typesTS/storeTypes';
import { AppActionTypes } from '../Actions/actionsTypes';

const initialState:IApp = {
  token: '',
  users: [],
  sorted: [],
  search: [],
  usersOnPage: 12,
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
    case TEN_USERS:
      return { ...state, usersOnPage: 12 };
    case SHOW_MORE:
      return { ...state, usersOnPage: state.usersOnPage + 12 };
    default:
      return state;
  }
};
