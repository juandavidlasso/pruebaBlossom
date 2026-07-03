'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15');

      if (!response.ok) {
        throw new Error(`Rick and Morty API responded with status ${response.status}`);
      }

      const characters = await response.json();

      const records = characters.map((char) => ({
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        type: char.type || '',
        gender: char.gender,
        origin: char.origin.name,
        location: char.location.name,
        image: char.image,
        created: char.created,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert('characters', records);
      console.log(`[Seed] Successfully inserted ${records.length} characters`);
    } catch (error) {
      console.error('[Seed] Error seeding characters:', error.message);
      throw error;
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete('characters', null, {});
      console.log('[Seed] Characters removed successfully');
    } catch (error) {
      console.error('[Seed] Error removing characters:', error.message);
      throw error;
    }
  },
};
