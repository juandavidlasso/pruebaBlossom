import cron from 'node-cron';
import { Character } from '../models/character.model';
import { getCharactersByIds } from '../datasources/rickAndMorty.api';
import { invalidateCache } from '../cache/character.cache';

const updateCharactersFromAPI = async (): Promise<void> => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`⏰ [Cron] Starting character sync at ${timestamp}`);

  try {
    const characters = await getCharactersByIds(
      Array.from({ length: 15 }, (_, i) => i + 1)
    );

    const upsertPromises = characters.map((char) =>
      Character.upsert({
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
      })
    );

    await Promise.all(upsertPromises);

    await invalidateCache();

    console.log(`✅ [Cron] Successfully synchronized ${characters.length} characters in database`);
  } catch (error) {
    console.error('💥 [Cron] Error during character synchronization:', error);
  }
}

export const startCharacterCron = (): void => {
  cron.schedule('0 */12 * * *', updateCharactersFromAPI);
  console.log('⏰ [Cron] Character update scheduled every 12 hours');
}