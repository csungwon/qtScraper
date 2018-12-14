import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import db from './models';

const app = express();

const typeDefs = gql`
  type Query {
    verse(input: VerseInput!): Verse!
  }

  type Verse {
    book: String!
    chapter: Int!
    verse: Int!
    text: String!
  }

  input VerseInput {
    book: String!
    chapter: Int!
    verse: Int!
  }
`;

const resolvers = {
  Query: {
    verse: (_, { input: { book, chapter, verse } }, { db }) =>
      db.verse.findOne({
        where: {
          book,
          chapter,
          verse
        }
      })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: () => ({ db })
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Apollo Server running on port ${PORT}!`);
  });
});
