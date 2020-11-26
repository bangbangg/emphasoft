import { MODAL } from '../Actions/types';

const initialState = {
  modal: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL:
      return { ...state, modal: action.modal };
    default:
      return state;
  };
}