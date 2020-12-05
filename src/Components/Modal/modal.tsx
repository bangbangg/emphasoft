import React from 'react'
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
  if((event.target as Element).className ==="popup_body") {
    dispatch(setModal(false));
  };
}

  return (
    <div
      className="popup"
      onClick={ModalHandler}
    >
      <div
        className="popup_bg"
      />
      <div className="popup_body">
        <div className="popup_content">
          <div className="popup_content_header">
            <span
              className="popup_close"
              onClick={() => {
                dispatch(setModal(false));
              }}
            >
              X
            </span>
          </div>
          <div className="popup_content_body">
            <div className="modal_photo" />
            <div className="modal_content_info">
              <div className="modal_info_nickname">
                Никнейм:  {userName}
              </div>
              <div className="modal_info_name">
                Имя:  {firstName}
              </div>
              <div className="modal_info_name">
                Фамилия:  {lastName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
