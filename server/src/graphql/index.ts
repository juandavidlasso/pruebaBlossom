import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from '@graphql-tools/utils'
import { characterTypeDefs } from './character/character.typeDefs';
import { characterResolvers } from './character/character.resolvers';
import { favoriteTypeDefs } from './favorite/favorite.typeDefs';
import { commentTypeDefs } from './comment/comment.typeDefs';
import { favoriteResolvers } from './favorite/favorite.resolvers';
import { commentResolvers } from './comment/comment.resolvers';

export const typeDefs = mergeTypeDefs([commentTypeDefs,favoriteTypeDefs,characterTypeDefs]);
export const resolvers:IResolvers = mergeResolvers([characterResolvers,favoriteResolvers,commentResolvers]);
