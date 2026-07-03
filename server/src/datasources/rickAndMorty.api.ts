interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown' | string;
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | string;
  origin: { name: string; url?: string };
  location: { name: string; url?: string };
  image: string;
  created: string;
}

interface ApiResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: RickAndMortyCharacter[];
}

const BASE_URL = 'https://rickandmortyapi.com/api';


export const getCharacters = async (page: number = 1): Promise<RickAndMortyCharacter[]> => {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!response.ok) throw new Error(`Rick and Morty API error: ${response.status}`);
  const data = (await response.json()) as ApiResponse;
  return data.results;
}

export const getCharactersByIds = async (ids: number[]): Promise<RickAndMortyCharacter[]> => {
  if (ids.length === 0) return [];
  const response = await fetch(`${BASE_URL}/character/${ids.join(',')}`);
  if (!response.ok) throw new Error(`Rick and Morty API error: ${response.status}`);
  const data = (await response.json()) as RickAndMortyCharacter | RickAndMortyCharacter[];
  return Array.isArray(data) ? data : [data];
}

export const getAllCharacters = async (): Promise<RickAndMortyCharacter[]> => {
  const response = await fetch(`${BASE_URL}/character?page=1`);
  if (!response.ok) return [];
  
  const firstPageData = (await response.json()) as ApiResponse;
  const totalPages = firstPageData.info.pages;
  const allCharacters: RickAndMortyCharacter[] = [...firstPageData.results];

  const promises: Promise<ApiResponse>[] = [];
  for (let p = 2; p <= totalPages; p++) {
    promises.push(
      fetch(`${BASE_URL}/character?page=${p}`).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch page ${p}`);
        return res.json() as Promise<ApiResponse>;
      })
    );
  }

  try {
    const responses = await Promise.all(promises);
    for (const res of responses) {
      allCharacters.push(...res.results);
    }
  } catch (error) {
    console.error('💥 [API] Error descargando páginas en paralelo, usando fallback secuencial:', error);
  }

  return allCharacters;
}