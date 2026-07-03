import { redis } from '../config/redis';

const CACHE_PREFIX = 'characters:';
const CACHE_TTL = 300;

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
};

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
}

const buildKey = (filters: CharacterFilters): string => {
  const parts = Object.entries(filters)
    .filter(([, value]) => value != null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value).trim()}`);
    
  return `${CACHE_PREFIX}${parts.length ? parts.join('&') : 'all'}`;
}


export const getFromCache = async <T>(filters: CharacterFilters): Promise<T | null> => {
  try {
    const key = buildKey(filters);
    const result = await redis.get(key);

    if (result) {
      console.log(`   ${colors.green}✔ CACHE HIT${colors.reset}  → ${key}`);
      return JSON.parse(result);
    } 
    
    console.log(`   ${colors.red}✘ CACHE MISS${colors.reset} → ${key}`);
    return null;
    
  } catch (error) {
    console.error(`   ${colors.yellow}⚠ CACHE ERROR${colors.reset} → Falló lectura:`, error);
    return null;
  }
}

export const setInCache = async <T>(filters: CharacterFilters, data: T): Promise<void> => {
  try {
    const key = buildKey(filters);
    await redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL);
  } catch (error) {
    console.error(`   ${colors.yellow}⚠ CACHE ERROR${colors.reset} → Falló escritura:`, error);
  }
}

export const invalidateCache = async (): Promise<void> => {
  try {
    const keys = await redis.keys(`${CACHE_PREFIX}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`   ${colors.green}✔ CACHE CLEARED${colors.reset} → ${keys.length} keys eliminadas`);
    }
  } catch (error) {
    console.error(`   ${colors.yellow}⚠ CACHE ERROR${colors.reset} → Falló invalidación:`, error);
  }
}