import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { AuthPage } from '../Pages/AuthPage/AuthPage';
import { Main } from '../Pages/main/Main';
import { Second } from '../Pages/Second/Second';
import { NavBar } from '../Components/Navbar/NavBar';


export const router = (isAuthorized:boolean) => {
  if (!isAuthorized) {
    return (
      <Router>
        <Switch>
          <Route path="/Auth" exact component={AuthPage} />
          <Redirect to="/Auth" />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/Home" exact component={Main} />
        <Route path="/usersList" component={Second} />
        <Redirect to="/Home" />
      </Switch>
    </Router>
  );
};
