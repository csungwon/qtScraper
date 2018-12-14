import { gql } from 'apollo-server-express';
import QtSchema from './qt';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, QtSchema];
