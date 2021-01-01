import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser, firstTenUsers } from '../../Actions/actions';

export const NavBar:React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [mobile_visibility, setMobile_visibility] = useState<string>("mobile-nav");
  const [burger, setBurger] = useState<string>("burger-menu__item__disabled");

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

  useEffect(() => {
    if (burger==="burger-menu__item__enabled") {
      setMobile_visibility("mobile-nav__hidden");
    } else {
      setMobile_visibility("mobile-nav");
    }
  }, [burger]);

  return (
    <div>
    <nav className="nav-container-desktop">
      <h2 className="visually-hidden">Навигация</h2>
      <button
        type="button"
        className="btn btn-info mgn btnSz"
        onClick={(ev) => {
          EscapeChangeHanlder(ev);
          dispatch(firstTenUsers());
        }}
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

    <div className={burger}>
      <ul className = "burger-menu">
        <h2 className = "burger-menu__header">
          Меню
        </h2>
        <li
          className="burger-menu__item"
          onClick={(ev)=>{
            goToMain(ev);
            setBurger("burger-menu__item__disabled");
          }}
        >
          Страница регистрации
        </li>
        <li
          className="burger-menu__item"
          onClick={(ev)=>{
            goToUsers(ev);
            setBurger("burger-menu__item__disabled");
          }}
        >
          Список пользователей
        </li>
        <div
          className="burger-menu__close"
          onClick = {()=>setBurger("burger-menu__item__disabled")}
        >
          &#10005;
        </div>
      </ul>
    </div>
    <div  className={mobile_visibility}>
      <nav className="nav-container__mobile">
        <button
          className="mobile__exit-btn"
          type="button"
          onClick={(ev) => {
            EscapeChangeHanlder(ev);
            dispatch(firstTenUsers());
          }}
        >
          Выйти
        </button>
        <button
          type="button"
          className="mobile__burger-btn"
          onClick = {()=>setBurger("burger-menu__item__enabled")}
        >
          &#9776;
        </button>
      </nav>
    </div>
    </div>
  );
};
