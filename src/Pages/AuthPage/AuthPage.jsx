import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showAlert, userAuth } from '../../Actions/actions';
import { Alert } from '../../Components/Alert/Alert';

export const AuthPage = () => {

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alertStatus);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex backGround">
      {!!alert && <Alert />}
      <div className="position">
        <div className="ribbon" />
        <div className="login">
          <h1 className="authHead">Введите свои данные</h1>
          <form action="login">
            <div className="input">
              <div className="blockinput">
                <i className="icon-envelope-alt" />
                <input
                  value={login}
                  className="authInput"
                  type="mail"
                  placeholder="Логин"
                  onChange={(ev) => setLogin(ev.target.value)}
                />
              </div>
              <div className="blockinput">
                <i className="icon-unlock" />
                <input
                  value={password}
                  className="authInput"
                  type="password"
                  placeholder="Пароль"
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
            </div>
            <button
              className="authBtn"
              onClick={(ev) => {
                ev.preventDefault();
                dispatch(userAuth(login.trim(), password.trim()));
                dispatch(showAlert());
                setLogin('');
                setPassword('');
              }}
            >
              Вход
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
