import { Character } from '@appTypes/character/character.types'
import { CharacterItem } from './CharacterItem'

interface Props {
  characters: Character[]
  characterTypeFilter: 'All' | 'Starred' | 'Others'
  activeFilterCount: number
  selectedCharacterId: number | null
  onSelectCharacter: (character: Character) => void
  onHideCharacter: (id: number) => void
}

export function CharacterResults({
  characters,
  characterTypeFilter,
  activeFilterCount,
  selectedCharacterId,
  onSelectCharacter,
  onHideCharacter,
}: Props) {
  const starred = characters.filter((c) => !!c.favorite)
  const nonStarred = characters.filter((c) => !c.favorite)

  const showStarred = characterTypeFilter !== 'Others'
  const showNonStarred = characterTypeFilter !== 'Starred'

  const hasFilters = activeFilterCount > 0
  const totalResults = (showStarred ? starred.length : 0) + (showNonStarred ? nonStarred.length : 0)

  return (
    <div className='py-2 md:max-h-148 h-full overflow-y-auto'>
      {hasFilters ? (
        <div className='flex items-center justify-between mb-2 px-2 py-3'>
          <span className='text-[16px] font-semibold text-[#2563EB]'>{totalResults} Results</span>
          <span className='text-sm bg-[#63D83833] text-[#3B8520] px-3 py-0.5 rounded-xl font-semibold'>
            <span className='inline-block -translate-y-px'>
              {activeFilterCount} Filter{activeFilterCount > 1 ? 's' : ''}
            </span>
          </span>
        </div>
      ) : null}

      {showStarred && (
        <div className='w-full py-3 px-4 border-t border-t-[#E5E7EB]'>
          <p className='text-xs text-[#6B7280] uppercase mb-2 font-semibold'>
            Starred Characters ({starred.length})
          </p>
        </div>
      )}

      {showStarred &&
        starred.map((character) => (
          <CharacterItem
            key={character.id}
            character={character}
            isSelected={selectedCharacterId === character.id}
            onSelect={onSelectCharacter}
            onHide={onHideCharacter}
          />
        ))}

      {showNonStarred && (
        <div className='flex flex-col gap-2'>
          <div className='w-full py-3 px-4'>
            <p className='text-xs text-[#6B7280] uppercase mb-2 mt-4 font-semibold'>
              Characters ({nonStarred.length})
            </p>
          </div>
          {nonStarred.map((character) => (
            <CharacterItem
              key={character.id}
              character={character}
              isSelected={selectedCharacterId === character.id}
              onSelect={onSelectCharacter}
              onHide={onHideCharacter}
            />
          ))}
        </div>
      )}
    </div>
  )
}
