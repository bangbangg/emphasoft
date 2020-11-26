import {
  LOGIN, LOGOUT, USERS_LIST, SORTED_USERS,
} from '../Actions/types';

const initialState = {
  token: '',
  users: '',
  sorted: '',
  search: '',
};

export const appReducer = (state = initialState, action) => {
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
