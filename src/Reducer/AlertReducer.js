import {
  SHOW_ALERT, HIDE_ALERT, ALERT_STATUS, DELETE_ALERT,
} from '../Actions/types';

const initialState = {
  Alert: false,
  alertStatus: '',
};

export const alertReducer = (state = initialState, action) => {

  switch (action.type) {
    case SHOW_ALERT:
    if (state.alertStatus) {
      return { ...state, Alert: true };
    }
      return { ...state, Alert: false };
    case HIDE_ALERT:
      return { ...state, Alert: false };
    case ALERT_STATUS:
      return { ...state, alertStatus: action.alert };
    case DELETE_ALERT:
      return { ...state, alertStatus: '' };
    default:
      return state;
  }
};
