import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import NavBar from './NavBar';

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

const GET_AUTH_STATE = gql`
  query {
    isLoggedIn @client
  }
`;

const Navigation = ({ location }) => (
  <Query query={GET_AUTH_STATE}>
    {({ data: { isLoggedIn } }) => (
      <Mutation mutation={LOGOUT}>
        {(logout, { client }) => {
          const handleLogout = async () => {
            await logout();
            client.resetStore();
            localStorage.clear();
          };
          return (
            <NavBar
              isLoggedIn={isLoggedIn}
              location={location}
              onLogout={handleLogout}
            />
          );
        }}
      </Mutation>
    )}
  </Query>
);

export default withRouter(Navigation);
