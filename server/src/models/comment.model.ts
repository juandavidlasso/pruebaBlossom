import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";

export class Comment extends Model<
  InferAttributes<Comment, { omit: "createdAt" | "updatedAt" }>,
  InferCreationAttributes<Comment, { omit: "createdAt" | "updatedAt" }>
> {
  declare id: CreationOptional<number>;
  declare characterId: number;
  declare content: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "characters",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
  },
);
