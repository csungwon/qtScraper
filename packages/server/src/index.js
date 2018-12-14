import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import db from './models';
import resolvers from './resolvers';
import typeDefs from './schema';

const app = express();

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
