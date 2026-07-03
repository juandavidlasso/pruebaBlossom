'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('comments', {
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
        content: {
          type: Sequelize.TEXT,
          allowNull:false
        },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
      });
      console.log('[Migration] Table "comments" created successfully');
    } catch (error) {
      console.error('[Migration] Error creating table "comments":', error.message);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('comments');
      console.log('[Migration] Table "comments" dropped successfully');
    } catch (error) {
      console.error('[Migration] Error dropping table "comments":', error.message);
      throw error;
    }
  }
};
