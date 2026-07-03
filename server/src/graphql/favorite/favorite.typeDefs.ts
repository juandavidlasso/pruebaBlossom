import gql from 'graphql-tag';

export const favoriteTypeDefs = gql`
  type Favorite {
    id: Int!
    characterId: Int!
    createdAt: String
  }

  extend type Mutation {
    toggleFavorite(characterId: Int!): Favorite
  }
`;