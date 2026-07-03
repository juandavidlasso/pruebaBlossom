import gql from 'graphql-tag';

export const commentTypeDefs = gql`
  type Comment {
    id: Int!
    characterId: Int!
    content: String!
    createdAt: String
  }

  extend type Mutation {
    addComment(characterId: Int!, content: String!): Comment!
    deleteComment(id: Int!): Boolean!
  }
`;