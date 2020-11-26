import {
  HIDE_ALERT, SHOW_ALERT, LOGIN, LOGOUT, ALERT_STATUS,
  DELETE_ALERT, USERS_LIST, SORTED_USERS, MODAL
} from './types';

const apiRoot = 'http://emphasoft-test-assignment.herokuapp.com';

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}

export function showAlert() {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };
}

export function deleteAlert() {
  return {
    type: DELETE_ALERT,
  };
}

export function addAlert(text) {
  return (dispatch) => {
    dispatch({
      type: ALERT_STATUS,
      alert: text,
    });

    setTimeout(() => {
      dispatch(deleteAlert());
    }, 2000);
  };
}

export const getUsers = () => {
  return async (dispatch) => {
    const response = await fetch(`${apiRoot}/api/v1/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    const users = await response.json();
    dispatch({
      type: USERS_LIST,
      users: users,
    });
  };
};

export const userAuth = (login, password) => {
  return async (dispatch) => {
    const response = await fetch(`${apiRoot}/api-token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    });
    const res = await response.json();

    if (res.token) {
      dispatch({ type: LOGIN, token: res.token });
      localStorage.setItem('token', JSON.stringify(res.token));
      dispatch(getUsers());
    } else if (!!login.length && !!password.length) {
      dispatch(addAlert('Вы ввели неверную пару логин/пароль'));
    } else {
      dispatch(addAlert('Поля логин/пароль не могут быть пустыми'));
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

export function sortUsers(users) {
  return {
    type: SORTED_USERS,
    sortUsers: users,
  };
}

export function setModal(modal) {
  return {
    type: MODAL,
    modal:modal,
  };
}

export function newUser(login,password,name,lastname) {
  return async(dispatch) => {
    if (name.length < 1 || name.length > 30) {
      dispatch(addAlert('Имя должно быть не менее 1 и не более 30 символов'));
    } else if (lastname.length < 1 || lastname.length > 150) {
      dispatch(addAlert('Фамилия должна быть не менее 1 и не более 150 символов'));
    } else if (login.length < 1  || login.length > 150){
      dispatch(addAlert('Логин должен быть не менее 1 и не более 150 символов'));
    } else if (!login.match(/^[\w.@+-]+$/)){
      dispatch(addAlert('Логин не должен содержать символы , кроме @ . + - _ и русские буквы'));
    } else if (password.length < 1 || password.length > 128) {
      dispatch(addAlert('Пароль должен содержать от 8 до 128 символов'));
    } else if (!password.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      dispatch(addAlert('Пароль должен содержать как минимум 1 заглавную букву и 1 цифру и быть не короче 8 и не длиннее 128 символов'));
    } else {
      dispatch(addAlert('Пользователь успешно создан!'));
      const response = await fetch(`${apiRoot}/api/v1/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))}`,
        },
        body: JSON.stringify({
          username: login,
          first_name: name,
          last_name: lastname,
          password: password,
          is_active: true,
        }),
      });
      const res = await response.json();
      if(res.username) {
        dispatch(getUsers());
      }
    }
  };
}