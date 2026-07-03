import { useCharacters } from '@hooks/character/useCharacters'
import { Character } from '@appTypes/character/character.types'
import { FilterInput } from './FilterInput'
import { CharacterResults } from './CharacterResults'
import { CharacterSkeletonList } from './CharacterItemSkeleton'

interface Props {
  selectedCharacterId: number | null
  onSelectCharacter: (character: Character) => void
}

export function CharacterPanel({ selectedCharacterId, onSelectCharacter }: Props) {
  const {
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
  } = useCharacters()

  const ViewState = {
    LOADING: loading,
    EMPTY: !loading && characters.length === 0,
    RESULTS: !loading && characters.length > 0,
  }

  if (error) return null

  return (
    <div className='md:w-93.75 md:min-w-93.75 py-4 px-3 w-full'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-xl font-bold'>Rick and Morty list</h1>
        <button
          onClick={toggleSort}
          className='text-sm text-gray-500 bg-[#EEE3FF] w-fit px-3 py-1 rounded-lg cursor-pointer hover:bg-purple-900 hover:text-white'
        >
          {sortOrder === 'asc' ? 'A-Z ↓' : 'Z-A ↑'}
        </button>
      </div>

      {activeFilterCount > 0 ? (
        <div className='md:hidden flex items-center justify-between mb-4'>
          <button onClick={clearFilters} className='text-[#8054C7]'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              strokeWidth='2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
            </svg>
          </button>
          <span className='text-[16px] font-semibold text-[#111827]'>Advanced search</span>
          <button onClick={clearFilters} className='text-[16px] text-[#8054C7] font-semibold'>
            Done
          </button>
        </div>
      ) : null}

      <div className={activeFilterCount > 0 ? 'hidden md:block' : ''}>
        <FilterInput
          searchText={searchText}
          filters={filters}
          onSearchChange={setSearchText}
          onApplyFilters={setFilters}
        />
      </div>

      {ViewState.LOADING && <CharacterSkeletonList />}
      {ViewState.EMPTY && <p className='text-sm text-gray-500'>No se encontraron personajes.</p>}
      {ViewState.RESULTS && (
        <CharacterResults
          characters={characters}
          characterTypeFilter={filters.characterType}
          activeFilterCount={activeFilterCount}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={onSelectCharacter}
          onHideCharacter={hideCharacter}
        />
      )}
    </div>
  )
}
