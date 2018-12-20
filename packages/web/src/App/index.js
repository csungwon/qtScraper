import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './index.scss';

const GET_QT = gql`
  {
    qt(qtId: 7176) {
      qtId
      title
      date
      reading
      scriptures {
        book
        chapter
        verse
        text
      }
      references
      questions
      guide
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query query={GET_QT}>
        {({ loading, data }) =>
          loading ? (
            <p>LOADING...</p>
          ) : (
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          )
        }
      </Query>
    );
  }
}

export default App;
