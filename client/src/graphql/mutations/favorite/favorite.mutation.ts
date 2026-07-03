import { gql } from '@apollo/client'

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($characterId: Int!) {
    toggleFavorite(characterId: $characterId) {
      id
      characterId
      createdAt
    }
  }
`
