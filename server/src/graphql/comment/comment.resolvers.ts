import { GraphQLError } from 'graphql';
import { invalidateCache } from '../../cache/character.cache';
import { Comment } from '../../models/comment.model';

export const commentResolvers = {
  Mutation: {
    addComment: async (_parent: unknown, { characterId, content }: { characterId: number; content: string }): Promise<Comment> => {
      try {
        const comment = await Comment.create({ characterId, content });
        await invalidateCache()
        return comment
      } catch (error) {
        throw new GraphQLError('No se pudo agregar el comentario', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        })
      }
    },
    deleteComment: async (_parent: unknown, { id }: { id: number }):Promise<boolean> => {
      try {
        const rows = await Comment.destroy({ where: { id } });
        await invalidateCache()
        return rows === 1
      } catch (error) {
        throw new GraphQLError('No se pudo eliminar el comentario', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        })
      }
    },
  },
};