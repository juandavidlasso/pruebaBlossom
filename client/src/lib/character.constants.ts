import { CharacterTypeFilter, FilterOptions, GenderTypeFilter, SpeciesTypeFilter, StatusTypeFilter } from "@appTypes/character/character.types"

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const CHARACTER_FILTER_VALUES = {
  ALL: 'All' as CharacterTypeFilter,
  STARRED: 'Starred' as CharacterTypeFilter,
  OTHERS: 'Others' as CharacterTypeFilter,
} as const;

export const SPECIES_FILTER_VALUES = {
  ALL: 'All' as SpeciesTypeFilter,
  HUMAN: 'Human' as SpeciesTypeFilter,
  ALIEN: 'Alien' as SpeciesTypeFilter,
} as const;

export const STATUS_FILTER_VALUES = {
  ALL: 'All' as StatusTypeFilter,
  ALIVE: 'Alive' as StatusTypeFilter,
  DEAD: 'Dead' as StatusTypeFilter,
  UNKNOWN: 'Unknown' as StatusTypeFilter,
} as const;

export const GENDER_FILTER_VALUES = {
  ALL: 'All' as GenderTypeFilter,
  MALE: 'Male' as GenderTypeFilter,
  FEMALE: 'Female' as GenderTypeFilter,
  GENDERLESS: 'Genderless' as GenderTypeFilter,
  UNKNOWN: 'Unknown' as GenderTypeFilter,
} as const;

export const filterOptions:FilterOptions[] = [
    { id: 1, options: [CHARACTER_FILTER_VALUES.ALL, CHARACTER_FILTER_VALUES.STARRED, CHARACTER_FILTER_VALUES.OTHERS], name: 'Character', value: 'characterType' },
    { id: 2, options: [SPECIES_FILTER_VALUES.ALL, SPECIES_FILTER_VALUES.HUMAN, SPECIES_FILTER_VALUES.ALIEN], name: 'Species', value: 'species' },
    { id: 3, options: [STATUS_FILTER_VALUES.ALL, STATUS_FILTER_VALUES.ALIVE, STATUS_FILTER_VALUES.DEAD, STATUS_FILTER_VALUES.UNKNOWN], name: 'Status', value: 'status' },
    { id: 4, options: [GENDER_FILTER_VALUES.ALL, GENDER_FILTER_VALUES.MALE, GENDER_FILTER_VALUES.FEMALE, GENDER_FILTER_VALUES.GENDERLESS, GENDER_FILTER_VALUES.UNKNOWN], name: 'Gender', value: 'gender' }
]
