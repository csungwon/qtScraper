import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    register(email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
    logout: Boolean!
  }

  type User {
    id: ID!
    email: String!
  }

  type AuthResponse {
    ok: Boolean!
    errors: [ErrorPath!]
  }

  type ErrorPath {
    path: String!
    message: String!
  }
`;
