import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { CharacterPanel } from '@modules/character/components/CharacterPanel'
import { useCharacters } from '@hooks/character/useCharacters'
import { CHARACTER_FILTER_VALUES, GENDER_FILTER_VALUES, SPECIES_FILTER_VALUES, STATUS_FILTER_VALUES, SORT_ORDER } from '@lib/character.constants'

vi.mock('@hooks/character/useCharacters')

const mockedUseCharacters = vi.mocked(useCharacters)

const baseHookReturn = {
  characters: [],
  loading: false,
  error: undefined,
  searchText: '',
  setSearchText: vi.fn(),
  filters: {
    characterType: CHARACTER_FILTER_VALUES.ALL,
    species: SPECIES_FILTER_VALUES.ALL,
    status: STATUS_FILTER_VALUES.ALL,
    gender: GENDER_FILTER_VALUES.ALL,
  },
  setFilters: vi.fn(),
  sortOrder: SORT_ORDER.ASC,
  toggleSort: vi.fn(),
  activeFilterCount: 0,
  hideCharacter: vi.fn(),
  clearFilters: vi.fn(),
}

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
    favorite: undefined,
    comments: [],
  },
]

function renderPanel() {
  return render(
    <MockedProvider>
      <CharacterPanel selectedCharacterId={null} onSelectCharacter={vi.fn()} />
    </MockedProvider>
  )
}

describe('CharacterPanel', () => {
  beforeEach(() => {
    mockedUseCharacters.mockReset()
  })

  it('shows the skeleton loader while loading', () => {
    mockedUseCharacters.mockReturnValue({ ...baseHookReturn, loading: true })
    renderPanel()
    expect(screen.queryByText('No se encontraron personajes.')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.space-y-1 > div').length).toBeGreaterThan(0)
  })

  it('shows empty message when there are no characters', () => {
    mockedUseCharacters.mockReturnValue({ ...baseHookReturn, characters: [] })
    renderPanel()
    expect(screen.getByText('No se encontraron personajes.')).toBeInTheDocument()
  })

  it('shows results when there are characters', () => {
    mockedUseCharacters.mockReturnValue({ ...baseHookReturn, characters: mockCharacters })
    renderPanel()
    expect(screen.queryByText('No se encontraron personajes.')).not.toBeInTheDocument()
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
  })

  it('renders nothing when there is an error', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedUseCharacters.mockReturnValue({ ...baseHookReturn, error: new Error('boom') as any })
    const { container } = renderPanel()
    expect(container.querySelector('.md\\:w-93\\.75')).not.toBeInTheDocument()
  })

  it('toggles sort order when the sort button is clicked', () => {
    mockedUseCharacters.mockReturnValue({ ...baseHookReturn, sortOrder: SORT_ORDER.ASC })
    renderPanel()
    expect(screen.getByText('A-Z ↓')).toBeInTheDocument()
  })
})
