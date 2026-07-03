import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";

export class Favorite extends Model<
  InferAttributes<Favorite, { omit: "createdAt" | "updatedAt" }>,
  InferCreationAttributes<Favorite, { omit: "createdAt" | "updatedAt" }>
> {
  declare id: CreationOptional<number>;
  declare characterId: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "characters",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "favorites",
    timestamps: true,
  },
);
