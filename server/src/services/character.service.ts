import { InferAttributes, Op, WhereOptions } from "sequelize";
import { Character } from "../models/character.model";
import {
  CharacterFilters,
  getFromCache,
  setInCache,
} from "../cache/character.cache";
import { ExecutionTime } from "../decorators/executionTime.decorator";
import { Comment, Favorite } from "../models";

export class CharacterService {
  @ExecutionTime
  async searchCharacters(filters: CharacterFilters): Promise<Character[]> {
    const cached = await getFromCache<Character[]>(filters);
    if (cached) {
      return cached;
    }

    const where: WhereOptions<InferAttributes<Character>> = {};

    if (filters.name) {
      where.name = { [Op.iLike]: `%${filters.name}%` };
    }
    if (filters.status) {
      where.status = { [Op.iLike]: filters.status };
    }
    if (filters.species) {
      where.species = { [Op.iLike]: filters.species };
    }
    if (filters.gender) {
      where.gender = { [Op.iLike]: filters.gender };
    }
    if (filters.origin) {
      where.origin = { [Op.iLike]: `%${filters.origin}%` };
    }

    const result = await Character.findAll({
      where,
      include: [
        { model: Comment, as: "comments", required: false },
        { model: Favorite, as: "favorite", required: false },
      ],
    });

    await setInCache(filters, result);

    return result;
  }
}

export const characterService = new CharacterService();
