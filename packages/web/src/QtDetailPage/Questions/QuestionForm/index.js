import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';

import QuestionForm from './Form';

const SAVE_USER_QT = gql`
  mutation SaveUserQt($input: UserQtInput!) {
    updateOrCreateUserQt(input: $input)
  }
`;

const GET_USER_QT = gql`
  query GetUserQt($qtId: ID!) {
    userQt(qtId: $qtId) {
      qtId
      answer1
      answer2
      answer3
      answer4
      answer5
    }
  }
`;

export default compose(
  withRouter,
  graphql(GET_USER_QT, {
    name: 'queryData',
    options: props => ({
      variables: {
        qtId: props.qtId
      }
    })
  }),
  graphql(SAVE_USER_QT, {
    name: 'saveUserQt',
    options: props => ({
      refetchQueries: [
        {
          query: GET_USER_QT,
          variables: {
            qtId: props.qtId
          }
        }
      ]
    })
  })
)(QuestionForm);
