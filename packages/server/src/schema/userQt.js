import { gql } from 'apollo-server-express';

const userQtFragment = `
  qtId: ID!
  answer1: String
  answer2: String
  answer3: String
  answer4: String
  answer5: String
`;

export default gql`
  extend type Query {
    userQt(qtId: ID!): UserQt
    userQts: [UserQt!]!
  }

  extend type Mutation {
    updateOrCreateUserQt(input: UserQtInput!): Boolean!
  }

  type UserQt {
    ${userQtFragment}
  }

  input UserQtInput {
    ${userQtFragment}
  }
`;
