import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showAlert, userAuth } from '../../Actions/actions';
import { AlertMessage } from '../../Components/Alert/Alert';
import { IAlert, stateType } from '../../typesTS/storeTypes';

export const AuthPage = () => {
  const dispatch = useDispatch();

  const { alertStatus } = useSelector(
    ({alert}:stateType<IAlert>) => alert
  );

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const enterApp = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(userAuth(login.trim(), password.trim()));
    dispatch(showAlert());
    setLogin('');
    setPassword('');
  }

  const changeLoginHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const changePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <article className="auth-container background">
      <h2 className="visually-hidden">Авторизация</h2>
      {!!alertStatus && <AlertMessage />}
      <div className="position">
        <div className="ribbon" />
        <div className="auth-container__login">
          <h1 className="auth-header">Введите свои данные</h1>
          <form action="auth-container__login">
            <div className="input">
              <div className="block-input">
                <i className="icon-envelope-alt" />
                <input
                  value={login}
                  className="auth-input"
                  type="mail"
                  placeholder="Логин"
                  onChange={changeLoginHandler}
                />
              </div>
              <div className="block-input">
                <i className="icon-unlock" />
                <input
                  value={password}
                  className="auth-input"
                  type="password"
                  placeholder="Пароль"
                  onChange={changePasswordHandler}
                />
              </div>
            </div>
            <button
              className="auth-button"
              onClick={enterApp}
            >
              Вход
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};
