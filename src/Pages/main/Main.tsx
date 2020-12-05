import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlertMessage } from '../../Components/Alert/Alert';
import { showAlert, newUser } from '../../Actions/actions';
import { IAlert, stateType, IApp } from '../../typesTS/storeTypes';

export const Main = () => {
  const { Alert } = useSelector(
    ({alert}:stateType<IAlert>) => alert
  );

  const { token } = useSelector(
    ({app}:stateType<IApp>) => app
  );

  const dispatch = useDispatch();

  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newFirstName, setNewFirstname] = useState<string>('');
  const [newLastName, setNewLastname] = useState<string>('');

  const [nameError, setNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');

  const lastnameAlertStyle:string = (newLastName.length)? "small alertTextRed" : "small alertTextGreen";
  const nameAlertStyle:string = (newFirstName.length)? "small alertTextRed" : "small alertTextGreen";
  const passwordAlertStyle:string = (newPassword.length)? "small alertTextRed" : "small alertTextGreen";
  const usernameAlertStyle:string = (newUsername.length)? "small alertTextRed" : "small alertTextGreen";

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

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstname(event.target.value)
  }

  const changeLastnameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastname(event.target.value)
  }

  const changeUsernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value)
  }

  const changePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
  }

  const dataConfirm = () => {
    dispatch(newUser(newUsername, newPassword, newFirstName, newLastName, token));
    dispatch(showAlert());
  }

  return (
    <div className="main">
    {Alert && <AlertMessage />}
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
              onChange={changeNameHandler}
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
              onChange={changeLastnameHandler}
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
              onChange={changeUsernameHandler}
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
              onChange={changePasswordHandler}
              />
              <div className="small">от 8 до 128 символов (можно использовать только англ.буквы)</div>
              {passwordError && <div className={passwordAlertStyle}>{passwordError}</div>}
          </div>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-success top"
        onClick={dataConfirm}
      >
        Подтвердить данные
      </button>
    </div>
  );
};
