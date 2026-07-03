import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Character extends Model<InferAttributes<Character, { omit: 'createdAt' | 'updatedAt'}>, InferCreationAttributes<Character, { omit: 'createdAt' | 'updatedAt'}>> {
  declare id: number;
  declare name: string;
  declare status: 'Alive' | 'Dead' | 'unknown' | string;
  declare species: string;
  declare type: string;
  declare gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | string;
  declare origin: string;
  declare location: string;
  declare image: string;
  declare created: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'characters',
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['status'] },
      { fields: ['species'] },
      { fields: ['gender'] },
      { fields: ['origin'] },
    ],
  }
);
