import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieSession from 'cookie-session';

import db from './models';
import resolvers from './resolvers';
import typeDefs from './schema';

const app = express();

app.use(
  cookieSession({
    name: 'qtscraperSession',
    secret: process.env.SECRET,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.ENVIRONMENT === 'production'
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({ db, req })
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
