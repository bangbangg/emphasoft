import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from '../../Components/Alert/Alert';
import { showAlert, newUser } from '../../Actions/actions';

export const Main = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstname] = useState('');
  const [newLastName, setNewLastname] = useState('');

  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const alert = useSelector((state) => state.alert.Alert);
  const dispatch = useDispatch();

  const lastnameAlertStyle = (newLastName.length)? "small alertTextRed" : "small alertTextGreen";
  const nameAlertStyle = (newFirstName.length)? "small alertTextRed" : "small alertTextGreen";
  const passwordAlertStyle = (newPassword.length)? "small alertTextRed" : "small alertTextGreen";
  const usernameAlertStyle = (newUsername.length)? "small alertTextRed" : "small alertTextGreen";

  useEffect(() => {
    if(newFirstName.length===0){
      setNameError('Заполните поле');
    }
    else if(newFirstName.length>30) {
      setNameError('Недопустимое количество символов.');
    } else {
      setNameError('')
    }
  }, [newFirstName]);

  useEffect(() => {
    if(newLastName.length===0){
      setLastNameError('Заполните поле');
    }
    else if(newLastName.length>150) {
      setLastNameError('Недопустимое количество символов.');
    } else {
      setLastNameError('');
    }
  }, [newLastName]);

  useEffect(() => {
    if(newUsername.length===0){
      setUsernameError('Заполните поле');
    }
    else if(!newUsername.match(/^[\w.@+-]+$/)) {
      setUsernameError('Логин не должен содержать символы , кроме @ . + - _  и состоять из букв A-Z');
    } else if(newUsername.length>150) {
      setUsernameError('Длина логина не должна превышать 150 символов');
    }
    else {
      setUsernameError('')
    }
  }, [newUsername]);

  useEffect(() => {
    if(newPassword.length===0){
      setPasswordError('Заполните поле');
    }
    else if(!newPassword.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      setPasswordError('Пароль должен быть от 8 до 128 символов  и содержать не менее 1 заглавной буквы и цифры и состоять из букв A-Z');
    } else if(newPassword.length>128) {
      setPasswordError('Длина логина не должна превышать 150 символов');
    }
    else {
      setPasswordError('')
    }
  }, [newPassword]);

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
            {nameError && <div className={nameAlertStyle}>{nameError}</div>}
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
            {lastNameError && <div className={lastnameAlertStyle}>{lastNameError}</div>}
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
            {usernameError && <div className={usernameAlertStyle}>{usernameError}</div>}
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
              {passwordError && <div className={passwordAlertStyle}>{passwordError}</div>}
          </div>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-success top"
        onClick={() => {
          dispatch(newUser(newUsername, newPassword, newFirstName, newLastName));
          dispatch(showAlert());
        }}
      >
        Подтвердить данные
      </button>
    </div>
  );
};
