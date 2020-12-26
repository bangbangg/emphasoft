import React from 'react';
import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';

import { setModal } from '../../Actions/actions';

interface IModalProps {
  userName: string,
  lastName: string,
  firstName: string,
}

export const Modal:React.FC<IModalProps> = ({userName, lastName, firstName}) => {
const  dispatch = useDispatch();

const ModalHandler = (event: React.MouseEvent) => {
  if((event.target as Element).className ==="popup-bg") {
    dispatch(setModal(false));
  };
}

  return ReactDom.createPortal(
    <div
      className="popup"
      onClick={ModalHandler}
    >
      <div
        className="popup-bg"
      />
      <div className="popup-body">
        <div className="popup-content">
          <div className="popup-content__header">
            <span
              className="popup-content__close"
              onClick={() => {
                dispatch(setModal(false));
              }}
            >
              X
            </span>
          </div>
          <div className="popup-content__body">
            <div className="popup-content__photo" />
            <div className="popup-content__info">
              <div className="popup-content__nickname">
                Никнейм:  {userName}
              </div>
              <div className="popup-content__name">
                Имя:  {firstName}
              </div>
              <div className="popup-content__name">
                Фамилия:  {lastName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}
