import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../Actions/actions';

export const NavBar:React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function MainLink() {
    history.push('/');
  }

  function SortedLink() {
    history.push('/usersList');
  }

  const EscapeChangeHanlder = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logoutUser());
    localStorage.removeItem('token');
  }

  const goToMain = (event: React.MouseEvent) => {
    event.preventDefault();
    MainLink();
  }

  const goToUsers = (event: React.MouseEvent) => {
    event.preventDefault();
    SortedLink();
  }

  return (
    <nav className="nav-container">
      <h2 className="visually-hidden">Навигация</h2>
      <button
        type="button"
        className="btn btn-info mgn btnSz"
        onClick={EscapeChangeHanlder}
      >
        Выйти
      </button>
      <div className="buttons-section">
        <button
          type="button"
          className="btn btn-info mgn btnSz"
          onClick={goToMain}
        >
          Главная
        </button>
        <button
          type="button"
          className="btn btn-info mgn btnSz"
          onClick={goToUsers}
        >
          Пользователи
        </button>
      </div>
    </nav>
  );
};
