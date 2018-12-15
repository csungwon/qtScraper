import { gql } from 'apollo-server-express';
import QtSchema from './qt';
import UserSchema from './user';
import UserQtSchema from './userQt';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, QtSchema, UserSchema, UserQtSchema];
