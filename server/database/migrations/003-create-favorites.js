'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('favorites', {
        id: { 
          type: Sequelize.INTEGER, 
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        characterId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'characters', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
      });
      console.log('[Migration] Table "favorites" created successfully');
    } catch (error) {
      console.error('[Migration] Error creating table "favorites":', error.message);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('favorites');
      console.log('[Migration] Table "favorites" dropped successfully');
    } catch (error) {
      console.error('[Migration] Error dropping table "favorites":', error.message);
      throw error;
    }
  }
};
