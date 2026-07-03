import { Character } from '@appTypes/character/character.types'
import { CommentForm } from '../../comment/components/CommentForm'
import { CommentList } from '../../comment'

interface Props {
  character: Character | null
  onBack: () => void
}

export function CharacterDetail({ character, onBack }: Props) {
  if (!character) {
    return (
      <div
        className='flex-1 h-screen flex items-center justify-center'
        style={{ boxShadow: '-4px 0px 60px 0px #0000000D' }}
      >
        <p className='text-gray-400'>Select a character to see details</p>
      </div>
    )
  }

  const fields = [
    { label: 'Species', value: character.species },
    { label: 'Status', value: character.status },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin },
    { label: 'Location', value: character.location },
    ...(character.type ? [{ label: 'Type', value: character.type }] : []),
  ]

  return (
    <div
      className='flex-1 h-screen p-8 overflow-y-auto'
      style={{ boxShadow: '-4px 0px 60px 0px #0000000D' }}
    >
      <button onClick={onBack} className='md:hidden text-[#8054C7] mb-4 flex items-center gap-1'>
        <svg
          className='w-9.5 h-9.5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          strokeWidth='2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
        </svg>
      </button>

      <div className='flex items-end gap-2 mb-4 relative'>
        <img
          src={character.image}
          alt={character.name}
          className='w-20 h-20 rounded-full object-cover'
        />
        {character.favorite && (
          <span className='text-[#63D838] text-3xl -ml-6 mb-1 bg-white w-8 h-8 rounded-2xl flex justify-center items-center'>
            ♥
          </span>
        )}
      </div>

      <h1 className='text-2xl font-bold text-[#111827] mb-6'>{character.name}</h1>

      <div className='divide-y divide-[#E5E7EB]'>
        {fields.map((field) => (
          <div key={field.label} className='py-4'>
            <p className='text-[16px] font-semibold text-[#111827]'>{field.label}</p>
            <p className='text-[16px] text-[#6B7280] font-medium mt-0.5'>{field.value}</p>
          </div>
        ))}
      </div>

      <div className='mt-8'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Comments</h2>
        <CommentForm characterId={character.id} />
        <div className='mt-4'>
          <CommentList comments={character.comments} />
        </div>
      </div>
    </div>
  )
}
