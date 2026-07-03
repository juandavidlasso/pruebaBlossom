import { gql } from '@apollo/client'

export const GET_CHARACTERS = gql`
  query GetCharacters($filter: CharacterFilterInput!) {
    characters(filter: $filter) {
      id
      name
      status
      species
      type
      gender
      origin
      location
      image
      created
      comments {
        id
        characterId
        content
        createdAt
      }
      favorite {
        id
        characterId
      }
    }
  }
`
