import { GraphQLError } from 'graphql';
import { invalidateCache } from '../../cache/character.cache';
import { Favorite } from '../../models/favorite.model';

export const favoriteResolvers = {
  Mutation: {
    toggleFavorite: async (_parent: unknown, { characterId }: { characterId: number }): Promise<Favorite | null> => {
      let response: Favorite | null = null
      try {
        const existing = await Favorite.findOne({ where: { characterId } });

        if (existing) {
          await existing.destroy()
        } else {
          response = await Favorite.create({ characterId });
        }

        await invalidateCache()
        return response
      } catch (error) {
        throw new GraphQLError('No se pudo actualizar el favorito', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        })
      }
    },
  },
};