import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";

import Index from './root/index';

export default () => (
    <Router>
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
    </Router>
);
