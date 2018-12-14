import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    qtMetas(date: String): [QtMeta!]!
    qt(qtId: ID!): Qt
  }

  type Qt {
    qtId: ID!
    title: String!
    date: String!
    reading: String!
    scriptures: [Verse!]!
    references: [String!]!
    questions: [String!]!
    guide: String!
  }

  type QtMeta {
    qtId: ID!
    day: String!
    title: String!
  }

  type Verse {
    book: String!
    chapter: Int!
    verse: Int!
    text: String!
  }
`;
