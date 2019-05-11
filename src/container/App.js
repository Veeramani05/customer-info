import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import List from './customer';
import CustomerForm from './customer/form'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/:formType" exact component={CustomerForm} />
        <Route path="/:formType/:id" exact component={CustomerForm} />
      </Switch>
    </Router>
  );
}

export default App;
