import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../Actions/actions';

export const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function MainLink() {
    history.push('/');
  }

  function SortedLink() {
    history.push('/usersList');
  }

  return (
    <div className="Nav_container">
      <button
        type="button"
        className="btn btn-info mgn btnSz"
        onClick={(ev) => {
          ev.preventDefault();
          dispatch(logoutUser());
          localStorage.removeItem('token');
        }}
      >
        Выйти
      </button>
      <div>
        <button
          type="button"
          className="btn btn-info mgn btnSz"
          onClick={(ev) => {
            ev.preventDefault();
            MainLink();
          }}
        >
          Главная
        </button>
        <button
          type="button"
          className="btn btn-info mgn btnSz"
          onClick={(ev) => {
            ev.preventDefault();
            SortedLink();
          }}
        >
          Пользователи
        </button>
      </div>
    </div>
  );
};
