import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AditionalBtn } from '../../Components/AditionalBtn/AditionalBtn';
import { setModal } from '../../Actions/actions';
import { Modal } from '../../Components/Modal/modal';

import { IApp, stateType, IModal, IResponce } from '../../typesTS/storeTypes';


export const Second = () => {

  const [modalUser, setModalUser] = useState<IResponce | null>(null);

  const dispatch = useDispatch();

  const { sorted } = useSelector(
    ({app}:stateType<IApp>) => app
  );

  const { modal } = useSelector(
    ({modal}:stateType<IModal>) => modal
  );

  const [newArr, setNewArr] = useState<IResponce[]>(sorted);

  const toggle = !modal;

  useEffect(() => {
    if (modal) {
      document.body.style.height="100vh";
      document.body.style.overflowY="hidden";
    } else {
      document.body.style.height="100%";
      document.body.style.overflowY="visible";
    }
  }, [modal]);

  useEffect(() => {
    setNewArr(sorted);
  },[sorted])

  return (
    <section className="user-list">
      <h2 className="visually-hidden">Список пользователей</h2>
      {modal && modalUser && <Modal
        userName={modalUser.username}
        lastName={modalUser.last_name}
        firstName={modalUser.first_name}
        />
      }
      <ul className="users-list__container">
        <AditionalBtn />
        {!sorted.length &&
          <div className="users-list__search__no-result">К сожаланию, ничего не найдено</div>
        }
        {newArr.map((user) => {
          return (
            <div
              className="card text-dark border-info mb-3 aditional"
              key={user.id}
              onClick={() => {
                setModalUser(user);
                dispatch(setModal(toggle));
              }}
            >
              <div className="card-header">
                username: {user.username} ID {user.id}
              </div>
              <div className="card-body">
                <h5 className="card-title ">
                  {`${user.is_superuser ? 'Пользователь(premium):' : 'Пользователь:'}`} <br/>
                  {user.first_name} {user.last_name}
                </h5>
                <p className="card-text">
                  Последний визит: {`${!!user.last_login ? user.last_login : 'очень давно :('}`}
                </p>
                <p className="card-text">
                  {`${user.is_active ? 'Активен' : 'не активен'}`}
                </p>
              </div>
            </div>
          );
        })}
      </ul>
    </section>
  );
};
