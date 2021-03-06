import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieSession from 'cookie-session';
import path from 'path';

import db from './models';
import resolvers from './resolvers';
import typeDefs from './schema';

const app = express();

app.use(
  cookieSession({
    name: 'qtscraperSession',
    secret: process.env.SECRET,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === 'development',
  playground: process.env.NODE_ENV === 'development',
  context: ({ req }) => ({ db, req })
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: process.env.NODE_ENV === 'development' && {
    credentials: true,
    origin: process.env.FRONT_END_URL
  }
});

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Apollo Server running on port ${PORT}!`);
  });
});
