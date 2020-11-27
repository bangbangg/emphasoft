import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AditionalBtn } from '../../Components/AditionalBtn/AditionalBtn';
import { setModal } from '../../Actions/actions';
import { Modal } from '../../Components/Modal/modal';

export const Second = () => {
  const [modalUser, setModalUser] = useState('');

  const dispatch = useDispatch();

  const sortedUsers = useSelector((state) => state.app.sorted);
  const modal = useSelector((state) => state.modal.modal);

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

  return (
    <div className="stndrt">
      {modal && <Modal
        userName={modalUser.username}
        lastName={modalUser.last_name}
        firstName={modalUser.first_name}
        />
      }
      <ul className="users_List">
        <AditionalBtn />
        {sortedUsers.map((user) => {
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
                  Последний визит: {`${!!user.last_active ? user.last_active : 'очень давно :('}`}
                </p>
                <p className="card-text">
                  {`${user.is_active ? 'Активен' : 'не активен'}`}
                </p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
