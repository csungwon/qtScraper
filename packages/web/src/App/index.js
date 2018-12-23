import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import QtCalendar from '../QtCalendar';
import QtDetailPage from '../QtDetailPage';
import Login from '../Login';
import Register from '../Register';
import AuthRoute from './AuthRoute';
import { Spinner } from '../ui';

const ME = gql`
  query {
    me {
      id
    }
  }
`;

export default () => (
  <Query query={ME}>
    {({ data, loading, error, client }) => {
      if (loading) return <Spinner>앱을 불러오는 중입니다...</Spinner>;
      if (error) return <p>Error: {error.message}</p>;

      client.writeData({ data: { isLoggedIn: !!data.me } });
      return (
        <Router>
          <Switch>
            <Route path="/(calendar)?" exact component={QtCalendar} />
            <Route path="/qt/:qtId" component={QtDetailPage} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <Route
              render={() => (
                <h1 style={{ textAlign: 'center' }}>Page Not Found</h1>
              )}
            />
          </Switch>
        </Router>
      );
    }}
  </Query>
);
