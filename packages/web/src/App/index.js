import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import QtCalendar from '../QtCalendar';

export default () => (
  <Router>
    <Switch>
      <Route path="/(calendar)?" exact component={QtCalendar} />
      <Route
        render={() => <h1 style={{ textAlign: 'center' }}>Page Not Found</h1>}
      />
    </Switch>
  </Router>
);
