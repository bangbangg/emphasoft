import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';
import { alertReducer } from './AlertReducer';
import { modalReducer } from './ModalReducer';

export const rootReducer = combineReducers({
  alert: alertReducer,
  app: appReducer,
  modal: modalReducer,
});
