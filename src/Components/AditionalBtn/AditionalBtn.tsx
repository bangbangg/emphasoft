import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sortUsers, firstTenUsers } from '../../Actions/actions';
import { IApp, stateType } from '../../typesTS/storeTypes';

export const AditionalBtn = () => {
  const dispatch = useDispatch();

  const { sorted } = useSelector(
    ({app}:stateType<IApp>) => app
  );

  const { users } = useSelector(
    ({app}:stateType<IApp>) => app
  );

  const [search, setSearch] = useState<string>("");

  const sortMin = () => {
    dispatch(sortUsers(sorted.sort((a, b) => a.id > b.id ? 1 : -1)));
  }

  const sortMax = () => {
    dispatch(sortUsers(sorted.sort((a, b) => a.id > b.id ? -1 : 1)));
  }

  const searchUsers = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(
      sortUsers(users.filter((item) =>
        (item.username.toLowerCase().includes(search.toLowerCase())))),
    );
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(
        sortUsers(users.filter((item) =>
          (item.username.toLowerCase().includes(search.toLowerCase())))),
      );
      dispatch(firstTenUsers());
    }
  }

  return (
    <section className="search-field">
      <h2 className="visually-hidden">Поиск и сортировка</h2>
      <div className="search-field__sort-buttons">
        <button
          type="button"
          className="btn btn-primary active mgn mw"
          onClick={sortMin}
        >
          соритровать по ID( min  max)
        </button>
        <button
          type="button"
          className="btn btn-primary active mgn mw"
          onClick={sortMax}
        >
          соритровать по ID (max  min)
        </button>
      </div>
      <div className="search-field__input-search">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2 mwForm"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
            value={search}
            onChange={changeHandler}
            onKeyPress={keyPressHandler}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0 mwForm"
            type="button"
            onClick={(ev) => {
              searchUsers(ev);
              dispatch(firstTenUsers());
            }}
          >
            Поиск
          </button>
        </form>
      </div>
    </section>
  );
};
