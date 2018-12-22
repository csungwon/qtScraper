import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import QtCalendar from '../QtCalendar';
import QtDetailPage from '../QtDetailPage';

export default () => (
  <Router>
    <Switch>
      <Route path="/(calendar)?" exact component={QtCalendar} />
      <Route path="/qt/:qtId" exact component={QtDetailPage} />
      <Route
        render={() => <h1 style={{ textAlign: 'center' }}>Page Not Found</h1>}
      />
    </Switch>
  </Router>
);
