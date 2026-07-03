import { Character } from '@appTypes/character/character.types'
import { useFavorite } from '@hooks/favorite/useFavorite'

interface Props {
  character: Character
  isSelected: boolean
  onSelect: (character: Character) => void
  onHide: (id: number) => void
}

export function CharacterItem({ character, isSelected, onSelect, onHide }: Props) {
  const isFavorite = !!character.favorite
  const { handleToggleFavorite } = useFavorite()

  return (
    <div
      onClick={() => onSelect(character)}
      className={`flex relative items-center mx-1 gap-4 py-4 px-2 cursor-pointer group border-t border-t-[#E5E7EB] ${
        isSelected ? 'bg-[#EEE3FF] rounded-lg' : 'bg-white'
      }`}
    >
      <img
        src={character.image}
        alt={character.name}
        className='w-10 h-10 rounded-full object-cover'
      />
      <div className='flex-1'>
        <p className='text-sm font-medium'>{character.name}</p>
        <p className='text-xs text-gray-500'>{character.species}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onHide(character.id)
        }}
        className='bg-white size-5 absolute top-1 right-0 rounded-full text-red-700 font-extrabold hidden text-sm group-hover:block hover:cursor-pointer hover:bg-red-900 hover:text-white'
      >
        <span className={isFavorite ? 'inline-block -translate-y-px' : ''}>✕</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleToggleFavorite(character.id)
        }}
        className='size-8 rounded-full bg-white hover:bg-[#53C629] hover:cursor-pointer hover:text-white text-[#53C629] mr-2'
      >
        <span
          className={`${isFavorite ? 'text-2xl' : 'text-[#D1D5DB] text-3xl hover:cursor-pointer inline-block -translate-y-0.5'}`}
        >
          {isFavorite ? '♥' : '♡'}
        </span>
      </button>
    </div>
  )
}
