import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { TOGGLE_FAVORITE } from '@graphql/mutations/favorite/favorite.mutation'
import { GET_CHARACTERS } from '@graphql/queries/character/characters.query'

export function useFavorite() {
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [{ query: GET_CHARACTERS, variables: { filter: {} } }],
  })

  const handleToggleFavorite = async (characterId: number) => {
    try {
      const { data } = await toggleFavorite({ variables: { characterId } })
      if (data?.toggleFavorite) {
        toast.success('Marcado como favorito')
      } else {
        toast.success('Eliminado de favoritos')
      }
    } catch {
      toast.error('No se pudo actualizar el favorito')
    }
  }

  return { handleToggleFavorite }
}
