import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import App from './App';
import { loadState, saveState } from './Helpers/localStorage';
import { rootReducer } from './Reducer/rootReducer';
import './Styles/styles.scss';
import { AllAppTypes } from './Actions/actionsTypes';
import { AppState } from './Reducer/rootReducer';

const persistedState= loadState();

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AllAppTypes>)));

store.subscribe(() => {
  saveState(store.getState());
});

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById('root'));
