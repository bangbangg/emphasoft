import React from 'react';
import { useSelector } from 'react-redux';

import { IAlert, stateType } from '../../typesTS/storeTypes';

export const AlertMessage = () => {
  const { alertStatus } = useSelector(
    ({alert}:stateType<IAlert>) => alert
  );

  const style = alertStatus.includes('успешно')? "alert alert-success rel" : "alert alert-warning rel";

  return (
    <div className={style} role="alert">
      {`${alertStatus}`}
    </div>
  );
};
