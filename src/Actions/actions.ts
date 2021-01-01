import {
  HIDE_ALERT, SHOW_ALERT, LOGIN, LOGOUT, ALERT_STATUS, TEN_USERS,
  DELETE_ALERT, USERS_LIST, SORTED_USERS, MODAL, SHOW_MORE
} from './types';
import { Dispatch } from 'redux';

import { AlertActionTypes, AppActionTypes, Modal } from './actionsTypes';
import { IResponce } from '../typesTS/storeTypes';

const apiRoot:string = 'http://emphasoft-test-assignment.herokuapp.com';

export function hideAlert():AlertActionTypes {
  return {
    type: HIDE_ALERT,
  };
}

export function Alert():AlertActionTypes {
  return {
    type: SHOW_ALERT,
  };
}

export function deleteAlert():AlertActionTypes {
  return {
    type: DELETE_ALERT,
  };
}

export function textAlert(text: string):AlertActionTypes  {
  return {
    type: ALERT_STATUS,
    alert: text,
  };
}

export function logoutUser():AppActionTypes{
  return {
    type: LOGOUT,
  };
};

export function sortUsers(users:IResponce[]):AppActionTypes{
  return {
    type: SORTED_USERS,
    sortUsers: users,
  };
}

export function listOfUsers(users:IResponce[]):AppActionTypes {
  return {
    type: USERS_LIST,
    users: users,
  }
}

export function loginUser(token: string):AppActionTypes {
  return {
    type: LOGIN,
    token: token
  }
}

export function showMoreUsers():AppActionTypes {
  return {
    type: SHOW_MORE,
  }
}

export function firstTenUsers():AppActionTypes {
  return {
    type: TEN_USERS,
  }
}

export function setModal(modal:boolean):Modal {
  return {
    type: MODAL,
    modal:modal,
  };
}



export function showAlert() {
  return (dispatch: Dispatch<AlertActionTypes>) => {
    dispatch(Alert());

    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };
}

export function addAlert(text:string) {
  return (dispatch: Dispatch<AlertActionTypes>) => {
    dispatch(textAlert(text));

    setTimeout(() => {
      dispatch (deleteAlert());
    }, 2000);
  };
}



export const getUsers = (token:string) => {
  return async (dispatch: Dispatch<AppActionTypes>) => {
    const response = await fetch(`${apiRoot}/api/v1/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const users:IResponce[] = await response.json();
    dispatch(listOfUsers(users));
  };
};

export const userAuth = (login:string, password:string) => {
  return async (dispatch: Dispatch<any>) => {
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
    const token:string = res.token;
    if (token) {
      dispatch(loginUser(token));
      localStorage.setItem('token', JSON.stringify(res.token));
      dispatch(getUsers(token));
    } else if (!!login.length && !!password.length) {
      dispatch(addAlert('Вы ввели неверную пару логин/пароль'));
    } else {
      dispatch(addAlert('Поля логин/пароль не могут быть пустыми'));
    }
  };
};

export function newUser(login:string,password:string,name:string,lastname:string, token:string) {
  return async(dispatch: Dispatch<any>) => {
    if (name.length <1 || lastname.length<1 || login.length<1 || password.length < 1) {
      dispatch(addAlert('Поля не должны быть пустыми'));
    } else if (
      name.length > 30 ||
      lastname.length > 150 ||
      login.length > 150 ||
      !login.match(/^[\w.@+-]+$/) ||
      password.length > 128 ||
      !password.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
      ) {
      dispatch(addAlert('Поля заполнены некорректно. Обратите внимание на ошибки'));
    } else {
      dispatch(addAlert('Пользователь успешно создан!'));
      const response = await fetch(`${apiRoot}/api/v1/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
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
        dispatch(getUsers(token));
        dispatch(addAlert('Пользователь успешно создан!'));
      }
    }
  };
}