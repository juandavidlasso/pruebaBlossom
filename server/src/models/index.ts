import { sequelize } from "../config/database";
import { Character } from "./character.model";
import { Comment } from "./comment.model";
import { Favorite } from "./favorite.model";

Character.hasMany(Comment, { foreignKey: "characterId", as: "comments" });
Character.hasOne(Favorite, { foreignKey: "characterId", as: "favorite" });

Comment.belongsTo(Character, { foreignKey: "characterId", as: "character" });

Favorite.belongsTo(Character, { foreignKey: "characterId", as: "character" });

const models = {
  Character,
  Comment,
  Favorite,
};

export { sequelize, models, Character, Favorite, Comment };
