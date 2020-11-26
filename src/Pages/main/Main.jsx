import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from '../../Components/Alert/Alert';
import { showAlert, newUser } from '../../Actions/actions';

export const Main = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstname] = useState('');
  const [newLastName, setNewLastname] = useState('');

  const alert = useSelector((state) => state.alert.Alert);
  const dispatch = useDispatch();

  return (
    <div className="main">
    {alert && <Alert className="position"/>}
      <h1 className="main_header">
        Форма регистрации
      </h1>

      <form className="adaptive_form">
        <div className="row top">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Имя"
              value={newFirstName}
              onChange={(ev)=>setNewFirstname(ev.target.value)}
            />
            <div className="small">от 1 до 30 символов</div>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Фамилия"
              value={newLastName}
              onChange={(ev)=>setNewLastname(ev.target.value)}
            />
            <div className="small">от 1 до 150 символов</div>
          </div>
        </div>
        <div className="row top">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Логин (username)"
              value={newUsername}
              onChange={(ev)=>setNewUsername(ev.target.value)}
            />
            <div className="small">от 1 до 150 символов( допустимые символы a-z @ . + - _ ) </div>
          </div>
        </div>
        <div className="row top">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Пароль"
              value={newPassword}
              onChange={(ev)=>setNewPassword(ev.target.value)}
              />
              <div className="small">от 8 до 128 символов (можно использовать только англ.буквы)</div>
          </div>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-success"
        onClick={(ev) => {
          dispatch(newUser(newUsername, newPassword, newFirstName, newLastName));
          dispatch(showAlert());
        }}
      >
        Подтвердить данные
      </button>
    </div>
  );
};
