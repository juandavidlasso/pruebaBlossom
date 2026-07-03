import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CHARACTERS } from '@graphql/queries/character/characters.query'
import { Character } from '@appTypes/character/character.types'
import { CharacterDetail, CharacterPanel } from './components'

export function CharacterListView() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null)
  const [showMobileDetail, setShowMobileDetail] = useState(false)

  const { data } = useQuery<{ characters: Character[] }>(GET_CHARACTERS, {
    variables: { filter: {} },
  })

  const selectedCharacter = data?.characters?.find((c) => c.id === selectedCharacterId) || null

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacterId(character.id)
    setShowMobileDetail(true)
  }

  const handleBackToList = () => {
    setShowMobileDetail(false)
  }

  return (
    <div className='flex w-full'>
      <div className={`w-full md:w-auto ${showMobileDetail ? 'hidden md:block' : 'block'}`}>
        <CharacterPanel
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={handleSelectCharacter}
        />
      </div>
      <div
        className={`w-full md:w-auto md:flex-1 ${showMobileDetail ? 'block' : 'hidden md:block'}`}
      >
        <CharacterDetail character={selectedCharacter} onBack={handleBackToList} />
      </div>
    </div>
  )
}
