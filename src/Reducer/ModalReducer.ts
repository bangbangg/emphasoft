import { MODAL } from '../Actions/types';

import { IModal } from '../typesTS/storeTypes';
import { Modal } from '../Actions/actionsTypes';

const initialState:IModal = {
  modal: false,
};

export const modalReducer = (state = initialState, action:Modal):IModal => {
  switch (action.type) {
    case MODAL:
      return { ...state, modal: action.modal };
    default:
      return state;
  };
}