import gql from "graphql-tag";

export const characterTypeDefs = gql`
  type Character {
    id: Int!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String!
    origin: String!
    location: String!
    image: String!
    created: String!
    comments: [Comment]
    favorite: Favorite
  }

  input CharacterFilterInput {
    name: String
    status: String
    species: String
    gender: String
    origin: String
  }

  type Query {
    characters(filter: CharacterFilterInput!): [Character!]!
  }

  type Mutation {
    _empty: String
  }
`;
