import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from '@components/Loading'

describe('Loading', () => {
  it('renders when visible is true', () => {
    render(<Loading visible={true} />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('does not render when visible is false', () => {
    render(<Loading visible={false} />)
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
  })
})
