import { GraphQLError } from "graphql";
import { CharacterFilters } from "../../cache/character.cache";
import { Character } from "../../models/character.model";
import { characterService } from "../../services/character.service";

interface CharactersArgs {
  filter: CharacterFilters;
}

export const characterResolvers = {
  Query: {
    characters: async (
      _parent: unknown,
      { filter }: CharactersArgs,
    ): Promise<Character[]> => {
      try {
        return await characterService.searchCharacters(filter);
      } catch (error) {
        throw new GraphQLError("No se pudieron obtener los personajes", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
};
