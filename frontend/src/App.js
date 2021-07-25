import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import NewPolicy from './policies/pages/NewPolicy';
import Policies from './policies/pages/Policies';
import Graph from './policies/pages/Graph';
import UpdatePolicy from './policies/pages/UpdatePolicy';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Policies />
      </Route>
      <Route path="/charts" exact>
        <Graph />
      </Route>
      <Route path="/policy/new" exact>
        <NewPolicy />
      </Route>
      <Route path="/policy/:policyId">
        <UpdatePolicy />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Router>
      <MainNavigation />
      <ToastContainer className="toast-container"/>
      <main>{routes}</main>
    </Router>
  );
};

export default App;
