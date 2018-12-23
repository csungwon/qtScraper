import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const AUTH_STATE = gql`
  query {
    isLoggedIn @client
  }
`;

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { from } = props.location.state || {
        from: { pathname: '/calendar' }
      };
      return (
        <Query query={AUTH_STATE}>
          {({ data: { isLoggedIn } }) =>
            isLoggedIn ? <Redirect to={from} /> : <Component {...props} />
          }
        </Query>
      );
    }}
  />
);
