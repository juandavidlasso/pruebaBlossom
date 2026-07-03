'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('characters', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        species: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: '',
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        origin: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('NOW()'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('NOW()'),
        },
      });
      console.log('[Migration] Table "characters" created successfully');
    } catch (error) {
      console.error('[Migration] Error creating table "characters":', error.message);
      throw error;
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable('characters');
      console.log('[Migration] Table "characters" dropped successfully');
    } catch (error) {
      console.error('[Migration] Error dropping table "characters":', error.message);
      throw error;
    }
  },
};
