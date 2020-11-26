import React from 'react';
import { useSelector } from 'react-redux';
import { router } from './Routing/Router';

function App() {
  const isAuth = useSelector((state) => state.app.token);
  const Routing = router(!!isAuth);

  return (
    <div className="appContainer">
     { Routing }
    </div>
  );
}

export default App;
