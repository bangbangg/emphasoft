import React from 'react';
import { useSelector } from 'react-redux';

export const Alert = () => {
  const message = useSelector((state) => state.alert.alertStatus);
  const style = message.includes('успешно')? "alert alert-success rel" : "alert alert-warning rel";

  return (
    <div className={style} role="alert">
      {`${message}`}
    </div>
  );
};
