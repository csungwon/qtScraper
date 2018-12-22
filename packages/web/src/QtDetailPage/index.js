import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import QtPage from './QtPage';

const GET_QT_DETAIL = gql`
  query GetQtDetail($qtId: ID!) {
    qt(qtId: $qtId) {
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

export default graphql(GET_QT_DETAIL, {
  options: ({ match }) => ({
    variables: {
      qtId: match.params.qtId
    }
  })
})(QtPage);
