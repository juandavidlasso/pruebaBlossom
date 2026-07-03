import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { CharacterResults } from '@modules/character/components/CharacterResults'

const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: 'Earth',
    location: 'Citadel of Ricks',
    image: 'url',
    created: '',
    favorite: { id: 1, characterId: 1, createdAt: '' },
    comments: [],
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: 'Earth',
    location: 'Earth',
    image: 'url',
    created: '',
    favorite: undefined,
    comments: [],
  },
]

describe('CharacterResults', () => {
  it('separates characters into starred and non-starred sections', () => {
    render(
      <MockedProvider>
        <CharacterResults
          characters={mockCharacters}
          characterTypeFilter="All"
          activeFilterCount={0}
          selectedCharacterId={null}
          onSelectCharacter={vi.fn()}
          onHideCharacter={vi.fn()}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Starred Characters (1)')).toBeInTheDocument()
    expect(screen.getByText('Characters (1)')).toBeInTheDocument()
  })

  it('shows results count when filters are active', () => {
    render(
      <MockedProvider>
        <CharacterResults
          characters={mockCharacters}
          characterTypeFilter="All"
          activeFilterCount={2}
          selectedCharacterId={null}
          onSelectCharacter={vi.fn()}
          onHideCharacter={vi.fn()}
        />
      </MockedProvider>
    )
    expect(screen.getByText('2 Results')).toBeInTheDocument()
    expect(screen.getByText('2 Filters')).toBeInTheDocument()
  })

  it('shows only starred when characterTypeFilter is Starred', () => {
    render(
      <MockedProvider>
        <CharacterResults
          characters={mockCharacters}
          characterTypeFilter="Starred"
          activeFilterCount={1}
          selectedCharacterId={null}
          onSelectCharacter={vi.fn()}
          onHideCharacter={vi.fn()}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument()
  })
})
