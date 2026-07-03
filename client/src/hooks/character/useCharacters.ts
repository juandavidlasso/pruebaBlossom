import { useState, useMemo, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { GET_CHARACTERS } from '@graphql/queries/character/characters.query'
import { Character, CharacterFilter, FilterValues, SortOrder } from '@appTypes/character/character.types'
import { CHARACTER_FILTER_VALUES, GENDER_FILTER_VALUES, SORT_ORDER, SPECIES_FILTER_VALUES, STATUS_FILTER_VALUES } from '@lib/character.constants'

const DEFAULT_FILTERS: FilterValues = {
  characterType: CHARACTER_FILTER_VALUES.ALL,
  species: SPECIES_FILTER_VALUES.ALL,
  status: STATUS_FILTER_VALUES.ALL,
  gender: GENDER_FILTER_VALUES.ALL,
}

export function useCharacters() {
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC)
  const [hiddenIds, setHiddenIds] = useState<number[]>([])
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 300)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchText])

  const queryFilter: CharacterFilter = {}
  if (debouncedSearch) queryFilter.name = debouncedSearch
  if (filters.species !== SPECIES_FILTER_VALUES.ALL) queryFilter.species = filters.species
  if (filters.status !== STATUS_FILTER_VALUES.ALL) queryFilter.status = filters.status
  if (filters.gender !== GENDER_FILTER_VALUES.ALL) queryFilter.gender = filters.gender

  const { data, loading, error, previousData } = useQuery<{ characters: Character[] }>(GET_CHARACTERS, {
    variables: { filter: queryFilter },
    fetchPolicy: 'cache-and-network'
  })

  const characters = useMemo(() => {
    const currentData = data ?? previousData
    if (!currentData?.characters) return []
    return [...currentData.characters]
      .filter((c) => !hiddenIds.includes(c.id))
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name)
        return sortOrder === SORT_ORDER.ASC ? comparison : -comparison
      })
  }, [data, previousData, sortOrder, hiddenIds])

  const activeFilterCount = Object.values(filters).filter((v) => v !== 'All').length

  const toggleSort = () => {
    setSortOrder((prev) => (prev === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC))
  }

  const hideCharacter = (id: number) => {
    setHiddenIds((prev) => [...prev, id])
  }

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS)
    setSearchText('')
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return {
    characters,
    loading,
    error,
    searchText,
    setSearchText,
    filters,
    setFilters,
    sortOrder,
    toggleSort,
    activeFilterCount,
    hideCharacter,
    clearFilters,
  }
}
