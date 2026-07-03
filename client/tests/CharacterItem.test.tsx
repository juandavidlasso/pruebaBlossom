import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { CharacterItem } from '@features/character/components/CharacterItem'

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: 'Earth (C-137)',
  location: 'Citadel of Ricks',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  created: '2017-11-04T18:48:46.250Z',
  favorite: undefined,
  comments: [],
}

describe('CharacterItem', () => {
  it('renders character name and species', () => {
    render(
      <MockedProvider>
        <CharacterItem
          character={mockCharacter}
          isSelected={false}
          onSelect={vi.fn()}
          onHide={vi.fn()}
        />
      </MockedProvider>,
    )
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn()
    render(
      <MockedProvider>
        <CharacterItem
          character={mockCharacter}
          isSelected={false}
          onSelect={onSelect}
          onHide={vi.fn()}
        />
      </MockedProvider>,
    )
    fireEvent.click(screen.getByText('Rick Sanchez'))
    expect(onSelect).toHaveBeenCalledWith(mockCharacter)
  })

  it('shows filled heart when character is favorite', () => {
    const favoriteCharacter = {
      ...mockCharacter,
      favorite: { id: 1, characterId: 1, createdAt: '' },
    }
    render(
      <MockedProvider>
        <CharacterItem
          character={favoriteCharacter}
          isSelected={false}
          onSelect={vi.fn()}
          onHide={vi.fn()}
        />
      </MockedProvider>,
    )
    expect(screen.getByText('♥')).toBeInTheDocument()
  })

  it('shows empty heart when character is not favorite', () => {
    render(
      <MockedProvider>
        <CharacterItem
          character={mockCharacter}
          isSelected={false}
          onSelect={vi.fn()}
          onHide={vi.fn()}
        />
      </MockedProvider>,
    )
    expect(screen.getByText('♡')).toBeInTheDocument()
  })
})
