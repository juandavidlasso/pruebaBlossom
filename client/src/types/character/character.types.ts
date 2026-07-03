import { Comment } from '@appTypes/comment/comment.types'
import { Favorite } from '@appTypes/favorite/favorite.types'

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: string
  location: string
  image: string
  created: string
  favorite?: Favorite
  comments?: Comment[]
}

export type SortOrder = 'asc' | 'desc'

export type CharacterTypeFilter = 'All' | 'Starred' | 'Others'
export type SpeciesTypeFilter = 'All' | 'Human' | 'Alien'
export type StatusTypeFilter = 'All' | 'Alive' | 'Dead' | 'Unknown'
export type GenderTypeFilter = 'All' | 'Male' | 'Female' | 'Genderless' | 'Unknown'

export interface FilterValues {
  characterType: CharacterTypeFilter
  species: SpeciesTypeFilter
  status: StatusTypeFilter
  gender: GenderTypeFilter
}

export interface FilterOptions {
  id: number
  options: string[]
  name: string
  value: keyof FilterValues
}

export interface CharacterFilter {
  name?: string
  status?: string
  species?: string
  gender?: string
  origin?: string
}
