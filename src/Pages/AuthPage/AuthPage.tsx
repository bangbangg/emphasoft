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
    <div className="flex backGround">
      {!!alertStatus && <AlertMessage />}
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
                  onChange={changeLoginHandler}
                />
              </div>
              <div className="blockinput">
                <i className="icon-unlock" />
                <input
                  value={password}
                  className="authInput"
                  type="password"
                  placeholder="Пароль"
                  onChange={changePasswordHandler}
                />
              </div>
            </div>
            <button
              className="authBtn"
              onClick={enterApp}
            >
              Вход
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
