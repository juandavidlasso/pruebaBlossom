import { gql } from '@apollo/client'

export const ADD_COMMENT = gql`
  mutation AddComment($characterId: Int!, $content: String!) {
    addComment(characterId: $characterId, content: $content) {
      id
      characterId
      content
      createdAt
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id)
  }
`
