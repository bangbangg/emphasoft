import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sortUsers } from '../../Actions/actions';

export const AditionalBtn = () => {
  const dispatch = useDispatch();
  const sortedUsers = useSelector((state) => state.app.sorted);
  const users = useSelector((state) => state.app.users);

  const [search, setSearch] = useState('');

  return (
    <div className="addButtons">
      <div className="buttonsRow">
        <button
          type="button"
          className="btn btn-primary active mgn mw"
          onClick={() => {
            dispatch(sortUsers(sortedUsers.sort((a, b) => a.id > b.id ? 1 : -1)));
            window.location.reload();
          }}
        >
          соритровать по ID( min  max)
        </button>
        <button
          type="button"
          className="btn btn-primary active mgn mw"
          onClick={() => {
            dispatch(sortUsers(sortedUsers.sort((a, b) => a.id > b.id ? -1 : 1)));
            window.location.reload();
          }}
        >
          соритровать по ID (max  min)
        </button>
      </div>
      <div className="inputRow">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2 mwForm"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
            value={search}
            onChange={(ev) => {
              setSearch(ev.target.value);
            }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0 mwForm"
            type="button"
            onClick={(ev) => {
              ev.preventDefault();
              dispatch(
                sortUsers(users.filter((item) =>
                  (item.username.toLowerCase().includes(search.toLowerCase())))),
              );
              window.location.reload();
            }}
          >
            Поиск
          </button>
        </form>
      </div>
    </div>
  );
};
