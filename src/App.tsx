import React from 'react';
import { useSelector } from 'react-redux';
import { router } from './Routing/Router';
import { IApp, stateType } from './typesTS/storeTypes';

function App() {
  const { token } = useSelector(
    ({app}:stateType<IApp>) => app
  );
  const Routing = router(!!token);

  return (
    <div className="appContainer">
     { Routing }
    </div>
  );
}

export default App;
