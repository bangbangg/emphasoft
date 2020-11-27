import React from 'react'
import { useDispatch } from 'react-redux';

import { setModal } from '../../Actions/actions';

export const Modal = ({userName, lastName, firstName}) => {
const  dispatch = useDispatch();

  return (
    <div
      className="popup"
        onClick={(ev) => {
          if(ev.target.className==="popup_body") {
            dispatch(setModal())
          };
        }}
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
